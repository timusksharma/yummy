import type { DietaryPreference, GroceryItem, MealPlan, MealSlot, Recipe } from "../domain/models";

const normalized = (value: string) => value.trim().toLowerCase().replace(/oes$/, "o").replace(/s$/, "");
export const rankRecipes = (all: Recipe[], ingredients: string[]) => {
  const available = new Set(ingredients.map(normalized).filter(Boolean));
  return all.map(recipe => ({ recipe, matches: recipe.ingredients.filter(item => available.has(normalized(item.name))).length }))
    .filter(item => item.matches > 0).sort((a, b) => b.matches - a.matches || a.recipe.time - b.recipe.time);
};
export const createMealPlan = (all: Recipe[], preference: DietaryPreference): MealPlan => {
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const types = ["Breakfast","Lunch","Dinner"] as const;
  const eligible = all.filter(r => preference === "Balanced" || r.diets.includes(preference));
  const pool = eligible.length ? eligible : all;
  const slots: MealSlot[] = days.flatMap((day, dayIndex) => types.map((type, typeIndex) => ({ id:`${day}-${type}`, day, type, recipeId:pool[(dayIndex * types.length + typeIndex) % pool.length].id })));
  return { preference, slots };
};
export const aggregateGroceries = (plan: MealPlan, all: Recipe[]): GroceryItem[] => {
  const map = new Map<string, GroceryItem>();
  plan.slots.forEach(slot => all.find(r => r.id === slot.recipeId)?.ingredients.forEach(item => {
    const key = `${normalized(item.name)}-${item.unit}`;
    const existing = map.get(key);
    map.set(key, existing ? { ...existing, amount: existing.amount + item.amount } : { ...item, id:key, checked:false });
  }));
  return [...map.values()].sort((a,b) => a.category.localeCompare(b.category));
};
export const convertMeasurement = (value: number, from: string, to: string) => {
  const grams: Record<string, number> = { g:1, kg:1000, oz:28.3495, lb:453.592, ml:1, l:1000, cup:240, tbsp:15, tsp:5 };
  return value * (grams[from] ?? 1) / (grams[to] ?? 1);
};
export const convertTemperature = (value: number, from: "C"|"F") => from === "C" ? value * 9/5 + 32 : (value - 32) * 5/9;
export const assistantAnswer = (query: string) => {
  const q = query.toLowerCase();
  if (q.includes("instead") || q.includes("substitute")) return "For eggs in baking, use ¼ cup yogurt or one tablespoon ground flax mixed with three tablespoons water per egg.";
  if (q.includes("six") || q.includes("serv")) return "Set the recipe to 6 servings and multiply every ingredient by 6 ÷ the original serving count.";
  if (q.includes("bake") || q.includes("long")) return "Cooking time depends on the dish. Start checking 5 minutes before the recipe time and confirm doneness with temperature and texture.";
  if (q.includes("store")) return "Cool leftovers promptly, refrigerate in a sealed container within two hours, and label them with today’s date.";
  return "I can help with substitutions, cooking times, serving calculations, and safe food storage. Try asking a specific cooking question.";
};
