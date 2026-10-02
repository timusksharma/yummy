import {
  ArrowRight,
  Bike,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Heart,
  Play,
  Rocket,
  Salad,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Store,
  UtensilsCrossed,
  X
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandLogo } from "../components/BrandLogo";
import { CustomizationModal } from "../components/CustomizationModal";
import { RestaurantCard } from "../components/RestaurantCard";
import { promoBanners } from "../data/deliveryOffers";
import { foodCategories, restaurants } from "../data/restaurants";
import type { MenuItem, Restaurant } from "../domain/delivery";
import { useDelivery } from "../hooks/useDeliveryState";

export function HomePage() {
  const navigate = useNavigate();
  const { location, addItem, applyCoupon } = useDelivery();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [, setFloatingIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [customizingItem, setCustomizingItem] = useState<{
    item: MenuItem;
    restaurant: Restaurant;
  } | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/restaurants");
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 4 Featured Floating Dishes matching the desktop reference mockup
  const floatingDishes = [
    {
      id: "dish-1",
      title: "Bowlas Salad",
      price: 199,
      theme: "card-theme-coral",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80",
      restaurantId: "rest-8",
      itemIndex: 0
    },
    {
      id: "dish-2",
      title: "Healthy Salad",
      price: 149,
      theme: "card-theme-orange",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80",
      restaurantId: "rest-8",
      itemIndex: 1
    },
    {
      id: "dish-3",
      title: "Bowlas Salad",
      price: 179,
      theme: "card-theme-green",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80",
      restaurantId: "rest-8",
      itemIndex: 0
    },
    {
      id: "dish-4",
      title: "Healthy Salad",
      price: 199,
      theme: "card-theme-indigo",
      image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=500&auto=format&fit=crop&q=80",
      restaurantId: "rest-8",
      itemIndex: 1
    }
  ];

  // 6 Curated Recommended Dishes for the Mobile 2-Column App Grid
  const mobileRecommendedDishes = [
    {
      item: restaurants[2].menu[0], // Gourmet Double Cheeseburger
      restaurant: restaurants[2],
      rating: 4.9
    },
    {
      item: restaurants[7].menu[0], // Mediterranean Quinoa Power Bowl
      restaurant: restaurants[7],
      rating: 4.8
    },
    {
      item: restaurants[1].menu[0], // Margherita Extra Cheese Pizza
      restaurant: restaurants[1],
      rating: 4.8
    },
    {
      item: restaurants[0].menu[0], // Hyderabadi Mutton Dum Biryani
      restaurant: restaurants[0],
      rating: 4.9
    },
    {
      item: restaurants[4].menu[0], // Amritsari Kulcha & Dal Makhani
      restaurant: restaurants[4],
      rating: 4.7
    },
    {
      item: restaurants[7].menu[1], // Avocado & Edamame Crunch Salad
      restaurant: restaurants[7],
      rating: 4.8
    }
  ];

  const handleQuickAdd = (dish: typeof floatingDishes[0]) => {
    const rest = restaurants.find(r => r.id === dish.restaurantId) || restaurants[7];
    const menuItem = rest.menu[dish.itemIndex] || rest.menu[0];
    addItem(menuItem, [], rest);
    showToast(`Added ${dish.title} to cart!`);
  };

  const handleMobileDishAdd = (item: MenuItem, rest: Restaurant) => {
    if (item.customizationGroups && item.customizationGroups.length > 0) {
      setCustomizingItem({ item, restaurant: rest });
    } else {
      addItem(item, [], rest);
      showToast(`Added ${item.name} to cart!`);
    }
  };

  const topRated = restaurants.filter(r => r.rating >= 4.6);
  const fastDelivery = restaurants.filter(r => r.deliveryTimeMinutes <= 22);

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "84px",
            right: "20px",
            background: "#111418",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "999px",
            zIndex: 9999,
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "0.9rem",
            fontWeight: 700,
            animation: "slideInUp 0.3s ease-out"
          }}
        >
          <CheckCircle2 size={16} color="#2ed573" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          NATIVE MOBILE APP HOME VIEW (Visible on mobile <= 768px)
          ========================================================================= */}
      <div className="mobile-home-view">
        {/* Mobile Greeting */}
        <div className="mobile-greeting-box">
          <span>Hey Foodie! 👋</span>
          <h2>What would you like to eat today?</h2>
        </div>

        {/* Mobile Search Bar with Filter Button */}
        <form className="mobile-app-search" onSubmit={handleSearchSubmit}>
          <div className="mobile-search-input-wrap">
            <Search size={18} className="search-icon" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search menu, restaurant or craving..."
              aria-label="Search food"
            />
          </div>
          <button
            type="button"
            className="mobile-filter-btn"
            onClick={() => navigate("/restaurants")}
            aria-label="Open restaurant filters"
          >
            <SlidersHorizontal size={18} />
          </button>
        </form>

        {/* Mobile Horizontal Category Pills Track */}
        <div className="mobile-category-track">
          <Link to="/restaurants" className="mobile-cat-card">
            <div className="mobile-cat-icon-frame" style={{ background: "#fff0ed", borderColor: "#ffd8be" }}>
              <span style={{ fontSize: "1.5rem" }}>🔥</span>
            </div>
            <span>Popular</span>
          </Link>
          {foodCategories.map(cat => (
            <Link
              key={cat.id}
              to={`/restaurants?cuisine=${encodeURIComponent(cat.cuisine)}`}
              className="mobile-cat-card"
            >
              <div className="mobile-cat-icon-frame">
                <img src={cat.image} alt={cat.name} width="38" height="38" />
              </div>
              <span>{cat.name.split(" ")[0]}</span>
            </Link>
          ))}
        </div>

        {/* Mobile #SpecialForYou Promo Carousel */}
        <div className="mobile-section-heading">
          <h3>#SpecialForYou</h3>
          <Link to="/offers">View all Offers →</Link>
        </div>

        <div className="mobile-promo-track">
          {promoBanners.map(promo => (
            <div
              key={promo.id}
              className="mobile-promo-card"
              style={{ background: promo.bgGradient }}
              onClick={() => {
                applyCoupon({
                  code: promo.code,
                  title: promo.subtitle,
                  description: promo.title,
                  discountPercent: promo.code === "YUMMY50" ? 50 : undefined,
                  discountFlat: promo.code === "FREEDEL" ? 35 : 125,
                  minOrder: promo.code === "YUMMY50" ? 199 : 149
                });
                navigate("/restaurants");
              }}
            >
              <span className="promo-tag">{promo.tag}</span>
              <h4>{promo.title}</h4>
              <p>{promo.subtitle}</p>
              <span className="code-chip">Code: {promo.code}</span>
            </div>
          ))}
        </div>

        {/* Mobile Recommended 2-Column Food Grid */}
        <div className="mobile-section-heading">
          <h3>Recommended For You</h3>
          <Link to="/restaurants">See All →</Link>
        </div>

        <div className="mobile-food-grid">
          {mobileRecommendedDishes.map((dish, i) => (
            <div key={`${dish.item.id}-${i}`} className="mobile-food-card">
              <div className="mobile-food-thumb-wrap">
                <img src={dish.item.image} alt={dish.item.name} />
                <div className="mobile-food-rating-pill">
                  <Star size={10} fill="#f59e0b" color="#f59e0b" />
                  <span>{dish.rating}</span>
                </div>
                <button
                  className="mobile-food-heart-btn"
                  onClick={() => showToast(`Saved ${dish.item.name} to favorites!`)}
                  aria-label="Save to favorites"
                >
                  <Heart size={14} fill="currentColor" />
                </button>
              </div>

              <div className="mobile-food-card-body">
                <h5>{dish.item.name}</h5>
                <span className="rest-name">{dish.restaurant.name}</span>

                <div className="mobile-food-card-footer">
                  <span className="price">₹{dish.item.price}</span>
                  <button
                    className="mobile-add-btn"
                    onClick={() => handleMobileDishAdd(dish.item, dish.restaurant)}
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Top Restaurants Near You */}
        <div className="mobile-section-heading">
          <h3>Popular Restaurants</h3>
          <Link to="/restaurants?sort=rating">Explore →</Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {topRated.slice(0, 3).map(r => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </div>

      {/* =========================================================================
          DESKTOP HOME VIEW (Visible on desktop > 768px)
          ========================================================================= */}
      <div className="desktop-home-view">
        {/* 1. Hero Section (Foody/Yummy Reference) */}
        <section className="foody-hero">
          <div className="foody-hero-left">
            <div className="delivery-pill">
              <Sparkles size={16} />
              <span>Delivering fresh to {location.label} ({location.city})</span>
            </div>

            <h1 className="foody-hero-title">
              Healthy <span className="highlight-red">Eating</span> is <br />
              an <span className="highlight-orange">Important</span> Part <br />
              of Lifestyle
            </h1>

            <p className="foody-hero-subtitle">
              For proper delicious food that you can order always. From farm-fresh bowls to artisanal pizzas and juicy gourmet burgers, enjoy lightning-fast doorstep delivery.
            </p>

            <div className="foody-hero-actions">
              <button
                className="btn-explore-now"
                onClick={() => navigate("/restaurants")}
              >
                Explore Now <ArrowRight size={18} />
              </button>

              <button
                className="hero-play-wrap"
                onClick={() => setShowDemoModal(true)}
                aria-label="Watch how Yummy delivery works"
              >
                <div className="hero-play-circle">
                  <Play size={18} fill="currentColor" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Quick Search Input */}
            <form className="hero-search-bar" onSubmit={handleSearchSubmit}>
              <Search size={22} className="search-icon" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for salads, biryani, pizzas, burgers, rolls…"
                aria-label="Search restaurants and food"
              />
              <button type="submit" className="primary">
                Find Food
              </button>
            </form>
          </div>

          {/* Hero Right Media */}
          <div className="foody-hero-media">
            <img
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
              alt="Healthy fresh organic salad bowl with vegetables and grilled protein"
              className="foody-hero-plate"
              width="380"
              height="380"
            />

            {/* Circular 20% OFF Badge */}
            <div className="hero-badge-discount">
              <span>20%</span>
              <small>OFF</small>
            </div>

            {/* Floating Service Pill Card */}
            <div className="hero-floating-service-card">
              <div className="hero-service-item">
                <div className="hero-service-icon-wrap" style={{ background: "#fff0ed", color: "#ff4737" }}>
                  <Bike size={18} />
                </div>
                <div>
                  <b>Fast Delivery</b>
                  <small>25 - 30 Mins Guaranteed</small>
                </div>
              </div>
              <div
                style={{
                  height: "1px",
                  background: "rgba(0,0,0,0.06)",
                  margin: "2px 0"
                }}
              />
              <div className="hero-service-item">
                <div className="hero-service-icon-wrap" style={{ background: "#ecfdf5", color: "#10b981" }}>
                  <Store size={18} />
                </div>
                <div>
                  <b>Pick Up</b>
                  <small>Free from Restaurant</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Featured Floating Dish Carousel Strip */}
        <section className="floating-dishes-carousel">
          <button
            className="carousel-nav-btn prev"
            onClick={() =>
              setFloatingIndex(prev => (prev === 0 ? floatingDishes.length - 1 : prev - 1))
            }
            aria-label="Previous dishes"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="floating-dishes-row">
            {floatingDishes.map(dish => (
              <div key={dish.id} className={`floating-dish-card ${dish.theme}`}>
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="floating-dish-top-img"
                  width="130"
                  height="130"
                />
                <h4>{dish.title}</h4>
                <div className="price">₹{dish.price}</div>
                <div className="card-actions">
                  <button
                    className="btn-order-pill"
                    onClick={() => handleQuickAdd(dish)}
                  >
                    Order Now
                  </button>
                  <button
                    className="btn-card-heart"
                    onClick={() => showToast(`Saved ${dish.title} to favorites!`)}
                    aria-label="Add to favorites"
                  >
                    <Heart size={16} fill="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-nav-btn next"
            onClick={() =>
              setFloatingIndex(prev => (prev === floatingDishes.length - 1 ? 0 : prev + 1))
            }
            aria-label="Next dishes"
          >
            <ChevronRight size={22} />
          </button>
        </section>

        {/* 3. Promo Collage & "Our Categories" Section */}
        <section className="promo-categories-section">
          <div className="promo-collage-grid">
            <div
              className="collage-card-large"
              onClick={() => navigate("/restaurant/rest-3")}
            >
              <div>
                <h3>TASTY BURGER</h3>
                <span className="badge-new">NEW!</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80"
                alt="Hands holding juicy tasty double cheeseburger"
                width="400"
                height="230"
              />
            </div>

            <div
              className="collage-card-small"
              onClick={() => navigate("/restaurants?cuisine=Desserts")}
            >
              <img
                src="https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&auto=format&fit=crop&q=80"
                alt="Belgian waffle with ice cream and berries"
                width="300"
                height="200"
              />
              <span className="overlay-badge">SWEET DESSERTS</span>
            </div>

            <div
              className="collage-card-small"
              onClick={() => navigate("/restaurant/rest-5")}
            >
              <img
                src="https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&auto=format&fit=crop&q=80"
                alt="Crispy kebabs and savory falafel platter"
                width="300"
                height="200"
              />
              <span className="overlay-badge" style={{ background: "#ff4737" }}>
                ORDER NOW
              </span>
            </div>
          </div>

          <div className="categories-list-box">
            <h2 className="section-title">Our Categories</h2>
            <div className="title-underline" />

            <div className="categories-items-stack">
              <div
                className="cat-item-row"
                onClick={() => navigate("/restaurants?cuisine=Burgers")}
              >
                <div className="cat-round-icon cat-icon-orange">
                  <UtensilsCrossed size={22} />
                </div>
                <div>
                  <h4>Grab Your Delicious Food</h4>
                  <p>We prepare delicious meals for you anytime, always fresh and piping hot.</p>
                </div>
              </div>

              <div
                className="cat-item-row"
                onClick={() => navigate("/restaurants?cuisine=Beverages")}
              >
                <div className="cat-round-icon cat-icon-blue">
                  <Coffee size={22} />
                </div>
                <div>
                  <h4>Grab Your Refreshing Drinks</h4>
                  <p>Artisanal smoothies, cold-pressed juices, and energizing beverages on tap.</p>
                </div>
              </div>

              <div
                className="cat-item-row"
                onClick={() => navigate("/restaurants?cuisine=Healthy%20%26%20Salads")}
              >
                <div className="cat-round-icon cat-icon-green">
                  <Salad size={22} />
                </div>
                <div>
                  <h4>Grab Your Healthy Salads</h4>
                  <p>Organic greens, superfood bowls, and low-calorie Mediterranean lunches.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. "Get Started Today!" Banner Section */}
        <section className="get-started-section">
          <div className="get-started-left">
            <span className="get-started-kicker">FAST DELIVERY</span>
            <h2 className="get-started-title">Get Started Today!</h2>
            <p className="get-started-desc">
              Everything you need to experience effortless, restaurant-quality dining at home. Handcrafted recipes, top-grade hygiene, and instant delivery to satisfy every craving.
            </p>

            <div className="get-started-features-grid">
              <div className="get-started-feature-card">
                <div
                  className="feature-card-icon-pill"
                  style={{ background: "#e0f2fe", color: "#0284c7" }}
                >
                  <ShoppingBag size={20} />
                </div>
                <h5>Food Order</h5>
                <p>Pick from 1,000+ authentic neighborhood dishes prepared fresh.</p>
              </div>

              <div className="get-started-feature-card">
                <div
                  className="feature-card-icon-pill"
                  style={{ background: "#fef3c7", color: "#d97706" }}
                >
                  <Rocket size={20} />
                </div>
                <h5>Promote Restaurant</h5>
                <p>Support your favorite local kitchens and unlock exclusive member perks.</p>
              </div>
            </div>
          </div>

          <div className="get-started-visual">
            <span className="fries-floating-sticker" role="img" aria-label="French fries">
              🍟
            </span>
            <span className="fries-floating-sticker-left" role="img" aria-label="French fries">
              🍟
            </span>
            <div className="sunburst-circle-frame">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80"
                alt="Happy customer enjoying hot cheese pizza"
                width="360"
                height="360"
              />
            </div>
          </div>
        </section>

        {/* 5. TOP FOODS Section */}
        <section className="top-foods-section">
          <span className="top-foods-kicker">TOP FOODS</span>

          <div className="top-foods-grid">
            <div
              className="top-food-card"
              onClick={() => navigate("/restaurants?cuisine=Pizza")}
            >
              <div className="top-food-plate-wrap">
                <img
                  src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=80"
                  alt="Woodfired Pizza"
                  width="150"
                  height="150"
                />
              </div>
              <h4>Pizza</h4>
              <span>20 Restaurants Foods</span>
            </div>

            <div
              className="top-food-card"
              onClick={() => navigate("/restaurants?cuisine=North%20Indian")}
            >
              <div className="top-food-plate-wrap">
                <img
                  src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=80"
                  alt="Pasta and rich sauce"
                  width="150"
                  height="150"
                />
              </div>
              <h4>Pasta</h4>
              <span>15 Restaurants Foods</span>
            </div>

            <div
              className="top-food-card"
              onClick={() => navigate("/restaurants?cuisine=Desserts")}
            >
              <div className="top-food-plate-wrap">
                <img
                  src="https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=500&auto=format&fit=crop&q=80"
                  alt="Crispy waffles and dessert"
                  width="150"
                  height="150"
                />
              </div>
              <h4>Waffles</h4>
              <span>30 Restaurants Foods</span>
            </div>

            <div
              className="top-food-card"
              onClick={() => navigate("/restaurants?cuisine=Burgers")}
            >
              <div className="top-food-plate-wrap">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80"
                  alt="Loaded tower burger"
                  width="150"
                  height="150"
                />
              </div>
              <h4>Burger</h4>
              <span>25 Restaurants Foods</span>
            </div>
          </div>
        </section>


        {/* 7. "Get 20% Discount" Mobile App Download Banner */}
        <section className="section" style={{ padding: "20px 20px 60px" }}>
          <div className="foody-discount-banner">
            <div className="discount-banner-left">
              <h2>Get 20% Discount</h2>
              <p>
                Get flat 20% off on your first order through The Yummy App! Use coupon code <b>YUMMY50</b> at checkout.
              </p>
              <div className="store-badges-row">
                <button
                  className="store-badge-btn"
                  onClick={() => showToast("Downloading Yummy for Android via Google Play...")}
                >
                  <span>▶</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "0.65rem", opacity: 0.8 }}>GET IT ON</div>
                    <div style={{ fontWeight: 800 }}>Google Play</div>
                  </div>
                </button>

                <button
                  className="store-badge-btn"
                  onClick={() => showToast("Opening App Store...")}
                >
                  <span></span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "0.65rem", opacity: 0.8 }}>Download on the</div>
                    <div style={{ fontWeight: 800 }}>App Store</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="discount-banner-burger">
              <img
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80"
                alt="Gourmet double burger floating in mid-air"
                width="220"
                height="220"
              />
            </div>

            <div className="discount-banner-mockup">
              <div className="phone-mockup-frame">
                <div className="phone-mockup-screen">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <BrandLogo size={20} />
                    <span>📍 {location.city}</span>
                  </div>
                  <div
                    style={{
                      background: "#ffedd5",
                      borderRadius: "10px",
                      padding: "8px",
                      color: "#9a3412",
                      fontWeight: 700
                    }}
                  >
                    🎉 Flat 50% OFF Today
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "6px"
                    }}
                  >
                    <div
                      style={{
                        background: "#fee2e2",
                        borderRadius: "8px",
                        padding: "6px",
                        textAlign: "center"
                      }}
                    >
                      🥗 Bowl Salad
                      <div style={{ fontWeight: 800 }}>₹199</div>
                    </div>
                    <div
                      style={{
                        background: "#fef3c7",
                        borderRadius: "8px",
                        padding: "6px",
                        textAlign: "center"
                      }}
                    >
                      🍔 Burger
                      <div style={{ fontWeight: 800 }}>₹249</div>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "auto",
                      background: "var(--tomato)",
                      color: "#fff",
                      borderRadius: "999px",
                      padding: "6px",
                      textAlign: "center",
                      fontWeight: 800
                    }}
                  >
                    Order In App
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Real Restaurants Ordering Section */}
        <section className="section" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="section-heading">
            <div>
              <span className="kicker">Loved by Foodies</span>
              <h2>Top Rated Restaurants Near You</h2>
            </div>
            <Link to="/restaurants?sort=rating">
              Explore 4.5+ Rated <ArrowRight size={18} />
            </Link>
          </div>

          <div className="restaurant-grid">
            {topRated.slice(0, 3).map(r => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </section>

        <section className="section" style={{ paddingBottom: 80 }}>
          <div className="section-heading">
            <div>
              <span className="kicker">In a Hurry?</span>
              <h2>Superfast Delivery Near You</h2>
            </div>
            <Link to="/restaurants?filter=under30">
              See All Under 30 Mins <ArrowRight size={18} />
            </Link>
          </div>

          <div className="restaurant-grid">
            {fastDelivery.slice(0, 3).map(r => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </section>
      </div>

      {/* Interactive Video / How It Works Demo Modal */}
      {showDemoModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 10000,
            display: "grid",
            placeItems: "center",
            padding: "20px"
          }}
          onClick={() => setShowDemoModal(false)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "28px",
              padding: "36px",
              maxWidth: "540px",
              width: "100%",
              position: "relative",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)"
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDemoModal(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "#f1f5f9",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "grid",
                placeItems: "center",
                cursor: "pointer"
              }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#fff0ed",
                  color: "#ff4737",
                  display: "grid",
                  placeItems: "center",
                  margin: "0 auto 16px",
                  fontSize: "1.8rem"
                }}
              >
                🚀
              </div>
              <h3 style={{ fontSize: "1.6rem", margin: "0 0 8px 0" }}>
                How Yummy Works
              </h3>
              <p style={{ color: "#718096", margin: 0, fontSize: "0.95rem" }}>
                3 simple steps to delicious food on your table.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span
                  style={{
                    background: "#ff4737",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    flexShrink: 0
                  }}
                >
                  1
                </span>
                <div>
                  <b style={{ display: "block", color: "#111418" }}>
                    Select Your Location & Restaurant
                  </b>
                  <small style={{ color: "#718096" }}>
                    Browse top neighborhood kitchens delivering fresh to your doorstep.
                  </small>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span
                  style={{
                    background: "#ff9f43",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    flexShrink: 0
                  }}
                >
                  2
                </span>
                <div>
                  <b style={{ display: "block", color: "#111418" }}>
                    Customize & Add to Cart
                  </b>
                  <small style={{ color: "#718096" }}>
                    Select portion sizes, spice levels, toppings, and apply discount promo codes.
                  </small>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span
                  style={{
                    background: "#2ed573",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    flexShrink: 0
                  }}
                >
                  3
                </span>
                <div>
                  <b style={{ display: "block", color: "#111418" }}>
                    Live GPS Rider Tracking
                  </b>
                  <small style={{ color: "#718096" }}>
                    Watch your order move from kitchen to doorstep with real-time ETA updates.
                  </small>
                </div>
              </div>
            </div>

            <button
              className="primary full-width"
              style={{ marginTop: "28px" }}
              onClick={() => {
                setShowDemoModal(false);
                navigate("/restaurants");
              }}
            >
              Start Ordering Now →
            </button>
          </div>
        </div>
      )}

      {/* Dish Customization Modal (Opens on mobile & desktop when custom dish added) */}
      {customizingItem && (
        <CustomizationModal
          isOpen={Boolean(customizingItem)}
          item={customizingItem.item}
          restaurant={customizingItem.restaurant}
          onClose={() => setCustomizingItem(null)}
        />
      )}
    </>
  );
}
