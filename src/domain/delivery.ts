export type CuisineType =
  | "North Indian"
  | "South Indian"
  | "Biryani"
  | "Pizza"
  | "Burgers"
  | "Chinese"
  | "Italian"
  | "Rolls & Wraps"
  | "Desserts"
  | "Healthy & Salads"
  | "Beverages"
  | "Street Food";

export interface CustomizationOption {
  id: string;
  name: string;
  extraPrice: number;
}

export interface CustomizationGroup {
  id: string;
  title: string;
  required: boolean;
  minSelect?: number;
  maxSelect?: number;
  options: CustomizationOption[];
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  category: string;
  customizationGroups?: CustomizationGroup[];
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisines: CuisineType[];
  rating: number;
  reviewCount: number;
  deliveryTimeMinutes: number;
  distanceKm: number;
  costForTwo: number;
  isVeg: boolean;
  isPromoted?: boolean;
  offerText?: string;
  address: string;
  openingHours: string;
  menu: MenuItem[];
}

export interface SelectedCustomization {
  groupId: string;
  groupTitle: string;
  optionId: string;
  optionName: string;
  extraPrice: number;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  selectedOptions: SelectedCustomization[];
  quantity: number;
  itemTotalPrice: number;
  specialInstructions?: string;
}

export interface DeliveryAddress {
  id: string;
  label: "Home" | "Work" | "Other";
  street: string;
  landmark?: string;
  city: string;
  pincode: string;
  isDefault?: boolean;
}

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountPercent?: number;
  discountFlat?: number;
  minOrder: number;
  maxDiscount?: number;
}

export type OrderStatus =
  | "CONFIRMED"
  | "PREPARING"
  | "PICKED_UP"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED";

export interface DeliveryPartner {
  name: string;
  phone: string;
  rating: number;
  vehicle: string;
  photo: string;
}

export interface BillSummary {
  itemTotal: number;
  deliveryFee: number;
  platformFee: number;
  gstAmount: number;
  discountAmount: number;
  finalTotal: number;
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  items: CartItem[];
  bill: BillSummary;
  address: DeliveryAddress;
  paymentMethod: string;
  status: OrderStatus;
  placedAt: string;
  deliveryPartner: DeliveryPartner;
  estimatedDeliveryMinutes: number;
  rating?: {
    foodRating: number;
    deliveryRating: number;
    comment?: string;
  };
}

export interface FilterState {
  searchQuery: string;
  pureVegOnly: boolean;
  rating4Plus: boolean;
  under30Mins: boolean;
  hasOffers: boolean;
  selectedCuisines: CuisineType[];
  maxCostForTwo?: number;
  sortBy: "relevance" | "rating" | "deliveryTime" | "costLowToHigh" | "costHighToLow";
}
