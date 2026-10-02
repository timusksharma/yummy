import {
  ChevronDown,
  Clock,
  Heart,
  Home,
  MapPin,
  Search,
  ShoppingBag,
  Tag,
  UserRound,
  UtensilsCrossed
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useDelivery } from "../hooks/useDeliveryState";
import { BrandLogo } from "./BrandLogo";
import { LocationModal } from "./LocationModal";
import { RestaurantSwitchModal } from "./RestaurantSwitchModal";

export function Layout() {
  const { location, bill, itemCount, activeOrder } = useDelivery();
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const currentPath = useLocation().pathname;

  return (
    <div className="app-shell">
      {/* Active Order Live Floating Notification */}
      {activeOrder && currentPath !== `/track-order/${activeOrder.id}` && (
        <Link
          to={`/track-order/${activeOrder.id}`}
          className="active-order-banner"
        >
          <div className="banner-left">
            <span className="pulse-dot" />
            <Clock size={16} />
            <b>Order in progress from {activeOrder.restaurantName}</b>
          </div>
          <span className="banner-cta">Track Delivery →</span>
        </Link>
      )}

      {/* Header Topbar */}
      <header className="topbar">
        {/* Desktop Header Layout */}
        <div className="desktop-header-wrap">
          <div className="header-left">
            <Link className="brand-logo-link" to="/" aria-label="Yummy Delivery">
              <BrandLogo size={36} />
            </Link>

            {/* Location Trigger */}
            <button
              className="location-pill-btn"
              onClick={() => setLocationModalOpen(true)}
              aria-label="Select delivery address"
            >
              <div className="loc-icon-bubble">
                <MapPin size={14} />
              </div>
              <div className="loc-text">
                <span className="loc-label">{location.label}</span>
                <span className="loc-street">{location.street}</span>
              </div>
              <ChevronDown size={13} className="chevron" />
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="nav-links" aria-label="Main navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/restaurants"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              <span>Restaurants</span>
            </NavLink>
            <NavLink
              to="/offers"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              <span>Offers</span>
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              <span>Orders</span>
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <NavLink
              className="nav-action-btn"
              to="/search"
              aria-label="Search food and restaurants"
              title="Search"
            >
              <Search size={18} />
            </NavLink>

            <NavLink
              className="nav-action-btn"
              to="/favorites"
              aria-label="Saved restaurants and dishes"
              title="Saved Favorites"
            >
              <Heart size={18} />
            </NavLink>

            {/* Live Cart Button with Badge */}
            <NavLink
              className={`nav-action-btn nav-cart-btn ${itemCount > 0 ? "has-items" : ""}`}
              to="/cart"
              aria-label="Shopping Cart"
              title={`Cart (${itemCount} items)`}
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span className="nav-cart-badge">{itemCount}</span>
              )}
            </NavLink>

            {/* Sign In / Account Pill */}
            <NavLink
              className="nav-signin-pill"
              to="/profile"
              aria-label="Sign In or View Account"
            >
              <div className="signin-user-icon">
                <UserRound size={15} />
              </div>
              <span>Sign In</span>
            </NavLink>
          </div>
        </div>

        {/* Mobile Native App Header */}
        <div className="mobile-app-header-wrap">
          <Link to="/profile" className="mobile-avatar-btn" aria-label="Profile">
            <UserRound size={18} />
          </Link>

          <button
            className="mobile-loc-pill-btn"
            onClick={() => setLocationModalOpen(true)}
            aria-label="Change delivery location"
          >
            <span className="mobile-loc-sub">
              Delivery location <ChevronDown size={11} />
            </span>
            <span className="mobile-loc-title">
              {location.label} • {location.city}
            </span>
          </button>

          <div className="mobile-header-right-actions">
            <Link to="/search" className="mobile-action-icon" aria-label="Search food">
              <Search size={19} />
            </Link>
            <Link to="/favorites" className="mobile-action-icon" aria-label="Favorites">
              <Heart size={19} />
            </Link>
            <Link to="/cart" className="mobile-action-icon mobile-cart-icon" aria-label="Cart">
              <ShoppingBag size={19} />
              {itemCount > 0 && <span className="mobile-badge-dot">{itemCount}</span>}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main>
        <Outlet />
      </main>

      {/* Floating Mobile Cart Capsule Bar (right above bottom nav) */}
      {itemCount > 0 &&
        currentPath !== "/cart" &&
        currentPath !== "/checkout" && (
          <div className="mobile-floating-cart-capsule">
            <div className="cart-capsule-left">
              <div className="cart-capsule-count">
                <ShoppingBag size={16} />
                <span>{itemCount} {itemCount === 1 ? "item" : "items"}</span>
              </div>
              <b>₹{bill.finalTotal}</b>
            </div>
            <Link to="/cart" className="cart-capsule-btn">
              View Cart →
            </Link>
          </div>
        )}

      {/* Desktop Footer (hidden on mobile) */}
      <footer className="desktop-footer">
        <div>
          <Link className="brand-logo-link" to="/">
            <BrandLogo size={36} />
          </Link>
          <p style={{ marginTop: 14, maxWidth: 320, color: "var(--ink-secondary)" }}>
            Superfast food ordering & delivery platform. Fresh flavors from top neighborhood kitchens delivered straight to your door.
          </p>
        </div>

        <div>
          <h3>Discover</h3>
          <Link to="/restaurants">All Restaurants</Link>
          <Link to="/restaurants?filter=pureVeg">Pure Veg Dining</Link>
          <Link to="/offers">Daily Offers & Coupons</Link>
          <Link to="/search">Trending Dishes</Link>
        </div>

        <div>
          <h3>Account</h3>
          <Link to="/orders">Order History</Link>
          <Link to="/favorites">Saved Favorites</Link>
          <Link to="/profile">Addresses & Settings</Link>
          <a
            href="#location"
            onClick={e => {
              e.preventDefault();
              setLocationModalOpen(true);
            }}
          >
            Change Location
          </a>
        </div>

        <div>
          <h3>Popular Cuisines</h3>
          <Link to="/restaurants?cuisine=Biryani">Hyderabadi Biryani</Link>
          <Link to="/restaurants?cuisine=Pizza">Woodfired Pizza</Link>
          <Link to="/restaurants?cuisine=Burgers">Gourmet Burgers</Link>
          <Link to="/restaurants?cuisine=North%20Indian">North Indian Curries</Link>
        </div>

        <small>
          © {new Date().getFullYear()} Yummy Food Delivery Ltd. Crafted for hungry food lovers everywhere.
        </small>
      </footer>

      {/* Native Mobile App Bottom Navigation Bar */}
      <nav className="mobile-bottom-app-bar" aria-label="Mobile navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "tab-item active" : "tab-item")}
        >
          <div className="tab-icon-wrap">
            <Home size={20} />
          </div>
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/restaurants"
          className={({ isActive }) => (isActive ? "tab-item active" : "tab-item")}
        >
          <div className="tab-icon-wrap">
            <UtensilsCrossed size={20} />
          </div>
          <span>Food</span>
        </NavLink>
        <NavLink
          to="/offers"
          className={({ isActive }) => (isActive ? "tab-item active" : "tab-item")}
        >
          <div className="tab-icon-wrap">
            <Tag size={20} />
          </div>
          <span>Offers</span>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) => (isActive ? "tab-item active" : "tab-item")}
        >
          <div className="tab-icon-wrap">
            <Clock size={20} />
          </div>
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "tab-item active" : "tab-item")}
        >
          <div className="tab-icon-wrap">
            <UserRound size={20} />
          </div>
          <span>Profile</span>
        </NavLink>
      </nav>

      {/* Global Modals */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />
      <RestaurantSwitchModal />
    </div>
  );
}
