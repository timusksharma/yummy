import { Clock, Heart, MapPin, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Restaurant } from "../domain/delivery";
import { useDelivery } from "../hooks/useDeliveryState";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const { favoriteRestaurants, toggleFavoriteRestaurant } = useDelivery();
  const isFavorite = favoriteRestaurants.includes(restaurant.id);

  return (
    <article className="restaurant-card">
      <div className="rest-image-wrap">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          width="600"
          height="380"
          loading="lazy"
        />

        {restaurant.offerText && (
          <span className="rest-offer-tag">
            <Sparkles size={14} />
            {restaurant.offerText}
          </span>
        )}

        <button
          className={`rest-fav-btn ${isFavorite ? "favorited" : ""}`}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavoriteRestaurant(restaurant.id);
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
          title={isFavorite ? "Remove from favorites" : "Save to favorites"}
        >
          <Heart fill={isFavorite ? "currentColor" : "none"} size={18} />
        </button>

        {restaurant.isPromoted && (
          <span className="rest-promoted-pill">Ad</span>
        )}

        {restaurant.isVeg && (
          <span className="pure-veg-tag">
            <span className="veg-dot" /> Pure Veg
          </span>
        )}
      </div>

      <div className="rest-body">
        <div className="rest-row-top">
          <h3>{restaurant.name}</h3>
          <span className="rating-pill">
            <Star size={14} fill="currentColor" />
            {restaurant.rating}
          </span>
        </div>

        <p className="rest-cuisines">{restaurant.cuisines.join(", ")}</p>

        <div className="rest-meta">
          <span>
            <Clock size={15} />
            {restaurant.deliveryTimeMinutes} mins
          </span>
          <span className="meta-dot">•</span>
          <span>
            <MapPin size={15} />
            {restaurant.distanceKm} km
          </span>
          <span className="meta-dot">•</span>
          <span className="cost-tag">₹{restaurant.costForTwo} for two</span>
        </div>

        <Link
          to={`/restaurants/${restaurant.id}`}
          className="secondary rest-view-btn"
        >
          View Menu & Order
        </Link>
      </div>
    </article>
  );
}
