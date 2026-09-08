import type { DietaryPreference, GroceryItem, MealPlan } from "../domain/models";
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
};
