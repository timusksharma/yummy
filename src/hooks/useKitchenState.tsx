import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { DietaryPreference, GroceryItem, MealPlan } from "../domain/models";
import { recipes } from "../data/recipes";
import { createMealPlan } from "../services/kitchen";
import { stores } from "../services/storage";
import { usePersistentState } from "./usePersistentState";

interface KitchenState {
  favorites: string[]; toggleFavorite(id:string): void;
  plan: MealPlan; setPlan: React.Dispatch<React.SetStateAction<MealPlan>>;
  groceries: GroceryItem[]; setGroceries: React.Dispatch<React.SetStateAction<GroceryItem[]>>;
  preferences: DietaryPreference[]; setPreferences: React.Dispatch<React.SetStateAction<DietaryPreference[]>>;
}
const Context = createContext<KitchenState | null>(null);
export function KitchenProvider({children}:{children:ReactNode}) {
  const [favorites, setFavorites] = usePersistentState<string[]>(stores.favorites, []);
  const [plan, setPlan] = usePersistentState(stores.mealPlan, createMealPlan(recipes, "Balanced"));
  const [groceries, setGroceries] = usePersistentState<GroceryItem[]>(stores.groceries, []);
  const [preferences, setPreferences] = usePersistentState<DietaryPreference[]>(stores.preferences, ["Balanced"]);
  const value = useMemo(() => ({ favorites, toggleFavorite:(id:string) => setFavorites(old => old.includes(id) ? old.filter(x=>x!==id) : [...old,id]), plan, setPlan, groceries, setGroceries, preferences, setPreferences }), [favorites, plan, groceries, preferences, setFavorites, setPlan, setGroceries, setPreferences]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
// Provider and its colocated hook intentionally share one module.
// eslint-disable-next-line react-refresh/only-export-components
export const useKitchen = () => { const value=useContext(Context); if(!value) throw new Error("KitchenProvider missing"); return value; };
