import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { DeliveryProvider } from "./hooks/useDeliveryState";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { HomePage } from "./pages/Home";
import { OffersPage } from "./pages/OffersPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";
import { OrdersPage } from "./pages/OrdersPage";
import { OrderTrackingPage } from "./pages/OrderTrackingPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RestaurantDetailPage } from "./pages/RestaurantDetailPage";
import { RestaurantsPage } from "./pages/RestaurantsPage";
import { SearchPage } from "./pages/SearchPage";

export default function App() {
  return (
    <DeliveryProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="restaurants" element={<RestaurantsPage />} />
          <Route path="restaurants/:id" element={<RestaurantDetailPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-confirmed/:orderId" element={<OrderConfirmationPage />} />
          <Route path="track-order/:orderId" element={<OrderTrackingPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </DeliveryProvider>
  );
}
