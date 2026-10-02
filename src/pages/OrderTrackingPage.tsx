import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  RotateCw,
  ShieldCheck,
  Star,
  Store,
  Truck
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { OrderStatus } from "../domain/delivery";
import { useDelivery } from "../hooks/useDeliveryState";

const STAGES: {
  key: OrderStatus;
  label: string;
  desc: string;
  icon: typeof Clock;
}[] = [
  {
    key: "CONFIRMED",
    label: "Order Confirmed",
    desc: "Restaurant accepted your order",
    icon: Store
  },
  {
    key: "PREPARING",
    label: "Preparing Food",
    desc: "Chef is handcrafting your meal",
    icon: Clock
  },
  {
    key: "PICKED_UP",
    label: "Rider Assigned",
    desc: "Delivery partner is picking up your order",
    icon: Truck
  },
  {
    key: "ON_THE_WAY",
    label: "Out for Delivery",
    desc: "Rider is heading to your address",
    icon: Navigation
  },
  {
    key: "DELIVERED",
    label: "Delivered",
    desc: "Order completed. Bon appétit!",
    icon: CheckCircle2
  }
];

export function OrderTrackingPage() {
  const { orderId } = useParams();
  const { orders, advanceOrderStatus, rateOrder } = useDelivery();
  const order = orders.find(o => o.id === orderId) || orders[0];

  const [toastMsg, setToastMsg] = useState("");
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [foodRating, setFoodRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  // Countdown timer simulation
  const [countdownSeconds, setCountdownSeconds] = useState(1480);

  useEffect(() => {
    if (order?.status === "DELIVERED") return;
    const interval = setInterval(() => {
      setCountdownSeconds(s => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [order?.status]);

  if (!order) {
    return (
      <section className="section page empty">
        <h2>No Order to Track</h2>
        <Link className="primary" to="/restaurants">
          Browse Restaurants
        </Link>
      </section>
    );
  }

  const currentStageIndex = STAGES.findIndex(s => s.key === order.status);
  const progressPercent = ((currentStageIndex + 1) / STAGES.length) * 100;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    rateOrder(order.id, foodRating, deliveryRating, reviewComment);
    setRatingModalOpen(false);
    showToast("Thank you! Your feedback has been recorded.");
  };

  return (
    <section className="section page" style={{ paddingTop: 30 }}>
      {toastMsg && <div className="tracking-toast">✓ {toastMsg}</div>}

      <Link className="back" to="/orders">
        <ArrowLeft size={18} /> View All Orders
      </Link>

      <div className="tracking-header">
        <div>
          <span className="kicker">Live Delivery Tracker</span>
          <h1>Tracking Order #{order.id}</h1>
          <p>
            From <b>{order.restaurantName}</b> • Placed at {order.placedAt}
          </p>
        </div>

        {order.status !== "DELIVERED" && (
          <div className="eta-badge">
            <Clock size={20} color="var(--tomato)" />
            <div>
              <small>ESTIMATED ARRIVAL</small>
              <b>
                {Math.floor(countdownSeconds / 60)}:
                {String(countdownSeconds % 60).padStart(2, "0")} MINS
              </b>
            </div>
          </div>
        )}
      </div>

      <div className="tracking-layout">
        {/* Left Column: Interactive Map & Delivery Partner */}
        <div className="tracking-main">
          {/* Simulated Live Delivery Map */}
          <div className="simulated-map-container">
            <div className="map-road-bg">
              {/* Simulated Map Markers */}
              <div className="map-marker restaurant-pin" title={order.restaurantName}>
                <Store size={20} color="#ffffff" />
                <span className="pin-tooltip">{order.restaurantName}</span>
              </div>

              {/* Rider Scooter Marker with Animated Pulse */}
              <div
                className={`map-marker rider-pin stage-${currentStageIndex}`}
                title="Delivery Partner"
              >
                <span className="rider-scooter-icon">🛵</span>
                <span className="rider-sonar" />
              </div>

              {/* Destination Home Pin */}
              <div className="map-marker customer-pin" title={order.address.street}>
                <MapPin size={22} color="#ffffff" />
                <span className="pin-tooltip">Your Address</span>
              </div>

              <div className="map-route-line" />
            </div>

            <div className="map-overlay-status">
              <span className="pulse-dot" />
              <b>Live GPS Simulation: {STAGES[currentStageIndex]?.label}</b>
            </div>
          </div>

          {/* Delivery Partner Card */}
          <div className="delivery-rider-card">
            <img
              src={order.deliveryPartner.photo}
              alt={order.deliveryPartner.name}
              className="rider-avatar"
              width="65"
              height="65"
            />
            <div className="rider-info">
              <div className="rider-name-row">
                <h3>{order.deliveryPartner.name}</h3>
                <span className="rider-rating">
                  <Star size={14} fill="currentColor" /> {order.deliveryPartner.rating}
                </span>
              </div>
              <p>{order.deliveryPartner.vehicle}</p>
              <small>COVID-19 Vaccinated & Temperature Verified</small>
            </div>

            <div className="rider-actions">
              <button
                className="icon-button"
                onClick={() => showToast(`Calling ${order.deliveryPartner.name} (${order.deliveryPartner.phone})…`)}
                title="Call Delivery Partner"
                aria-label="Call Rider"
              >
                <Phone size={18} />
              </button>
              <button
                className="icon-button"
                onClick={() => showToast("Opening in-app chat with rider…")}
                title="Chat with Delivery Partner"
                aria-label="Chat with Rider"
              >
                <MessageSquare size={18} />
              </button>
            </div>
          </div>

          {/* Demo Control: Fast Forward Order Status */}
          <div className="demo-stage-controller">
            <div>
              <b>Portfolio Demo Controls</b>
              <p>Simulate the live order advancement step-by-step:</p>
            </div>
            {order.status !== "DELIVERED" ? (
              <button
                className="primary compact"
                onClick={() => advanceOrderStatus(order.id)}
              >
                <RotateCw size={16} /> Advance to Next Stage
              </button>
            ) : (
              <button
                className="secondary compact"
                onClick={() => setRatingModalOpen(true)}
              >
                <Star size={16} /> Rate This Order
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Status Timeline & Order Summary */}
        <div className="tracking-sidebar">
          {/* Timeline Steps Card */}
          <div className="tracking-timeline-card">
            <h3>Order Status</h3>

            <div className="timeline-list">
              {STAGES.map((stage, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                const IconComponent = stage.icon;

                return (
                  <div
                    key={stage.key}
                    className={`timeline-step ${isPassed ? "completed" : ""} ${isCurrent ? "current" : ""}`}
                  >
                    <div className="step-icon-wrap">
                      <IconComponent size={18} />
                    </div>

                    <div className="step-text">
                      <b>{stage.label}</b>
                      <p>{stage.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Details Mini Card */}
          <div className="tracking-items-card">
            <h3>Order Items ({order.items.length})</h3>
            <div className="tracking-item-list">
              {order.items.map(item => (
                <div key={item.cartItemId} className="mini-item-row">
                  <span>{item.quantity}x {item.menuItem.name}</span>
                  <b>₹{item.itemTotalPrice * item.quantity}</b>
                </div>
              ))}
            </div>

            <hr className="bill-divider" />

            <div className="bill-line total-line">
              <b>Total Paid</b>
              <b>₹{order.bill.finalTotal}</b>
            </div>
            <small style={{ color: "var(--muted)" }}>
              Payment Method: {order.paymentMethod}
            </small>
          </div>
        </div>
      </div>

      {/* Post-Delivery Rating Modal */}
      {ratingModalOpen && (
        <div className="modal-backdrop" onClick={() => setRatingModalOpen(false)}>
          <div className="modal-content small-modal" onClick={e => e.stopPropagation()}>
            <h2>Rate Your Experience</h2>
            <p>How was your meal from {order.restaurantName}?</p>

            <form onSubmit={handleRatingSubmit}>
              <div className="rating-question">
                <label>Food Quality & Taste</label>
                <div className="star-picker">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      className={foodRating >= star ? "active" : ""}
                      onClick={() => setFoodRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="rating-question">
                <label>Delivery Speed & Rider Service</label>
                <div className="star-picker">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      className={deliveryRating >= star ? "active" : ""}
                      onClick={() => setDeliveryRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: 14 }}>
                <label>Write a Review (Optional)</label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={e => setReviewComment(e.target.value)}
                  placeholder="Tell us what you liked about this meal…"
                />
              </div>

              <div className="form-actions" style={{ marginTop: 16 }}>
                <button
                  type="button"
                  className="secondary compact"
                  onClick={() => setRatingModalOpen(false)}
                >
                  Skip
                </button>
                <button type="submit" className="primary compact">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
