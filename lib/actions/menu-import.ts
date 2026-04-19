"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { runOcrOnImage } from "@/lib/ocr/engine";
import { extractMenuItemsFromText, normalizeOcrText } from "@/lib/ocr/parser";
import { buildStoredUploadPath } from "@/lib/uploads";
import { menuImportApplySchema, menuImportMetadataSchema, menuImportReviewSchema } from "@/lib/validations/menu-import";

async function ensureDefaultVariants(tx: Prisma.TransactionClient, menuItemId: string) {
  const existing = await tx.menuItemVariant.findMany({
    where: { menuItemId },
    select: { sizeMl: true },
  });

  const sizes = new Set(existing.map((variant) => variant.sizeMl));
  const variantsToCreate: Array<{ name: string; sizeMl: number; price: number; sortOrder: number }> = [];

  if (!sizes.has(500)) {
    variantsToCreate.push({ name: "Cốc 500ml", sizeMl: 500, price: 30000, sortOrder: 1 });
  }

  if (!sizes.has(700)) {
    variantsToCreate.push({ name: "Cốc 700ml", sizeMl: 700, price: 40000, sortOrder: 2 });
  }

  if (variantsToCreate.length > 0) {
    await tx.menuItemVariant.createMany({
      data: variantsToCreate.map((variant) => ({
        menuItemId,
        ...variant,
      })),
    });
  }
}

async function processMenuImportJob(jobId: string, absolutePath: string) {
  try {
    const ocrText = normalizeOcrText(await runOcrOnImage(absolutePath, { timeoutMs: 120000 }));
    const parsedItems = extractMenuItemsFromText(ocrText);

    await prisma.menuImportJob.update({
      where: { id: jobId },
      data: {
        status: ocrText ? "READY_FOR_REVIEW" : "FAILED",
        extractedText: ocrText || "Không trích xuất được nội dung từ ảnh menu này.",
        rawOcrJson: {
          provider: "tesseract.js",
          language: "vie+eng",
          parsedItemCount: parsedItems.length,
          completedAt: new Date().toISOString(),
        } as Prisma.InputJsonValue,
        errorMessage: ocrText ? null : "OCR không đọc được nội dung rõ ràng từ ảnh này.",
      },
    });

    return {
      ok: Boolean(ocrText),
      parsedItemCount: parsedItems.length,
      error: ocrText ? null : "OCR không đọc được nội dung rõ ràng từ ảnh này.",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể chạy OCR lúc này.";

    await prisma.menuImportJob.update({
      where: { id: jobId },
      data: {
        status: "FAILED",
        extractedText: null,
        rawOcrJson: {
          provider: "tesseract.js",
          language: "vie+eng",
          failedAt: new Date().toISOString(),
        } as Prisma.InputJsonValue,
        errorMessage: message,
      },
    });

    return {
      ok: false,
      parsedItemCount: 0,
      error: message,
    };
  }
}

export async function createMenuImportJobAction(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN" || !session.user.id) {
    return { ok: false, error: "Bạn không có quyền tải lên menu." };
  }

  const file = formData.get("menuImage");

  if (!(file instanceof File)) {
    return { ok: false, error: "Vui lòng chọn một file ảnh menu." };
  }

  const parsed = menuImportMetadataSchema.safeParse({
    originalFileName: file.name,
    mimeType: file.type,
    sizeBytes: file.size,
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "File tải lên không hợp lệ.",
    };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const relativePath = buildStoredUploadPath(parsed.data.originalFileName);
  const absolutePath = path.join(process.cwd(), relativePath);

  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, buffer);

  const job = await prisma.menuImportJob.create({
    data: {
      userId: session.user.id,
      originalFileName: parsed.data.originalFileName,
      storedFilePath: relativePath,
      mimeType: parsed.data.mimeType,
      sizeBytes: parsed.data.sizeBytes,
      status: "OCR_PENDING",
      extractedText: null,
      rawOcrJson: {
        provider: "tesseract.js",
        language: "vie+eng",
        queuedAt: new Date().toISOString(),
      } as Prisma.InputJsonValue,
      errorMessage: null,
    },
    select: {
      id: true,
    },
  });

  const ocrResult = await processMenuImportJob(job.id, absolutePath);
  revalidatePath("/admin/menu-import");

  if (!ocrResult.ok) {
    return {
      ok: false,
      jobId: job.id,
      error: ocrResult.error ?? "OCR không thể hoàn tất cho ảnh này.",
    };
  }

  return {
    ok: true,
    jobId: job.id,
    parsedItemCount: ocrResult.parsedItemCount,
  };
}

