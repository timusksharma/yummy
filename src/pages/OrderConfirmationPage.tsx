import {
  ArrowRight,
  CheckCircle,
  Clock,
  Home,
  MapPin,
  Receipt,
  Sparkles
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useDelivery } from "../hooks/useDeliveryState";

export function OrderConfirmationPage() {
  const { orderId } = useParams();
  const { orders } = useDelivery();
  const order = orders.find(o => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <section className="section page empty">
        <h2>Order Not Found</h2>
        <Link className="primary" to="/restaurants">
          Explore Restaurants
        </Link>
      </section>
    );
  }

  return (
    <section className="section page" style={{ paddingTop: 40, textAlign: "center" }}>
      <div className="confirmation-card">
        <div className="conf-icon-wrap">
          <CheckCircle size={64} color="var(--green)" />
        </div>

        <span className="pill" style={{ margin: "0 auto 16px" }}>
          <Sparkles size={16} /> Order Placed Successfully!
        </span>

        <h1>Order #{order.id} Confirmed</h1>
        <p className="conf-subtitle">
          The restaurant has received your order and is getting the ingredients ready!
        </p>

        <div className="conf-details-box">
          <div className="conf-row">
            <span>Restaurant</span>
            <b>{order.restaurantName}</b>
          </div>

          <div className="conf-row">
            <span>Estimated Delivery</span>
            <b style={{ color: "var(--tomato)" }}>
              <Clock size={16} style={{ display: "inline", marginRight: 4 }} />
              ~{order.estimatedDeliveryMinutes} Minutes
            </b>
          </div>

          <div className="conf-row">
            <span>Delivering To</span>
            <b>{order.address.street}</b>
          </div>

          <div className="conf-row">
            <span>Amount Paid</span>
            <b style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
              ₹{order.bill.finalTotal} ({order.paymentMethod})
            </b>
          </div>

          <hr className="bill-divider" />

          <div className="conf-items-list">
            {order.items.map(item => (
              <div key={item.cartItemId} className="conf-item-row">
                <span>
                  {item.quantity}x {item.menuItem.name}
                </span>
                <b>₹{item.itemTotalPrice * item.quantity}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="conf-actions">
          <Link className="primary" to={`/track-order/${order.id}`}>
            Track Live Delivery <ArrowRight size={18} />
          </Link>
          <Link className="secondary" to="/">
            <Home size={18} /> Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
