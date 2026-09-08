import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { KitchenProvider } from "./hooks/useKitchenState";
import { HomePage } from "./pages/Home";
import { RecipesPage, RecipeDetailPage, CookingPage } from "./pages/Recipes";
import { PlannerPage } from "./pages/Planner";
import { GroceryPage } from "./pages/Grocery";
import { NutritionPage } from "./pages/Nutrition";
import { ToolsPage } from "./pages/Tools";
import { FavoritesPage, ProfilePage } from "./pages/Account";

export default function App(){return <KitchenProvider><Routes><Route element={<Layout/>}><Route index element={<HomePage/>}/><Route path="recipes" element={<RecipesPage/>}/><Route path="recipes/:id" element={<RecipeDetailPage/>}/><Route path="recipes/:id/cook" element={<CookingPage/>}/><Route path="planner" element={<PlannerPage/>}/><Route path="grocery" element={<GroceryPage/>}/><Route path="nutrition" element={<NutritionPage/>}/><Route path="tools" element={<ToolsPage/>}/><Route path="favorites" element={<FavoritesPage/>}/><Route path="profile" element={<ProfilePage/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes></KitchenProvider>}