export async function saveMenuImportReviewAction(input: { jobId: string; extractedText: string }) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return { ok: false, error: "Bạn không có quyền cập nhật nội dung OCR." };
  }

  const parsed = menuImportReviewSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Nội dung OCR không hợp lệ." };
  }

  await prisma.menuImportJob.update({
    where: { id: parsed.data.jobId },
    data: {
      extractedText: normalizeOcrText(parsed.data.extractedText),
      status: "READY_FOR_REVIEW",
      errorMessage: null,
    },
  });

  revalidatePath("/admin/menu-import");

  return { ok: true };
}

export async function importMenuFromJobAction(input: { jobId: string; categoryName: string }) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return { ok: false, error: "Bạn không có quyền nhập menu vào hệ thống." };
  }

  const parsed = menuImportApplySchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dữ liệu import không hợp lệ." };
  }

  const job = await prisma.menuImportJob.findUnique({
    where: { id: parsed.data.jobId },
    select: {
      id: true,
      extractedText: true,
      rawOcrJson: true,
    },
  });

  if (!job?.extractedText) {
    return { ok: false, error: "Job này chưa có nội dung OCR để import." };
  }

  const parsedItems = extractMenuItemsFromText(job.extractedText);

  if (parsedItems.length === 0) {
    return {
      ok: false,
      error: "Không tìm thấy dòng món hợp lệ. Hãy sửa lại text OCR theo dạng 'Tên món 45000' rồi thử lại.",
    };
  }

  const categoryName = parsed.data.categoryName.trim();

  const result = await prisma.$transaction(async (tx) => {
    const category = await tx.menuCategory.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });

    let importedCount = 0;

    for (let index = 0; index < parsedItems.length; index += 1) {
      const item = parsedItems[index];
      
      const menuItem = await tx.menuItem.upsert({
        where: { name: item.name },
        update: {
          description: item.description,
          isAvailable: true,
        },
        create: {
          name: item.name,
          description: item.description,
          imageUrl: null,
          isAvailable: true,
        },
        select: { id: true },
      });

      // Link to Category
      await tx.menuItemInCategory.upsert({
        where: {
          menuItemId_categoryId: {
            menuItemId: menuItem.id,
            categoryId: category.id,
          },
        },
        update: {
          sortOrder: index + 1,
        },
        create: {
          menuItemId: menuItem.id,
          categoryId: category.id,
          sortOrder: index + 1,
        },
      });

      await ensureDefaultVariants(tx, menuItem.id);
      importedCount += 1;
    }

    await tx.menuImportJob.update({
      where: { id: job.id },
      data: {
        status: "IMPORTED",
        rawOcrJson: {
          ...(job.rawOcrJson && typeof job.rawOcrJson === "object" && !Array.isArray(job.rawOcrJson) ? job.rawOcrJson : {}),
          importedCount,
          categoryName,
          defaultVariants: [
            { name: "Cốc 500ml", price: 30000 },
            { name: "Cốc 700ml", price: 40000 },
          ],
        } as Prisma.InputJsonValue,
        errorMessage: null,
      },
    });

    return { importedCount, categoryName };
  });

  revalidatePath("/admin/menu-import");
  revalidatePath("/menu");

  return { ok: true, ...result };
}
