import {
  ArrowLeft,
  Banknote,
  Briefcase,
  Check,
  CreditCard,
  Home,
  Lock,
  MapPin,
  Plus,
  ShieldCheck,
  Smartphone,
  Wallet
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { DeliveryAddress } from "../domain/delivery";
import { useDelivery } from "../hooks/useDeliveryState";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, bill, location, setLocation, addresses, addAddress, placeOrder } = useDelivery();

  const [paymentMethod, setPaymentMethod] = useState("Google Pay (UPI)");
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  // New address state
  const [newStreet, setNewStreet] = useState("");
  const [newLandmark, setNewLandmark] = useState("");
  const [newLabel, setNewLabel] = useState<"Home" | "Work" | "Other">("Home");

  if (cart.items.length === 0) {
    return (
      <section className="section page empty">
        <h2>Your Cart is Empty</h2>
        <p>Please select delicious food before heading to checkout.</p>
        <Link className="primary" to="/restaurants">
          Browse Restaurants
        </Link>
      </section>
    );
  }

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim()) return;
    addAddress({
      label: newLabel,
      street: newStreet.trim(),
      landmark: newLandmark.trim() || undefined,
      city: "Bengaluru",
      pincode: "560038"
    });
    setShowNewAddressForm(false);
    setNewStreet("");
    setNewLandmark("");
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = placeOrder(location, paymentMethod);
      setIsProcessing(false);
      navigate(`/order-confirmed/${order.id}`);
    }, 1500);
  };

  const paymentOptions = [
    { id: "gpay", name: "Google Pay (UPI)", icon: <Smartphone size={20} color="#4285F4" /> },
    { id: "phonepe", name: "PhonePe UPI", icon: <Smartphone size={20} color="#5f259f" /> },
    { id: "paytm", name: "Paytm UPI", icon: <Smartphone size={20} color="#00baf2" /> },
    { id: "card", name: "Credit / Debit Card", icon: <CreditCard size={20} color="var(--orange)" /> },
    { id: "cod", name: "Cash on Delivery", icon: <Banknote size={20} color="var(--green)" /> }
  ];

  return (
    <section className="section page" style={{ paddingTop: 30 }}>
      <Link className="back" to="/cart">
        <ArrowLeft size={18} /> Back to cart
      </Link>

      <div className="page-heading">
        <span className="kicker">Final Step</span>
        <h1>Checkout & Payment</h1>
      </div>

      <div className="checkout-layout">
        {/* Left Column: Address & Payment Selection */}
        <div className="checkout-main">
          {/* Step 1: Address Selection */}
          <div className="checkout-card">
            <div className="step-title-row">
              <span className="step-num">1</span>
              <div>
                <h2>Select Delivery Address</h2>
                <p>Where should our delivery partner bring your meal?</p>
              </div>
            </div>

            <div className="address-options-grid">
              {addresses.map(addr => {
                const isSelected = addr.id === location.id;
                return (
                  <div
                    key={addr.id}
                    className={`checkout-addr-card ${isSelected ? "selected" : ""}`}
                    onClick={() => setLocation(addr)}
                  >
                    <div className="addr-top">
                      <span className="addr-type-tag">
                        {addr.label === "Home" ? <Home size={14} /> : <Briefcase size={14} />}
                        {addr.label}
                      </span>
                      {isSelected && <span className="checked-indicator"><Check size={14} /></span>}
                    </div>
                    <p className="addr-text">{addr.street}</p>
                    {addr.landmark && <small>Near {addr.landmark}</small>}
                    <small>{addr.city} — {addr.pincode}</small>
                  </div>
                );
              })}
            </div>

            {!showNewAddressForm ? (
              <button
                className="secondary compact new-addr-trigger"
                onClick={() => setShowNewAddressForm(true)}
              >
                <Plus size={16} /> Add Another Address
              </button>
            ) : (
              <form onSubmit={handleCreateAddress} className="inline-add-form">
                <h4>Add New Delivery Address</h4>
                <div className="tag-group">
                  {(["Home", "Work", "Other"] as const).map(type => (
                    <button
                      type="button"
                      key={type}
                      className={`type-pill ${newLabel === type ? "active" : ""}`}
                      onClick={() => setNewLabel(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="form-group">
                  <label>House / Flat & Street</label>
                  <input
                    required
                    value={newStreet}
                    onChange={e => setNewStreet(e.target.value)}
                    placeholder="e.g. 102 Green Acres, 14th Cross"
                  />
                </div>

                <div className="form-group">
                  <label>Landmark</label>
                  <input
                    value={newLandmark}
                    onChange={e => setNewLandmark(e.target.value)}
                    placeholder="e.g. Behind City Center"
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="secondary compact"
                    onClick={() => setShowNewAddressForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="primary compact">
                    Save Address
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Step 2: Payment Method */}
          <div className="checkout-card" style={{ marginTop: 24 }}>
            <div className="step-title-row">
              <span className="step-num">2</span>
              <div>
                <h2>Choose Payment Method</h2>
                <p>100% safe & encrypted instant transactions</p>
              </div>
            </div>

            <div className="payment-options-list">
              {paymentOptions.map(opt => {
                const isSelected = paymentMethod === opt.name;
                return (
                  <div
                    key={opt.id}
                    className={`payment-option-row ${isSelected ? "selected" : ""}`}
                    onClick={() => setPaymentMethod(opt.name)}
                  >
                    <div className="payment-left">
                      <span className="pay-icon">{opt.icon}</span>
                      <b>{opt.name}</b>
                    </div>
                    <div className="radio-circle">
                      {isSelected && <span className="radio-dot" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="security-guarantee">
              <ShieldCheck size={18} color="var(--green)" />
              <span>Payments are simulated for this portfolio demo. No real charge occurs.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Place Order Button */}
        <div className="checkout-sidebar">
          <div className="bill-summary-card">
            <h3>Order Summary</h3>
            <p className="rest-summary-title">
              From: <b>{cart.restaurantName}</b>
            </p>

            <div className="mini-order-items-list">
              {cart.items.map(i => (
                <div key={i.cartItemId} className="mini-item-line">
                  <span>{i.quantity}x {i.menuItem.name}</span>
                  <b>₹{i.itemTotalPrice * i.quantity}</b>
                </div>
              ))}
            </div>

            <hr className="bill-divider" />

            <div className="bill-line">
              <span>Item Total</span>
              <b>₹{bill.itemTotal}</b>
            </div>

            <div className="bill-line">
              <span>Delivery Fee</span>
              <b>{bill.deliveryFee === 0 ? "FREE" : `₹${bill.deliveryFee}`}</b>
            </div>

            <div className="bill-line">
              <span>Platform Fee</span>
              <b>₹{bill.platformFee}</b>
            </div>

            <div className="bill-line">
              <span>GST (5%)</span>
              <b>₹{bill.gstAmount}</b>
            </div>

            {bill.discountAmount > 0 && (
              <div className="bill-line discount-line">
                <span>Coupon Discount</span>
                <b>- ₹{bill.discountAmount}</b>
              </div>
            )}

            <hr className="bill-divider" />

            <div className="bill-line total-line">
              <b>TOTAL TO PAY</b>
              <b>₹{bill.finalTotal}</b>
            </div>

            <button
              className="primary place-order-btn"
              disabled={isProcessing}
              onClick={handlePlaceOrder}
            >
              <Lock size={18} />
              {isProcessing ? "Processing Order…" : `Pay ₹${bill.finalTotal} & Place Order`}
            </button>

            <small className="cancellation-policy">
              By placing this order, you agree to Yummy's delivery terms and contactless delivery protocol.
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}
