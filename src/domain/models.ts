export type DietaryPreference = "Balanced" | "Vegetarian" | "Vegan" | "High Protein" | "Low Carb" | "Gluten Free";
export type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack";
export type GroceryCategory = "Vegetables" | "Fruits" | "Dairy" | "Meat & Protein" | "Grains" | "Spices" | "Frozen" | "Pantry";
export interface Ingredient { name: string; amount: number; unit: string; category: GroceryCategory }
export interface Nutrition { calories: number; protein: number; carbs: number; fat: number; fiber: number }
export interface CookingStep { id: number; instruction: string; timerMinutes?: number }
export interface Recipe {
  id: string; title: string; description: string; image: string; imageAlt: string;
  time: number; difficulty: "Easy" | "Medium"; rating: number; servings: number;
  category: string; cuisine: string; diets: DietaryPreference[]; ingredients: Ingredient[];
  nutrition: Nutrition; steps: CookingStep[]; featured?: boolean;
}
export interface MealSlot { id: string; day: string; type: MealType; recipeId: string }
export interface MealPlan { preference: DietaryPreference; slots: MealSlot[] }
export interface GroceryItem extends Ingredient { id: string; checked: boolean; custom?: boolean }
