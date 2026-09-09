import { Heart, Home, ListOrdered, MapPin, Menu, Search, ShoppingBag, Soup, Tag, UserRound, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDelivery } from "../hooks/useDeliveryState";
import { CartPanel } from "../pages/Cart";

const navigation = [
  { to: "/", label: "Home" },
  { to: "/restaurants", label: "Foods" },
  { to: "/offers", label: "Offers" },
  { to: "/orders", label: "Orders" },
  { to: "/kitchen/recipes", label: "Yummy Kitchen" },
];

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { location, setLocation, cart } = useDelivery();
  const navigate = useNavigate();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const search = (event: FormEvent) => {
    event.preventDefault();
    navigate(`/restaurants?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="app-shell reference-shell">
      <header className="reference-nav">
        <NavLink className="logo" to="/"><span>Y</span>Yummy<i>.</i></NavLink>
        <nav className={menuOpen ? "reference-links open" : "reference-links"} aria-label="Main navigation">
          {navigation.map((link) => <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>{link.label}</NavLink>)}
        </nav>
        <div className="reference-actions">
          <label className="reference-location"><MapPin/><select value={location} onChange={(event) => setLocation(event.target.value)} aria-label="Delivery location"><option>Green Park, New Delhi</option><option>Hauz Khas, New Delhi</option><option>Cyber City, Gurugram</option><option>Indiranagar, Bengaluru</option></select></label>
          <form className="reference-search" onSubmit={search}><Search/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search food" aria-label="Search food"/></form>
          <NavLink className="nav-icon" to="/favorites" aria-label="Favorites"><Heart/></NavLink>
          <button className="nav-icon cart-button" onClick={() => setCartOpen(true)} aria-label={`${itemCount} items in cart`}><ShoppingBag/><b>{itemCount}</b></button>
          <NavLink className="profile-chip" to="/profile"><span>YS</span><b>My profile</b></NavLink>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>
      <main><Outlet/></main>
      <footer className="reference-footer">
        <div><NavLink className="logo" to="/"><span>Y</span>Yummy<i>.</i></NavLink><p>Fast delivery, easy pickup, and a smarter kitchen—all in one happy place.</p></div>
        <div><h3>Delivery</h3><NavLink to="/restaurants">Foods</NavLink><NavLink to="/offers">Offers</NavLink><NavLink to="/orders">Orders</NavLink></div>
        <div><h3>Kitchen</h3><NavLink to="/kitchen/recipes">Recipes</NavLink><NavLink to="/kitchen/planner">Meal planner</NavLink><NavLink to="/kitchen/tools">Tools</NavLink></div>
        <div><h3>Yummy</h3><a href="#help">Help</a><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div>
        <small>© {new Date().getFullYear()} Yummy. Demo ordering experience—no real payments or deliveries.</small>
      </footer>
      <nav className="bottom-nav" aria-label="Mobile navigation"><NavLink to="/"><Home/>Home</NavLink><NavLink to="/restaurants"><Soup/>Food</NavLink><NavLink to="/offers"><Tag/>Offers</NavLink><NavLink to="/orders"><ListOrdered/>Orders</NavLink><NavLink to="/cart"><ShoppingBag/>Cart</NavLink></nav>
      {cartOpen && <CartPanel drawer onClose={() => setCartOpen(false)}/>} 
    </div>
  );
}
