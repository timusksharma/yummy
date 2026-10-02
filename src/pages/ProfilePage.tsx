import {
  Bell,
  Briefcase,
  CreditCard,
  Heart,
  HelpCircle,
  Home,
  LogOut,
  MapPin,
  Plus,
  Receipt,
  Shield,
  Trash2,
  User
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDelivery } from "../hooks/useDeliveryState";

export function ProfilePage() {
  const { location, setLocation, addresses, addAddress, deleteAddress, orders } = useDelivery();
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState("");

  const [label, setLabel] = useState<"Home" | "Work" | "Other">("Home");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");

  const showFeedback = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!street.trim()) return;
    addAddress({
      label,
      street: street.trim(),
      landmark: landmark.trim() || undefined,
      city: "Bengaluru",
      pincode: "560038"
    });
    setShowAddForm(false);
    setStreet("");
    setLandmark("");
    showFeedback("Address saved successfully!");
  };

  return (
    <section className="section page narrow" style={{ paddingTop: 30 }}>
      {toast && <div className="tracking-toast">✓ {toast}</div>}

      <div className="page-heading">
        <span className="kicker">My Account</span>
        <h1>User Profile & Settings</h1>
      </div>

      <div className="profile-layout-container">
        {/* Profile Card */}
        <div className="profile-user-card">
          <div className="avatar-large">SS</div>
          <div className="profile-details">
            <h2>Sumit Sharma</h2>
            <p>sumit.sharma@example.com • +91 98765 43210</p>
            <div className="profile-stats-chips">
              <span><b>{orders.length}</b> Orders Placed</span>
              <span className="dot">•</span>
              <span><b>Bengaluru</b> Resident</span>
            </div>
          </div>
        </div>

        {/* Quick Links Row */}
        <div className="profile-quick-nav">
          <Link to="/orders" className="p-nav-card">
            <Receipt size={22} color="var(--tomato)" />
            <b>Your Orders</b>
            <small>{orders.length} orders</small>
          </Link>

          <Link to="/favorites" className="p-nav-card">
            <Heart size={22} color="#ec4899" />
            <b>Saved Favorites</b>
            <small>Dishes & Kitchens</small>
          </Link>

          <Link to="/offers" className="p-nav-card">
            <CreditCard size={22} color="var(--orange)" />
            <b>Offers & Deals</b>
            <small>Coupons & Cashback</small>
          </Link>
        </div>

        {/* Saved Addresses Section */}
        <div className="profile-section-card">
          <div className="section-title-row">
            <div>
              <h3>Saved Delivery Addresses</h3>
              <p>Manage your delivery drop-off locations</p>
            </div>
            {!showAddForm && (
              <button
                className="secondary compact"
                onClick={() => setShowAddForm(true)}
              >
                <Plus size={16} /> Add Address
              </button>
            )}
          </div>

          <div className="profile-address-list">
            {addresses.map(addr => {
              const isCurrent = addr.id === location.id;
              return (
                <div
                  key={addr.id}
                  className={`profile-addr-row ${isCurrent ? "current" : ""}`}
                >
                  <div className="addr-meta">
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {addr.label === "Home" ? <Home size={18} /> : <Briefcase size={18} />}
                      <b>{addr.label}</b>
                      {isCurrent && <span className="default-pill">Delivering Here</span>}
                    </div>
                    <p>{addr.street}</p>
                    {addr.landmark && <small>Near {addr.landmark}</small>}
                    <small>{addr.city} — {addr.pincode}</small>
                  </div>

                  <div className="addr-row-actions">
                    {!isCurrent && (
                      <button
                        className="secondary compact"
                        onClick={() => {
                          setLocation(addr);
                          showFeedback(`Selected ${addr.label} as active address.`);
                        }}
                      >
                        Set as Active
                      </button>
                    )}
                    {addresses.length > 1 && (
                      <button
                        className="icon-button"
                        onClick={() => {
                          deleteAddress(addr.id);
                          showFeedback("Address removed.");
                        }}
                        aria-label="Delete address"
                        title="Delete address"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {showAddForm && (
            <form onSubmit={handleAddAddress} className="inline-add-form" style={{ marginTop: 20 }}>
              <h4>Add New Address</h4>
              <div className="tag-group">
                {(["Home", "Work", "Other"] as const).map(type => (
                  <button
                    type="button"
                    key={type}
                    className={`type-pill ${label === type ? "active" : ""}`}
                    onClick={() => setLabel(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="form-group">
                <label>Address Details *</label>
                <input
                  required
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                  placeholder="Apartment, building, street..."
                />
              </div>

              <div className="form-group">
                <label>Landmark (Optional)</label>
                <input
                  value={landmark}
                  onChange={e => setLandmark(e.target.value)}
                  placeholder="Nearby landmark..."
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary compact"
                  onClick={() => setShowAddForm(false)}
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

        {/* General Settings & Help */}
        <div className="profile-section-card">
          <h3>Help & Preferences</h3>
          <div className="settings-list">
            <div className="settings-row" onClick={() => showFeedback("All push notifications are enabled.")}>
              <div className="s-left">
                <Bell size={18} />
                <span>Order Updates & SMS Notifications</span>
              </div>
              <span className="s-status">Enabled</span>
            </div>

            <div className="settings-row" onClick={() => showFeedback("Customer support chat is available 24/7.")}>
              <div className="s-left">
                <HelpCircle size={18} />
                <span>Customer Support & FAQs</span>
              </div>
              <span className="s-arrow">→</span>
            </div>

            <div className="settings-row" onClick={() => showFeedback("Yummy follows strict food hygiene and safety standards.")}>
              <div className="s-left">
                <Shield size={18} />
                <span>Safety & Hygiene Guidelines</span>
              </div>
              <span className="s-arrow">→</span>
            </div>

            <div
              className="settings-row logout-row"
              onClick={() => showFeedback("Demo mode: You are logged in as test user.")}
            >
              <div className="s-left" style={{ color: "var(--tomato)" }}>
                <LogOut size={18} />
                <span>Log Out of Yummy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
