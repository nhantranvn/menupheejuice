import { z } from "zod";

export const menuImportMetadataSchema = z.object({
  originalFileName: z.string().trim().min(1).max(200),
  mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
  sizeBytes: z.number().int().positive().max(5 * 1024 * 1024),
});

export const menuImportReviewSchema = z.object({
  jobId: z.string().min(1),
  extractedText: z.string().trim().min(1).max(20000),
});

export const menuImportApplySchema = z.object({
  jobId: z.string().min(1),
  categoryName: z.string().trim().min(1).max(120),
});

