import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { MenuItem, Restaurant } from "../domain/delivery";
import { useDelivery } from "../hooks/useDeliveryState";
import { CustomizationModal } from "./CustomizationModal";

export function DishCard({
  dish,
  restaurant
}: {
  dish: MenuItem;
  restaurant: Restaurant;
}) {
  const { cart, addItem, updateQuantity } = useDelivery();
  const [customizing, setCustomizing] = useState(false);

  // Check if any cart item matches this dish ID
  const cartEntries = cart.items.filter(i => i.menuItem.id === dish.id);
  const totalQuantity = cartEntries.reduce((sum, i) => sum + i.quantity, 0);

  const handleAddClick = () => {
    if (dish.customizationGroups && dish.customizationGroups.length > 0) {
      setCustomizing(true);
    } else {
      addItem(dish, [], restaurant);
    }
  };

  const handleIncrement = () => {
    if (dish.customizationGroups && dish.customizationGroups.length > 0) {
      setCustomizing(true);
    } else if (cartEntries.length > 0) {
      updateQuantity(cartEntries[0].cartItemId, 1);
    }
  };

  const handleDecrement = () => {
    if (cartEntries.length > 0) {
      // Decrement the last added variant of this dish
      const lastEntry = cartEntries[cartEntries.length - 1];
      updateQuantity(lastEntry.cartItemId, -1);
    }
  };

  return (
    <>
      <article className="dish-card">
        <div className="dish-info">
          <div className="dish-header-row">
            <span
              className={`diet-icon ${dish.isVeg ? "veg" : "non-veg"}`}
              title={dish.isVeg ? "Pure Vegetarian" : "Non-Vegetarian"}
            >
              <span className="dot" />
            </span>

            {dish.isBestseller && (
              <span className="bestseller-badge">★ Bestseller</span>
            )}
          </div>

          <h3 className="dish-title">{dish.name}</h3>

          <div className="dish-pricing">
            <b className="price">₹{dish.price}</b>
            {dish.originalPrice && (
              <span className="orig-price">₹{dish.originalPrice}</span>
            )}
          </div>

          <p className="dish-desc">{dish.description}</p>
        </div>

        <div className="dish-action-col">
          <div className="dish-thumb-wrap">
            <img
              src={dish.image}
              alt={dish.name}
              width="240"
              height="200"
              loading="lazy"
            />

            <div className="add-btn-container">
              {totalQuantity === 0 ? (
                <button className="add-btn" onClick={handleAddClick}>
                  ADD
                </button>
              ) : (
                <div className="qty-control">
                  <button onClick={handleDecrement} aria-label="Decrease quantity">
                    <Minus size={14} />
                  </button>
                  <span>{totalQuantity}</span>
                  <button onClick={handleIncrement} aria-label="Increase quantity">
                    <Plus size={14} />
                  </button>
                </div>
              )}

              {dish.customizationGroups && dish.customizationGroups.length > 0 && (
                <small className="custom-hint">Customisable</small>
              )}
            </div>
          </div>
        </div>
      </article>

      {customizing && (
        <CustomizationModal
          item={dish}
          restaurant={restaurant}
          isOpen={customizing}
          onClose={() => setCustomizing(false)}
        />
      )}
    </>
  );
}
