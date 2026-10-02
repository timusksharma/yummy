import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from "react";
import type {
  BillSummary,
  CartItem,
  Coupon,
  DeliveryAddress,
  MenuItem,
  Order,
  OrderStatus,
  Restaurant,
  SelectedCustomization
} from "../domain/delivery";
import { initialAddresses } from "../data/addresses";
import { calculateBill } from "../services/deliveryService";
import { defaultCart, deliveryStores, type StoredCart } from "../services/deliveryStorage";
import { usePersistentState } from "./usePersistentState";

interface DeliveryContextValue {
  // Location
  location: DeliveryAddress;
  setLocation: (addr: DeliveryAddress) => void;
  addresses: DeliveryAddress[];
  addAddress: (addr: Omit<DeliveryAddress, "id">) => void;
  deleteAddress: (id: string) => void;

  // Cart
  cart: StoredCart;
  bill: BillSummary;
  itemCount: number;
  addItem: (
    menuItem: MenuItem,
    selectedOptions: SelectedCustomization[],
    restaurant: Restaurant
  ) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  applyCoupon: (coupon: Coupon | null) => void;

  // Multi-restaurant conflict modal
  pendingSwitch: {
    menuItem: MenuItem;
    selectedOptions: SelectedCustomization[];
    restaurant: Restaurant;
  } | null;
  confirmRestaurantSwitch: () => void;
  cancelRestaurantSwitch: () => void;

  // Favorites
  favoriteRestaurants: string[];
  toggleFavoriteRestaurant: (id: string) => void;
  favoriteDishes: string[];
  toggleFavoriteDish: (id: string) => void;

  // Orders
  orders: Order[];
  activeOrder: Order | null;
  placeOrder: (address: DeliveryAddress, paymentMethod: string) => Order;
  advanceOrderStatus: (orderId: string) => void;
  rateOrder: (
    orderId: string,
    foodRating: number,
    deliveryRating: number,
    comment?: string
  ) => void;
  reorder: (order: Order) => boolean;
}

const DeliveryContext = createContext<DeliveryContextValue | null>(null);

const ORDER_FLOW: OrderStatus[] = [
  "CONFIRMED",
  "PREPARING",
  "PICKED_UP",
  "ON_THE_WAY",
  "DELIVERED"
];

