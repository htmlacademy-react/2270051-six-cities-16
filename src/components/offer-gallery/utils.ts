export function getDisplayedImages(images: string[], limit: number): string[] {
  return images.slice(0, limit);
}
