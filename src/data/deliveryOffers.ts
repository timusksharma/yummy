import type { Coupon } from "../domain/delivery";

export const coupons: Coupon[] = [
  {
    code: "YUMMY50",
    title: "50% OFF up to ₹100",
    description: "Valid on orders above ₹199. Max discount ₹100.",
    discountPercent: 50,
    minOrder: 199,
    maxDiscount: 100
  },
  {
    code: "FREEDEL",
    title: "Free Delivery",
    description: "Get free doorstep delivery on all orders above ₹149.",
    discountFlat: 35,
    minOrder: 149
  },
  {
    code: "SAVE125",
    title: "Flat ₹125 OFF",
    description: "Use code SAVE125 on orders above ₹399.",
    discountFlat: 125,
    minOrder: 399
  },
  {
    code: "WELCOME100",
    title: "₹100 Welcome Discount",
    description: "Special deal for your first meal on Yummy! Min order ₹249.",
    discountFlat: 100,
    minOrder: 249
  }
];

export interface PromoBanner {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  code: string;
  bgGradient: string;
  buttonText: string;
}

export const promoBanners: PromoBanner[] = [
  {
    id: "promo-1",
    tag: "FIRST ORDER SPECIAL",
    title: "Craving something good?",
    subtitle: "Get 50% OFF up to ₹100 with code YUMMY50",
    code: "YUMMY50",
    bgGradient: "linear-gradient(135deg, #ff4d2e 0%, #ff8a00 100%)",
    buttonText: "Use YUMMY50"
  },
  {
    id: "promo-2",
    tag: "ZERO DELIVERY FEE",
    title: "Rain or shine delivery",
    subtitle: "Free delivery on all neighborhood orders above ₹149",
    code: "FREEDEL",
    bgGradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
    buttonText: "Use FREEDEL"
  },
  {
    id: "promo-3",
    tag: "WEEKEND FEAST",
    title: "Flat ₹125 OFF on Family Meals",
    subtitle: "Applicable on orders above ₹399 from top rated kitchens",
    code: "SAVE125",
    bgGradient: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
    buttonText: "Use SAVE125"
  }
];
