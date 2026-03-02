export type Favorite = {
  id: string;
  serviceId: string;
  label: string;
  values: Record<string, string>;
  createdAt: string;
};

const STORAGE_KEY = "psnpay_favorites";

export function getFavorites(): Favorite[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getFavoritesByService(serviceId: string): Favorite[] {
  return getFavorites().filter((f) => f.serviceId === serviceId);
}

export function addFavorite(fav: Omit<Favorite, "id" | "createdAt">): Favorite {
  const newFav: Favorite = {
    ...fav,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const all = getFavorites();
  all.unshift(newFav);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all.slice(0, 100)));
  return newFav;
}

export function removeFavorite(id: string): void {
  const all = getFavorites().filter((f) => f.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
