export const STARTER_TOPPINGS = [
  { name: "Hat sen", price: 10000, sortOrder: 1 },
  { name: "Tran chau trang", price: 5000, sortOrder: 2 },
  { name: "Tran chau den", price: 5000, sortOrder: 3 },
  { name: "Thach nha dam", price: 5000, sortOrder: 4 },
  { name: "Thach dua", price: 5000, sortOrder: 5 },
  { name: "Thach dau do", price: 5000, sortOrder: 6 },
] as const;

export const STARTER_MENU = [
  {
    name: "Mon noi bat",
    items: [
      "Sua dau say trang hoa",
      "Sua chua deo com xoai tran chau",
      "Nuoc dua hat chia",
      "Matcha latte topping linh tinh",
    ],
  },
  {
    name: "Tra sua - tra trai cay",
    items: [
      "Tra nhai cam may trang",
      "Bac xiu up xiu down",
      "Yakult luu do tran chau",
      "Tra sua com non",
    ],
  },
  {
    name: "Nuoc ep detox",
    items: [
      "Nuoc ep cam",
      "Nuoc ep dua mix tao",
      "Nuoc ep chanh leo",
      "Nuoc ep oi",
    ],
  },
  {
    name: "Sinh to trai cay",
    items: [
      "Sinh to bo",
      "Sinh to xoai",
      "Sinh to mang cau",
      "Sinh to bo xoai",
    ],
  },
] as const;

export const STARTER_VARIANTS = [
  { name: "Coc 500ml", sizeMl: 500, price: 30000, sortOrder: 1 },
  { name: "Coc 700ml", sizeMl: 700, price: 40000, sortOrder: 2 },
] as const;

export function buildStarterImageUrl(name: string) {
  return `https://placehold.co/800x600/f5f5f4/1c1917?text=${encodeURIComponent(name)}`;
}
