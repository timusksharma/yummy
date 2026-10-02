import {
  ArrowLeft,
  Clock,
  Heart,
  Info,
  MapPin,
  Search,
  Sparkles,
  Star,
  Tag
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DishCard } from "../components/DishCard";
import { restaurants } from "../data/restaurants";
import { useDelivery } from "../hooks/useDeliveryState";

export function RestaurantDetailPage() {
  const { id } = useParams();
  const { favoriteRestaurants, toggleFavoriteRestaurant } = useDelivery();
  const restaurant = restaurants.find(r => r.id === id);

  const [vegOnly, setVegOnly] = useState(false);
  const [dishQuery, setDishQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Extract unique menu categories
  const categories = useMemo(() => {
    if (!restaurant) return ["All"];
    const cats = Array.from(new Set(restaurant.menu.map(m => m.category)));
    return ["All", ...cats];
  }, [restaurant]);

  // Filter dishes based on veg toggle, dish search, and active category
  const filteredDishes = useMemo(() => {
    if (!restaurant) return [];
    return restaurant.menu.filter(dish => {
      if (vegOnly && !dish.isVeg) return false;
      if (activeCategory !== "All" && dish.category !== activeCategory) return false;
      if (
        dishQuery &&
        !dish.name.toLowerCase().includes(dishQuery.toLowerCase()) &&
        !dish.description.toLowerCase().includes(dishQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [restaurant, vegOnly, activeCategory, dishQuery]);

  // Group filtered dishes by category
  const groupedDishes = useMemo(() => {
    const groups: Record<string, typeof filteredDishes> = {};
    filteredDishes.forEach(dish => {
      if (!groups[dish.category]) groups[dish.category] = [];
      groups[dish.category].push(dish);
    });
    return groups;
  }, [filteredDishes]);

  if (!restaurant) {
    return (
      <section className="section page empty">
        <span style={{ fontSize: "3rem" }}>🍽️</span>
        <h1>Restaurant Not Found</h1>
        <p>The restaurant you are looking for is currently unavailable.</p>
        <Link className="primary" to="/restaurants">
          Browse All Restaurants
        </Link>
      </section>
    );
  }

  const isFavorite = favoriteRestaurants.includes(restaurant.id);

  return (
    <section className="section page" style={{ paddingTop: 30 }}>
      <Link className="back" to="/restaurants">
        <ArrowLeft size={18} /> Back to all restaurants
      </Link>

      {/* Restaurant Header Card */}
      <div className="restaurant-detail-header">
        <div className="rest-detail-info">
          <div className="rest-detail-title-row">
            <h1>{restaurant.name}</h1>
            <button
              className={`icon-button ${isFavorite ? "favorited" : ""}`}
              onClick={() => toggleFavoriteRestaurant(restaurant.id)}
              aria-label={isFavorite ? "Remove favorite" : "Add to favorites"}
            >
              <Heart fill={isFavorite ? "#ff4d2e" : "none"} color={isFavorite ? "#ff4d2e" : "currentColor"} />
            </button>
          </div>

          <p className="rest-detail-cuisines">
            {restaurant.cuisines.join(" • ")}
          </p>

          <p className="rest-detail-address">
            <MapPin size={15} style={{ display: "inline", marginRight: 4 }} />
            {restaurant.address}
          </p>

          <div className="rest-detail-stats">
            <span className="rating-badge">
              <Star size={16} fill="currentColor" />
              <b>{restaurant.rating}</b> ({restaurant.reviewCount}+ ratings)
            </span>
            <span className="stat-pill">
              <Clock size={16} />
              <b>{restaurant.deliveryTimeMinutes} mins</b>
            </span>
            <span className="stat-pill">
              <b>₹{restaurant.costForTwo} for two</b>
            </span>
          </div>

          {restaurant.offerText && (
            <div className="rest-deal-strip">
              <Tag size={16} color="var(--tomato)" />
              <b>{restaurant.offerText}</b>
              <span className="dot">•</span>
              <small>Use code on checkout</small>
            </div>
          )}
        </div>

        <div className="rest-detail-media">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            width="500"
            height="320"
          />
        </div>
      </div>

      {/* Menu Controls & Category Jump Navigation */}
      <div className="menu-controls-bar">
        {/* Search within menu */}
        <div className="menu-search-box">
          <Search size={18} color="var(--muted)" />
          <input
            value={dishQuery}
            onChange={e => setDishQuery(e.target.value)}
            placeholder={`Search dishes in ${restaurant.name}…`}
            aria-label="Search dishes"
          />
        </div>

        {/* Veg-Only Toggle */}
        <label className="veg-toggle-label">
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={e => setVegOnly(e.target.checked)}
          />
          <span className="veg-toggle-slider" />
          <span className="veg-toggle-text">Veg Only</span>
        </label>
      </div>

      {/* Sticky Menu Categories Navigation */}
      <div className="category-tabs-scroll">
        {categories.map(cat => (
          <button
            key={cat}
            className={`cat-tab-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dish Listings */}
      <div className="menu-sections">
        {Object.keys(groupedDishes).length > 0 ? (
          Object.entries(groupedDishes).map(([categoryName, items]) => (
            <div key={categoryName} className="menu-category-block">
              <h2 className="category-title">
                {categoryName} ({items.length})
              </h2>

              <div className="dish-list">
                {items.map(dish => (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    restaurant={restaurant}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="empty" style={{ margin: "40px 0" }}>
            <span style={{ fontSize: "2.5rem" }}>🥗</span>
            <h3>No dishes match your filter</h3>
            <p>Try turning off the Veg Only filter or clearing your search.</p>
            <button
              className="secondary"
              onClick={() => {
                setVegOnly(false);
                setDishQuery("");
                setActiveCategory("All");
              }}
            >
              Reset Menu Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
