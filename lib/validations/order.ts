import { z } from "zod";

export const orderItemToppingSchema = z.object({
  toppingId: z.string().min(1),
  quantity: z.number().int().min(1).max(5),
});

export const orderItemSchema = z.object({
  menuItemId: z.string().min(1),
  variantId: z.string().min(1),
  toppings: z.array(orderItemToppingSchema).max(8),
  quantity: z.number().int().min(1).max(20),
});

export const createOrderSchema = z.object({
  customerName: z.string().trim().min(2, "Vui lòng nhập tên người nhận hàng.").max(80),
  phoneNumber: z.string().trim().min(8, "Vui lòng nhập số điện thoại hợp lệ.").max(20, "Số điện thoại quá dài."),
  deliveryAddress: z.string().trim().min(5, "Vui lòng nhập địa chỉ nhận hàng.").max(255),
  note: z.string().trim().max(300).optional().or(z.literal("")),
  items: z.array(orderItemSchema).min(1, "Cần ít nhất 1 món để đặt hàng."),
});

export const updateOrderStatusSchema = z.object({
  orderId: z.string().min(1),
  status: z.enum(["NEW", "PREPARING", "COMPLETED", "CANCELLED"]),
});
