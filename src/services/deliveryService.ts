import type {
  BillSummary,
  CartItem,
  Coupon,
  FilterState,
  MenuItem,
  Restaurant
} from "../domain/delivery";

export function calculateBill(
  items: CartItem[],
  appliedCoupon?: Coupon | null
): BillSummary {
  const itemTotal = items.reduce(
    (sum, item) => sum + item.itemTotalPrice * item.quantity,
    0
  );

  if (items.length === 0) {
    return {
      itemTotal: 0,
      deliveryFee: 0,
      platformFee: 0,
      gstAmount: 0,
      discountAmount: 0,
      finalTotal: 0
    };
  }

  let deliveryFee = itemTotal >= 499 ? 0 : 35;
  const platformFee = 5;
  const gstAmount = Math.round(itemTotal * 0.05);

  let discountAmount = 0;
  if (appliedCoupon && itemTotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.code === "FREEDEL") {
      discountAmount = deliveryFee;
      deliveryFee = 0;
    } else if (appliedCoupon.discountPercent) {
      const calculated = Math.round(itemTotal * (appliedCoupon.discountPercent / 100));
      discountAmount = appliedCoupon.maxDiscount
        ? Math.min(appliedCoupon.maxDiscount, calculated)
        : calculated;
    } else if (appliedCoupon.discountFlat) {
      discountAmount = appliedCoupon.discountFlat;
    }
  }

  const finalTotal = Math.max(
    0,
    itemTotal + deliveryFee + platformFee + gstAmount - discountAmount
  );

  return {
    itemTotal,
    deliveryFee,
    platformFee,
    gstAmount,
    discountAmount,
    finalTotal
  };
}

export function filterRestaurants(
  list: Restaurant[],
  filters: Partial<FilterState>
): Restaurant[] {
  let result = [...list];

  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase().trim();
    result = result.filter(
      r =>
        r.name.toLowerCase().includes(q) ||
        r.cuisines.some(c => c.toLowerCase().includes(q)) ||
        r.menu.some(m => m.name.toLowerCase().includes(q))
    );
  }

  if (filters.pureVegOnly) {
    result = result.filter(r => r.isVeg);
  }

  if (filters.rating4Plus) {
    result = result.filter(r => r.rating >= 4.0);
  }

  if (filters.under30Mins) {
    result = result.filter(r => r.deliveryTimeMinutes <= 30);
  }

  if (filters.hasOffers) {
    result = result.filter(r => Boolean(r.offerText));
  }

  if (filters.selectedCuisines && filters.selectedCuisines.length > 0) {
    result = result.filter(r =>
      filters.selectedCuisines!.some(c => r.cuisines.includes(c))
    );
  }

  if (filters.maxCostForTwo) {
    result = result.filter(r => r.costForTwo <= filters.maxCostForTwo!);
  }

  // Sorting
  if (filters.sortBy === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  } else if (filters.sortBy === "deliveryTime") {
    result.sort((a, b) => a.deliveryTimeMinutes - b.deliveryTimeMinutes);
  } else if (filters.sortBy === "costLowToHigh") {
    result.sort((a, b) => a.costForTwo - b.costForTwo);
  } else if (filters.sortBy === "costHighToLow") {
    result.sort((a, b) => b.costForTwo - a.costForTwo);
  }

  return result;
}

export function searchFoodAndRestaurants(
  query: string,
  allRestaurants: Restaurant[]
): {
  matchedDishes: { dish: MenuItem; restaurant: Restaurant }[];
  matchedRestaurants: Restaurant[];
} {
  const q = query.toLowerCase().trim();
  if (!q) {
    return { matchedDishes: [], matchedRestaurants: [] };
  }

  const matchedRestaurants = allRestaurants.filter(
    r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisines.some(c => c.toLowerCase().includes(q))
  );

  const matchedDishes: { dish: MenuItem; restaurant: Restaurant }[] = [];
  allRestaurants.forEach(restaurant => {
    restaurant.menu.forEach(dish => {
      if (
        dish.name.toLowerCase().includes(q) ||
        dish.category.toLowerCase().includes(q) ||
        dish.description.toLowerCase().includes(q)
      ) {
        matchedDishes.push({ dish, restaurant });
      }
    });
  });

  return { matchedDishes, matchedRestaurants };
}
