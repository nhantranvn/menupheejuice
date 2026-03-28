import { MenuItemCard } from "@/components/menu/menu-item-card";

type Props = {
  category: {
    id: string;
    name: string;
    items: Array<{
      id: string;
      name: string;
      description: string | null;
      imageUrl: string | null;
      isAvailable: boolean;
      variants: Array<{
        id: string;
        name: string;
        sizeMl: number;
        price: number;
      }>;
    }>;
  };
  toppings: Array<{
    id: string;
    name: string;
    price: number;
  }>;
};

export function CategorySection({ category, toppings }: Props) {
  return (
    <section id={category.id} className="space-y-4">
      <div className="flex items-end justify-between gap-4 px-1">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-orange-600">Danh mục</p>
          <h2 className="mt-2 text-3xl font-bold text-stone-950">{category.name}</h2>
        </div>
        <p className="text-sm text-stone-500">{category.items.length} món</p>
      </div>
      <div className="overflow-hidden rounded-[1.9rem] bg-white px-4 shadow-[0_16px_35px_-26px_rgba(28,25,23,0.25)] sm:space-y-3 sm:bg-transparent sm:px-0 sm:shadow-none">
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} toppings={toppings} />
        ))}
      </div>
    </section>
  );
}
