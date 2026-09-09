import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { KitchenProvider } from "./hooks/useKitchenState";
import { DeliveryProvider } from "./hooks/useDeliveryState";
import { HomePage } from "./pages/Home";
import { RecipesPage, RecipeDetailPage, CookingPage } from "./pages/Recipes";
import { PlannerPage } from "./pages/Planner";
import { GroceryPage } from "./pages/Grocery";
import { NutritionPage } from "./pages/Nutrition";
import { ToolsPage } from "./pages/Tools";
import { FavoritesPage, ProfilePage } from "./pages/Account";
import { DeliveryFavoritesPage, OffersPage, RestaurantPage, RestaurantsPage } from "./pages/Delivery";
import { CartPage } from "./pages/Cart";
import { CheckoutPage } from "./pages/Checkout";
import { ConfirmationPage, OrdersPage, TrackingPage } from "./pages/Orders";

export default function App(){return <DeliveryProvider><KitchenProvider><Routes><Route element={<Layout/>}><Route index element={<HomePage/>}/><Route path="restaurants" element={<RestaurantsPage/>}/><Route path="restaurants/:id" element={<RestaurantPage/>}/><Route path="offers" element={<OffersPage/>}/><Route path="favorites" element={<DeliveryFavoritesPage/>}/><Route path="cart" element={<CartPage/>}/><Route path="checkout" element={<CheckoutPage/>}/><Route path="orders" element={<OrdersPage/>}/><Route path="orders/:id" element={<TrackingPage/>}/><Route path="orders/:id/confirmed" element={<ConfirmationPage/>}/><Route path="kitchen/recipes" element={<RecipesPage/>}/><Route path="kitchen/recipes/:id" element={<RecipeDetailPage/>}/><Route path="kitchen/recipes/:id/cook" element={<CookingPage/>}/><Route path="kitchen/planner" element={<PlannerPage/>}/><Route path="kitchen/grocery" element={<GroceryPage/>}/><Route path="kitchen/nutrition" element={<NutritionPage/>}/><Route path="kitchen/tools" element={<ToolsPage/>}/><Route path="profile" element={<ProfilePage/>}/><Route path="recipes/*" element={<Navigate to="/kitchen/recipes" replace/>}/><Route path="planner" element={<Navigate to="/kitchen/planner" replace/>}/><Route path="grocery" element={<Navigate to="/kitchen/grocery" replace/>}/><Route path="nutrition" element={<Navigate to="/kitchen/nutrition" replace/>}/><Route path="tools" element={<Navigate to="/kitchen/tools" replace/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes></KitchenProvider></DeliveryProvider>}
