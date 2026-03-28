export type CartTopping = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  lineTotal: number;
};

export type CartItem = {
  cartItemId: string;
  menuItemId: string;
  name: string;
  imageUrl: string | null;
  variantId: string;
  variantName: string;
  sizeMl: number;
  basePrice: number;
  toppings: CartTopping[];
  totalPrice: number;
  quantity: number;
};
