import { z } from "zod";

export const toppingSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Tên topping không được để trống"),
  price: z.coerce.number().min(0, "Giá không được nhỏ hơn 0"),
  sortOrder: z.coerce.number().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const toggleToppingAvailabilitySchema = z.object({
  toppingId: z.string().min(1, "ID topping không hợp lệ"),
  isActive: z.boolean(),
});

export const deleteToppingSchema = z.object({
  toppingId: z.string().min(1, "ID topping không hợp lệ"),
});
