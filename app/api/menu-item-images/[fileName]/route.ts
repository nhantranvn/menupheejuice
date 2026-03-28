import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const MIME_TYPES = new Map([
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".png", "image/png"],
  [".webp", "image/webp"],
]);

type Props = {
  params: {
    fileName: string;
  };
};

export async function GET(_: Request, { params }: Props) {
  const fileName = path.basename(params.fileName);
  const absolutePath = path.join(process.cwd(), "public", "uploads", "menu-items", fileName);

  try {
    const fileBuffer = await readFile(absolutePath);
    const extension = path.extname(fileName).toLowerCase();

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": MIME_TYPES.get(extension) ?? "application/octet-stream",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json({ error: "Không tìm thấy ảnh món." }, { status: 404 });
  }
}
