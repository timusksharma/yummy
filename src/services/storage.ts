import type { DietaryPreference, GroceryItem, MealPlan } from "../domain/models";
import type { Address, CartItem, Order, Review } from "../domain/delivery";
export interface StorageRepository<T> { read(fallback: T): T; write(value: T): void }
export class LocalStorageRepository<T> implements StorageRepository<T> {
  constructor(private readonly key: string, private readonly version = 1) {}
  read(fallback: T): T {
    try {
      const raw = localStorage.getItem(this.key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw) as { version: number; value: T };
      return parsed.version === this.version ? parsed.value : fallback;
    } catch { return fallback; }
  }
  write(value: T): void {
    try { localStorage.setItem(this.key, JSON.stringify({ version: this.version, value })); } catch { /* unavailable storage */ }
  }
}
export const stores = {
  favorites: new LocalStorageRepository<string[]>("yummy:favorites:v1"),
  mealPlan: new LocalStorageRepository<MealPlan>("yummy:meal-plan:v1"),
  groceries: new LocalStorageRepository<GroceryItem[]>("yummy:groceries:v1"),
  preferences: new LocalStorageRepository<DietaryPreference[]>("yummy:preferences:v1"),
  cart: new LocalStorageRepository<CartItem[]>("yummy:cart:v2",2),
  deliveryFavorites: new LocalStorageRepository<string[]>("yummy:delivery-favorites:v2",2),
  location: new LocalStorageRepository<string>("yummy:location:v2",2),
  addresses: new LocalStorageRepository<Address[]>("yummy:addresses:v2",2),
  orders: new LocalStorageRepository<Order[]>("yummy:orders:v2",2),
  reviews: new LocalStorageRepository<Review[]>("yummy:reviews:v2",2),
};
