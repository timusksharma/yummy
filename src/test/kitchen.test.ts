import { beforeEach, describe, expect, it, vi } from "vitest";
import { recipes } from "../data/recipes";
import { aggregateGroceries, convertMeasurement, convertTemperature, createMealPlan, rankRecipes } from "../services/kitchen";
import { LocalStorageRepository } from "../services/storage";
import { restaurants, coupons } from "../data/delivery";
import { priceCart, searchRestaurants, statusFor } from "../services/delivery";
import type { CartItem } from "../domain/delivery";

describe("kitchen services", () => {
  it("ranks recipes by matching ingredients", () => {
    const result = rankRecipes(recipes, ["tomatoes", "rice", "spinach"]);
    expect(result[0].recipe.id).toBe("mediterranean-bowl");
    expect(result[0].matches).toBe(3);
  });
  it("creates a full seven-day meal plan", () => {
    const plan = createMealPlan(recipes, "Vegetarian");
    expect(plan.slots).toHaveLength(21);
    expect(plan.slots.every(slot => recipes.find(r => r.id === slot.recipeId)?.diets.includes("Vegetarian"))).toBe(true);
  });
  it("combines duplicate grocery ingredients", () => {
    const groceries = aggregateGroceries(createMealPlan(recipes.slice(0, 1), "Balanced"), recipes);
    expect(groceries.find(item => item.name === "Rice")?.amount).toBe(21);
  });
  it("converts common measures and temperatures", () => {
    expect(convertMeasurement(1, "cup", "ml")).toBe(240);
    expect(convertTemperature(180, "C")).toBe(356);
  });
});

describe("delivery services", () => {
  const cart: CartItem[] = [{ id:"one", dishId:"butter-chicken", restaurantId:"spice-route", quantity:2, choices:[] }];
  it("searches names, cuisines and dishes", () => {
    expect(searchRestaurants(restaurants,"momos")[0].id).toBe("wok-this-way");
    expect(searchRestaurants(restaurants,"butter chicken")[0].id).toBe("spice-route");
  });
  it("calculates quantities, tax and coupon discounts", () => {
    const total=priceCart(cart,restaurants,coupons[0]);
    expect(total.subtotal).toBe(698);
    expect(total.tax).toBe(35);
    expect(total.discount).toBe(120);
    expect(total.total).toBe(613);
  });
  it("progresses demo order status by elapsed time", () => {
    const now=Date.now();
    expect(statusFor(now,now)).toBe("Confirmed");
    expect(statusFor(now,now+5*60000)).toBe("Delivered");
  });
});

describe("versioned storage", () => {
  const values = new Map<string, string>();
  beforeEach(() => {
    values.clear();
    vi.stubGlobal("localStorage", { getItem:(key:string)=>values.get(key)??null, setItem:(key:string,value:string)=>values.set(key,value) });
  });
  it("round-trips valid values and recovers from malformed data", () => {
    const store = new LocalStorageRepository<string[]>("test");
    store.write(["saved"]);
    expect(store.read([])).toEqual(["saved"]);
    values.set("test", "not-json");
    expect(store.read([])).toEqual([]);
  });
});
