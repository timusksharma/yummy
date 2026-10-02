import {
  ArrowRight,
  Clock,
  MapPin,
  Receipt,
  RotateCw,
  Star,
  Truck
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Order } from "../domain/delivery";
import { useDelivery } from "../hooks/useDeliveryState";

export function OrdersPage() {
  const navigate = useNavigate();
  const { orders, reorder, rateOrder } = useDelivery();
  const [tab, setTab] = useState<"all" | "active" | "past">("all");
  const [ratingOrder, setRatingOrder] = useState<Order | null>(null);
  const [foodRating, setFoodRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [comment, setComment] = useState("");

  const filteredOrders = orders.filter(o => {
    if (tab === "active") return o.status !== "DELIVERED" && o.status !== "CANCELLED";
    if (tab === "past") return o.status === "DELIVERED" || o.status === "CANCELLED";
    return true;
  });

  const handleReorder = (order: Order) => {
    reorder(order);
    navigate("/cart");
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ratingOrder) return;
    rateOrder(ratingOrder.id, foodRating, deliveryRating, comment);
    setRatingOrder(null);
    setComment("");
  };

  return (
    <section className="section page" style={{ paddingTop: 30 }}>
      <div className="page-heading">
        <span className="kicker">Order History</span>
        <h1>Your Orders</h1>
        <p>Track current orders, review past meals, and reorder your favorites with one click.</p>
      </div>

      <div className="orders-tab-row">
        <button
          className={tab === "all" ? "active" : ""}
          onClick={() => setTab("all")}
        >
          All Orders ({orders.length})
        </button>
        <button
          className={tab === "active" ? "active" : ""}
          onClick={() => setTab("active")}
        >
          Active Orders (
          {orders.filter(o => o.status !== "DELIVERED" && o.status !== "CANCELLED").length}
          )
        </button>
        <button
          className={tab === "past" ? "active" : ""}
          onClick={() => setTab("past")}
        >
          Past Orders ({orders.filter(o => o.status === "DELIVERED").length})
        </button>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="orders-list">
          {filteredOrders.map(order => {
            const isCompleted = order.status === "DELIVERED";

            return (
              <article key={order.id} className="order-history-card">
                <div className="order-card-header">
                  <div>
                    <span className="kicker">#{order.id}</span>
                    <h3>{order.restaurantName}</h3>
                    <small>Placed at {order.placedAt} • {order.address.label}</small>
                  </div>

                  <span
                    className={`order-status-pill ${
                      isCompleted ? "status-delivered" : "status-active"
                    }`}
                  >
                    {isCompleted ? "✓ Delivered" : `⏳ ${order.status.replace("_", " ")}`}
                  </span>
                </div>

                <div className="order-card-body">
                  <div className="order-items-preview">
                    {order.items.map(item => (
                      <span key={item.cartItemId} className="order-item-badge">
                        {item.quantity}x {item.menuItem.name}
                      </span>
                    ))}
                  </div>

                  <div className="order-amount">
                    <b>Total: ₹{order.bill.finalTotal}</b>
                    <small>via {order.paymentMethod}</small>
                  </div>
                </div>

                <div className="order-card-footer">
                  {!isCompleted ? (
                    <Link
                      to={`/track-order/${order.id}`}
                      className="primary compact"
                    >
                      <Truck size={16} /> Track Order Live
                    </Link>
                  ) : (
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        className="secondary compact"
                        onClick={() => handleReorder(order)}
                      >
                        <RotateCw size={16} /> Reorder
                      </button>

                      {!order.rating ? (
                        <button
                          className="secondary compact"
                          onClick={() => setRatingOrder(order)}
                        >
                          <Star size={16} /> Rate Meal
                        </button>
                      ) : (
                        <span className="rated-pill">
                          ★ Rated {order.rating.foodRating}/5
                        </span>
                      )}
                    </div>
                  )}

                  <Link
                    to={`/restaurants/${order.restaurantId}`}
                    className="view-menu-link"
                  >
                    View Restaurant Menu →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty">
          <span style={{ fontSize: "3rem" }}>🧾</span>
          <h2>No orders found</h2>
          <p>
            {tab === "active"
              ? "You do not have any orders in progress right now."
              : "You haven't placed any orders yet. Discover delicious dishes from nearby restaurants!"}
          </p>
          <Link className="primary" to="/restaurants">
            Browse Restaurants
          </Link>
        </div>
      )}

      {/* Rating Modal */}
      {ratingOrder && (
        <div className="modal-backdrop" onClick={() => setRatingOrder(null)}>
          <div className="modal-content small-modal" onClick={e => e.stopPropagation()}>
            <h2>Rate {ratingOrder.restaurantName}</h2>
            <p>How did you enjoy your food?</p>

            <form onSubmit={handleRatingSubmit}>
              <div className="rating-question">
                <label>Food Taste & Quality</label>
                <div className="star-picker">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button
                      type="button"
                      key={s}
                      className={foodRating >= s ? "active" : ""}
                      onClick={() => setFoodRating(s)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="rating-question">
                <label>Delivery Speed</label>
                <div className="star-picker">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button
                      type="button"
                      key={s}
                      className={deliveryRating >= s ? "active" : ""}
                      onClick={() => setDeliveryRating(s)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: 14 }}>
                <label>Write a Review</label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Tell others what you loved about this order…"
                />
              </div>

              <div className="form-actions" style={{ marginTop: 16 }}>
                <button
                  type="button"
                  className="secondary compact"
                  onClick={() => setRatingOrder(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary compact">
                  Save Rating
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
