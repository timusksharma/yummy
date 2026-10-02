import { AlertTriangle } from "lucide-react";
import { useDelivery } from "../hooks/useDeliveryState";

export function RestaurantSwitchModal() {
  const {
    pendingSwitch,
    cart,
    confirmRestaurantSwitch,
    cancelRestaurantSwitch
  } = useDelivery();

  if (!pendingSwitch) return null;

  return (
    <div className="modal-backdrop" onClick={cancelRestaurantSwitch}>
      <div className="modal-content small-modal" onClick={e => e.stopPropagation()}>
        <div className="conflict-icon">
          <AlertTriangle size={32} color="#ff4d2e" />
        </div>

        <h2>Replace cart items?</h2>
        <p>
          Your cart currently contains dishes from <b>{cart.restaurantName}</b>.
          Do you want to discard your existing cart and start a new order from{" "}
          <b>{pendingSwitch.restaurant.name}</b>?
        </p>

        <div className="modal-button-row">
          <button className="secondary" onClick={cancelRestaurantSwitch}>
            No, Keep Current Cart
          </button>
          <button className="primary" onClick={confirmRestaurantSwitch}>
            Yes, Discard & Add
          </button>
        </div>
      </div>
    </div>
  );
}
