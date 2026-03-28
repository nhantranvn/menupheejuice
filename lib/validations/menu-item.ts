import { z } from "zod";

export const updateMenuItemImageSchema = z.object({
  menuItemId: z.string().min(1, "Thiếu mã món cần cập nhật ảnh."),
});

export const deleteMenuItemSchema = z.object({
  menuItemId: z.string().min(1, "Thiếu mã món cần xóa."),
});

export const toggleMenuItemAvailabilitySchema = z.object({
  menuItemId: z.string().min(1, "Thiếu mã món cần cập nhật trạng thái."),
  isAvailable: z.boolean(),
});

export const createManualMenuItemSchema = z.object({
  categoryId: z.string().optional(),
  newCategoryName: z.string().optional(),
  name: z.string().trim().min(2, "Tên món cần có ít nhất 2 ký tự.").max(120, "Tên món quá dài."),
  description: z.string().trim().max(500, "Mô tả quá dài.").optional(),
  imageUrl: z.string().trim().url("Ảnh mẫu cần là một đường dẫn hợp lệ.").optional().or(z.literal("")),
  isAvailable: z.boolean().default(true),
});
