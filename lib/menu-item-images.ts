export function resolveMenuItemImageUrl(imageUrl: string | null | undefined) {
  if (!imageUrl) {
    return null;
  }

  if (imageUrl.startsWith("/uploads/menu-items/")) {
    const fileName = imageUrl.split("/").filter(Boolean).pop();
    return fileName ? `/api/menu-item-images/${fileName}` : imageUrl;
  }

  return imageUrl;
}
