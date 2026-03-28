"use client";

import { useMemo, useState } from "react";
import { ImagePlus } from "lucide-react";
import { resolveMenuItemImageUrl } from "@/lib/menu-item-images";

type Props = {
  imageUrl: string | null;
  name: string;
};

export function MenuItemPreviewImage({ imageUrl, name }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const resolvedImageUrl = useMemo(() => resolveMenuItemImageUrl(imageUrl), [imageUrl]);

  if (!resolvedImageUrl || imageFailed) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-3xl bg-stone-100 p-4 text-center text-stone-500">
        <div>
          <ImagePlus className="mx-auto h-8 w-8" />
          <p className="mt-2 text-sm font-medium">Chưa có ảnh hiển thị</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-square w-full overflow-hidden rounded-3xl bg-stone-100">
      <img src={resolvedImageUrl} alt={name} className="h-full w-full object-cover object-center" onError={() => setImageFailed(true)} />
    </div>
  );
}
