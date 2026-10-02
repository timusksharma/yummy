import type { CartItem, Coupon, DeliveryAddress, Order } from "../domain/delivery";
import { initialAddresses } from "../data/addresses";
import { LocalStorageRepository } from "./storage";

export interface StoredCart {
  restaurantId: string | null;
  restaurantName: string | null;
  items: CartItem[];
  appliedCoupon: Coupon | null;
}

export const deliveryStores = {
  cart: new LocalStorageRepository<StoredCart>("yummy:delivery:cart:v1", 1),
  location: new LocalStorageRepository<DeliveryAddress>("yummy:delivery:location:v1", 1),
  addresses: new LocalStorageRepository<DeliveryAddress[]>("yummy:delivery:addresses:v1", 1),
  orders: new LocalStorageRepository<Order[]>("yummy:delivery:orders:v1", 1),
  favoriteRestaurants: new LocalStorageRepository<string[]>("yummy:delivery:fav_restaurants:v1", 1),
  favoriteDishes: new LocalStorageRepository<string[]>("yummy:delivery:fav_dishes:v1", 1),
};

export const defaultCart: StoredCart = {
  restaurantId: null,
  restaurantName: null,
  items: [],
  appliedCoupon: null
};

export const defaultLocation: DeliveryAddress = initialAddresses[0];
