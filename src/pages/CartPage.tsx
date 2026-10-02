import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  MapPin,
  Minus,
  Percent,
  Plus,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  Utensils
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { coupons } from "../data/deliveryOffers";
import { restaurants } from "../data/restaurants";
import { useDelivery } from "../hooks/useDeliveryState";

export function CartPage() {
  const navigate = useNavigate();
  const {
    cart,
    bill,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    location,
    addItem
  } = useDelivery();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [cookingNote, setCookingNote] = useState("");

  const restaurant = restaurants.find(r => r.id === cart.restaurantId);

  const handleApplyCoupon = (code: string) => {
    const found = coupons.find(
      c => c.code.toLowerCase() === code.trim().toLowerCase()
    );
    if (!found) {
      setCouponError("Invalid coupon code.");
      return;
    }
    if (bill.itemTotal < found.minOrder) {
      setCouponError(`Min order of ₹${found.minOrder} required for this coupon.`);
      return;
    }
    applyCoupon(found);
    setCouponError("");
    setCouponInput("");
  };

  const handleRemoveCoupon = () => {
    applyCoupon(null);
    setCouponError("");
  };

  if (cart.items.length === 0) {
    return (
      <section className="section page empty">
        <span style={{ fontSize: "4rem" }}>🛍️</span>
        <h2>Your Cart is Empty</h2>
        <p>Good food is always just around the corner. Explore restaurants to fill your cart!</p>
        <Link className="primary" to="/restaurants">
          Browse Nearby Restaurants
        </Link>
      </section>
    );
  }

  // Quick add-on recommendations from the current restaurant or a dessert
  const addOns = restaurant?.menu.filter(m => m.category === "Beverages" || m.category === "Desserts" || m.category === "Sides") || [];

  return (
    <section className="section page" style={{ paddingTop: 30 }}>
      <div className="page-heading">
        <span className="kicker">Review Your Order</span>
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart-layout">
        {/* Left Column: Items, Add-ons, Instructions */}
        <div className="cart-main">
          {/* Restaurant Banner */}
          <div className="cart-restaurant-card">
            <div>
              <span className="kicker">Ordering from</span>
              <h2>{cart.restaurantName}</h2>
              <p>
                <Clock size={15} style={{ display: "inline", marginRight: 4 }} />
                Delivering in ~25-30 mins to <b>{location.label}</b>
              </p>
            </div>
            <button className="clear-cart-link" onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          {/* Cart Items List */}
          <div className="cart-items-card">
            {cart.items.map(item => (
              <div key={item.cartItemId} className="cart-item-row">
                <div className="cart-item-left">
                  <span
                    className={`diet-icon ${item.menuItem.isVeg ? "veg" : "non-veg"}`}
                  >
                    <span className="dot" />
                  </span>

                  <div>
                    <b>{item.menuItem.name}</b>
                    {item.selectedOptions.length > 0 && (
                      <p className="cart-item-customs">
                        {item.selectedOptions.map(o => o.optionName).join(", ")}
                      </p>
                    )}
                    <span className="unit-price">₹{item.itemTotalPrice} each</span>
                  </div>
                </div>

                <div className="cart-item-right">
                  <div className="qty-control">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, -1)}
                      aria-label="Decrease"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, 1)}
                      aria-label="Increase"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <b className="item-row-total">
                    ₹{item.itemTotalPrice * item.quantity}
                  </b>

                  <button
                    className="delete-item-btn"
                    onClick={() => removeItem(item.cartItemId)}
                    aria-label="Remove item"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            <Link
              to={`/restaurants/${cart.restaurantId}`}
              className="add-more-link"
            >
              + Add more items from {cart.restaurantName}
            </Link>
          </div>

          {/* Complete Your Meal Add-ons */}
          {addOns.length > 0 && (
            <div className="addons-card">
              <h3>Complete your meal</h3>
              <p>Popular drinks, sides, and sweet treats to round out your order:</p>

              <div className="addons-grid">
                {addOns.slice(0, 3).map(addon => (
                  <div key={addon.id} className="addon-pill-item">
                    <img src={addon.image} alt={addon.name} width="50" height="50" />
                    <div>
                      <b>{addon.name}</b>
                      <span>₹{addon.price}</span>
                    </div>
                    <button
                      className="addon-add-btn"
                      onClick={() => restaurant && addItem(addon, [], restaurant)}
                    >
                      + ADD
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delivery Note */}
          <div className="form-group" style={{ marginTop: 20 }}>
            <label>Cooking or Delivery Instructions</label>
            <input
              value={cookingNote}
              onChange={e => setCookingNote(e.target.value)}
              placeholder="e.g. Please leave at door, don't ring doorbell, avoid plastic cutlery…"
            />
          </div>
        </div>

        {/* Right Column: Coupons & Bill Summary */}
        <div className="cart-sidebar">
          {/* Coupon Module */}
          <div className="coupon-box">
            <h3>
              <Tag size={18} color="var(--tomato)" /> Apply Coupons & Deals
            </h3>

            {cart.appliedCoupon ? (
              <div className="applied-coupon-pill">
                <div>
                  <b>{cart.appliedCoupon.code} applied!</b>
                  <p>You saved ₹{bill.discountAmount} on this order</p>
                </div>
                <button onClick={handleRemoveCoupon}>Remove</button>
              </div>
            ) : (
              <>
                <div className="coupon-input-row">
                  <input
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Enter promo code"
                  />
                  <button
                    className="secondary compact"
                    onClick={() => handleApplyCoupon(couponInput)}
                  >
                    Apply
                  </button>
                </div>

                {couponError && (
                  <small style={{ color: "#e11d48", display: "block", marginTop: 6 }}>
                    {couponError}
                  </small>
                )}

                <div className="available-coupons-list">
                  {coupons.map(c => (
                    <div
                      key={c.code}
                      className="mini-coupon-card"
                      onClick={() => handleApplyCoupon(c.code)}
                    >
                      <div>
                        <b>{c.code}</b>
                        <p>{c.description}</p>
                      </div>
                      <span className="apply-label">Apply</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Bill Summary */}
          <div className="bill-summary-card">
            <h3>Bill Details</h3>

            <div className="bill-line">
              <span>Item Total</span>
              <b>₹{bill.itemTotal}</b>
            </div>

            <div className="bill-line">
              <span>Delivery Partner Fee</span>
              <b>
                {bill.deliveryFee === 0 ? (
                  <span style={{ color: "var(--green)" }}>FREE</span>
                ) : (
                  `₹${bill.deliveryFee}`
                )}
              </b>
            </div>

            <div className="bill-line">
              <span>Platform Fee</span>
              <b>₹{bill.platformFee}</b>
            </div>

            <div className="bill-line">
              <span>GST & Restaurant Charges</span>
              <b>₹{bill.gstAmount}</b>
            </div>

            {bill.discountAmount > 0 && (
              <div className="bill-line discount-line">
                <span>Total Savings & Coupon</span>
                <b>- ₹{bill.discountAmount}</b>
              </div>
            )}

            <hr className="bill-divider" />

            <div className="bill-line total-line">
              <b>TO PAY</b>
              <b>₹{bill.finalTotal}</b>
            </div>

            <button
              className="primary proceed-checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <small className="cancellation-policy">
              Review your address and payment method on the next step before placing order.
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}
