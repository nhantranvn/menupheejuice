import { randomUUID } from "crypto";
import path from "path";

function toSafeFileName(originalFileName: string) {
  return originalFileName
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "upload";
}

export function buildStoredUploadPath(originalFileName: string) {
  return path.join("uploads", "menu-imports", `${Date.now()}-${randomUUID()}-${toSafeFileName(originalFileName)}`);
}

export function buildMenuItemImageStoragePaths(originalFileName: string) {
  const fileName = `${Date.now()}-${randomUUID()}-${toSafeFileName(originalFileName)}`;

  return {
    fileName,
    relativeDiskPath: path.join("public", "uploads", "menu-items", fileName),
    publicUrl: `/uploads/menu-items/${fileName}`,
  };
}