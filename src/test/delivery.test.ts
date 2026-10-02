import { beforeEach, describe, expect, it, vi } from "vitest";
import { coupons } from "../data/deliveryOffers";
import { restaurants } from "../data/restaurants";
import type { CartItem, Restaurant } from "../domain/delivery";
import {
  calculateBill,
  filterRestaurants,
  searchFoodAndRestaurants
} from "../services/deliveryService";
import { LocalStorageRepository } from "../services/storage";

const sampleRestaurant: Restaurant = restaurants[0];
const sampleDish = sampleRestaurant.menu[0];

const sampleCartItem: CartItem = {
  cartItemId: `${sampleDish.id}__base`,
  menuItem: sampleDish,
  selectedOptions: [],
  quantity: 2,
  itemTotalPrice: sampleDish.price
};

describe("delivery billing & coupons", () => {
  it("calculates standard item total, delivery fee, platform fee and GST", () => {
    const bill = calculateBill([sampleCartItem], null);
    const expectedItemTotal = sampleDish.price * 2;
    expect(bill.itemTotal).toBe(expectedItemTotal);
    expect(bill.platformFee).toBe(5);
    expect(bill.gstAmount).toBe(Math.round(expectedItemTotal * 0.05));
    // Item total >= 499 gets free delivery, otherwise ₹35
    const expectedDelivery = expectedItemTotal >= 499 ? 0 : 35;
    expect(bill.deliveryFee).toBe(expectedDelivery);
    expect(bill.finalTotal).toBe(
      expectedItemTotal + expectedDelivery + 5 + Math.round(expectedItemTotal * 0.05)
    );
  });

  it("applies percentage discount coupon with cap (YUMMY50)", () => {
    const yummyCoupon = coupons.find(c => c.code === "YUMMY50")!;
    const bill = calculateBill([sampleCartItem], yummyCoupon);
    // 50% discount capped at ₹100
    expect(bill.discountAmount).toBe(100);
  });

  it("applies free delivery coupon (FREEDEL)", () => {
    // 1 item with price under 499 to test delivery fee waiver
    const singleItem: CartItem = {
      ...sampleCartItem,
      quantity: 1,
      itemTotalPrice: 200
    };
    const freeDelCoupon = coupons.find(c => c.code === "FREEDEL")!;
    const bill = calculateBill([singleItem], freeDelCoupon);
    expect(bill.deliveryFee).toBe(0);
    expect(bill.discountAmount).toBe(35);
  });

  it("does not apply coupon if order is below minimum spend threshold", () => {
    const cheapItem: CartItem = {
      ...sampleCartItem,
      quantity: 1,
      itemTotalPrice: 80
    };
    const yummyCoupon = coupons.find(c => c.code === "YUMMY50")!; // min 199
    const bill = calculateBill([cheapItem], yummyCoupon);
    expect(bill.discountAmount).toBe(0);
  });
});

describe("restaurant filtering and search", () => {
  it("filters pure vegetarian restaurants", () => {
    const vegList = filterRestaurants(restaurants, { pureVegOnly: true });
    expect(vegList.length).toBeGreaterThan(0);
    expect(vegList.every(r => r.isVeg)).toBe(true);
  });

  it("filters restaurants with rating >= 4.0", () => {
    const topRated = filterRestaurants(restaurants, { rating4Plus: true });
    expect(topRated.every(r => r.rating >= 4.0)).toBe(true);
  });

  it("filters restaurants delivering under 30 mins", () => {
    const fast = filterRestaurants(restaurants, { under30Mins: true });
    expect(fast.every(r => r.deliveryTimeMinutes <= 30)).toBe(true);
  });

  it("searches both dishes and restaurants by keyword", () => {
    const { matchedDishes, matchedRestaurants } = searchFoodAndRestaurants(
      "biryani",
      restaurants
    );
    expect(matchedDishes.length).toBeGreaterThan(0);
    expect(matchedRestaurants.length).toBeGreaterThan(0);
  });
});

describe("resilient delivery storage", () => {
  const storeMap = new Map<string, string>();
  beforeEach(() => {
    storeMap.clear();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => storeMap.get(key) ?? null,
      setItem: (key: string, value: string) => storeMap.set(key, value)
    });
  });

  it("round-trips delivery addresses and recovers on corrupted data", () => {
    const repo = new LocalStorageRepository<string[]>("test:addresses", 1);
    repo.write(["Home: Flat 101"]);
    expect(repo.read([])).toEqual(["Home: Flat 101"]);

    storeMap.set("test:addresses", "{ malformed json }");
    expect(repo.read([])).toEqual([]);
  });
});