export function DeliveryProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = usePersistentState(
    deliveryStores.location,
    initialAddresses[0]
  );
  const [addresses, setAddresses] = usePersistentState(
    deliveryStores.addresses,
    initialAddresses
  );
  const [cart, setCart] = usePersistentState(deliveryStores.cart, defaultCart);
  const [orders, setOrders] = usePersistentState(deliveryStores.orders, []);
  const [favoriteRestaurants, setFavoriteRestaurants] = usePersistentState(
    deliveryStores.favoriteRestaurants,
    ["rest-1", "rest-2"]
  );
  const [favoriteDishes, setFavoriteDishes] = usePersistentState(
    deliveryStores.favoriteDishes,
    ["b-1", "p-1"]
  );

  const [pendingSwitch, setPendingSwitch] = useState<{
    menuItem: MenuItem;
    selectedOptions: SelectedCustomization[];
    restaurant: Restaurant;
  } | null>(null);

  const bill = useMemo(
    () => calculateBill(cart.items, cart.appliedCoupon),
    [cart.items, cart.appliedCoupon]
  );

  const itemCount = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.quantity, 0),
    [cart.items]
  );

  const activeOrder = useMemo(() => {
    return orders.find(o => o.status !== "DELIVERED" && o.status !== "CANCELLED") || null;
  }, [orders]);

  const addAddress = useCallback(
    (addr: Omit<DeliveryAddress, "id">) => {
      const newAddr: DeliveryAddress = {
        ...addr,
        id: `addr-${Date.now()}`
      };
      setAddresses(prev => [...prev, newAddr]);
      setLocation(newAddr);
    },
    [setAddresses, setLocation]
  );

  const deleteAddress = useCallback(
    (id: string) => {
      setAddresses(prev => prev.filter(a => a.id !== id));
    },
    [setAddresses]
  );

  const doAddItem = useCallback(
    (
      menuItem: MenuItem,
      selectedOptions: SelectedCustomization[],
      restaurant: Restaurant
    ) => {
      const extraTotal = selectedOptions.reduce((s, o) => s + o.extraPrice, 0);
      const unitPrice = menuItem.price + extraTotal;
      const optionKey = selectedOptions
        .map(o => o.optionId)
        .sort()
        .join("-");
      const cartItemId = `${menuItem.id}__${optionKey || "base"}`;

      setCart(prev => {
        const existingIndex = prev.items.findIndex(
          i => i.cartItemId === cartItemId
        );
        let updatedItems: CartItem[];

        if (existingIndex > -1) {
          updatedItems = prev.items.map((item, idx) =>
            idx === existingIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedItems = [
            ...prev.items,
            {
              cartItemId,
              menuItem,
              selectedOptions,
              quantity: 1,
              itemTotalPrice: unitPrice
            }
          ];
        }

        return {
          ...prev,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          items: updatedItems
        };
      });
    },
    [setCart]
  );

  const addItem = useCallback(
    (
      menuItem: MenuItem,
      selectedOptions: SelectedCustomization[],
      restaurant: Restaurant
    ) => {
      if (
        cart.restaurantId &&
        cart.restaurantId !== restaurant.id &&
        cart.items.length > 0
      ) {
        setPendingSwitch({ menuItem, selectedOptions, restaurant });
        return;
      }
      doAddItem(menuItem, selectedOptions, restaurant);
    },
    [cart.restaurantId, cart.items.length, doAddItem]
  );

  const confirmRestaurantSwitch = useCallback(() => {
    if (!pendingSwitch) return;
    setCart(defaultCart);
    doAddItem(
      pendingSwitch.menuItem,
      pendingSwitch.selectedOptions,
      pendingSwitch.restaurant
    );
    setPendingSwitch(null);
  }, [pendingSwitch, doAddItem, setCart]);

  const cancelRestaurantSwitch = useCallback(() => {
    setPendingSwitch(null);
  }, []);

  const updateQuantity = useCallback(
    (cartItemId: string, delta: number) => {
      setCart(prev => {
        const updated = prev.items
          .map(item => {
            if (item.cartItemId === cartItemId) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[];

        if (updated.length === 0) {
          return defaultCart;
        }

        return {
          ...prev,
          items: updated
        };
      });
    },
    [setCart]
  );

  const removeItem = useCallback(
    (cartItemId: string) => {
      setCart(prev => {
        const updated = prev.items.filter(i => i.cartItemId !== cartItemId);
        if (updated.length === 0) {
          return defaultCart;
        }
        return {
          ...prev,
          items: updated
        };
      });
    },
    [setCart]
  );

  const clearCart = useCallback(() => {
    setCart(defaultCart);
  }, [setCart]);

  const applyCoupon = useCallback(
    (coupon: Coupon | null) => {
      setCart(prev => ({
        ...prev,
        appliedCoupon: coupon
      }));
    },
    [setCart]
  );

  const toggleFavoriteRestaurant = useCallback(
    (id: string) => {
      setFavoriteRestaurants(prev =>
        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      );
    },
    [setFavoriteRestaurants]
  );

  const toggleFavoriteDish = useCallback(
    (id: string) => {
      setFavoriteDishes(prev =>
        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      );
    },
    [setFavoriteDishes]
  );

  const placeOrder = useCallback(
    (address: DeliveryAddress, paymentMethod: string): Order => {
      const orderId = `YUM-${Math.floor(100000 + Math.random() * 900000)}`;
      const currentBill = calculateBill(cart.items, cart.appliedCoupon);

      const newOrder: Order = {
        id: orderId,
        restaurantId: cart.restaurantId || "rest-1",
        restaurantName: cart.restaurantName || "Bawarchi Royal Biryani",
        restaurantImage:
          "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80",
        items: [...cart.items],
        bill: currentBill,
        address,
        paymentMethod,
        status: "CONFIRMED",
        placedAt: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        }),
        estimatedDeliveryMinutes: 28,
        deliveryPartner: {
          name: "Ramesh Kumar",
          phone: "+91 98765 43210",
          rating: 4.9,
          vehicle: "TVS NTorq (KA-03-HM-4129)",
          photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
        }
      };

      setOrders(prev => [newOrder, ...prev]);
      setCart(defaultCart);
      return newOrder;
    },
    [cart, setCart, setOrders]
  );

  const advanceOrderStatus = useCallback(
    (orderId: string) => {
      setOrders(prev =>
        prev.map(o => {
          if (o.id !== orderId) return o;
          const currentIdx = ORDER_FLOW.indexOf(o.status);
          if (currentIdx > -1 && currentIdx < ORDER_FLOW.length - 1) {
            return { ...o, status: ORDER_FLOW[currentIdx + 1] };
          }
          return o;
        })
      );
    },
    [setOrders]
  );

  const rateOrder = useCallback(
    (
      orderId: string,
      foodRating: number,
      deliveryRating: number,
      comment?: string
    ) => {
      setOrders(prev =>
        prev.map(o => {
          if (o.id !== orderId) return o;
          return {
            ...o,
            rating: { foodRating, deliveryRating, comment }
          };
        })
      );
    },
    [setOrders]
  );

  const reorder = useCallback(
    (order: Order): boolean => {
      setCart({
        restaurantId: order.restaurantId,
        restaurantName: order.restaurantName,
        items: [...order.items],
        appliedCoupon: null
      });
      return true;
    },
    [setCart]
  );

  const value = useMemo(
    () => ({
      location,
      setLocation,
      addresses,
      addAddress,
      deleteAddress,
      cart,
      bill,
      itemCount,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      applyCoupon,
      pendingSwitch,
      confirmRestaurantSwitch,
      cancelRestaurantSwitch,
      favoriteRestaurants,
      toggleFavoriteRestaurant,
      favoriteDishes,
      toggleFavoriteDish,
      orders,
      activeOrder,
      placeOrder,
      advanceOrderStatus,
      rateOrder,
      reorder
    }),
    [
      location,
      setLocation,
      addresses,
      addAddress,
      deleteAddress,
      cart,
      bill,
      itemCount,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      applyCoupon,
      pendingSwitch,
      confirmRestaurantSwitch,
      cancelRestaurantSwitch,
      favoriteRestaurants,
      toggleFavoriteRestaurant,
      favoriteDishes,
      toggleFavoriteDish,
      orders,
      activeOrder,
      placeOrder,
      advanceOrderStatus,
      rateOrder,
      reorder
    ]
  );

  return (
    <DeliveryContext.Provider value={value}>
      {children}
    </DeliveryContext.Provider>
  );
}

// Provider and colocated hook intentionally share one module
// eslint-disable-next-line react-refresh/only-export-components
export function useDelivery() {
  const context = useContext(DeliveryContext);
  if (!context) {
    throw new Error("useDelivery must be used within a DeliveryProvider");
  }
  return context;
}
