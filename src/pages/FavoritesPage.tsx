import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DishCard } from "../components/DishCard";
import { RestaurantCard } from "../components/RestaurantCard";
import { restaurants } from "../data/restaurants";
import { useDelivery } from "../hooks/useDeliveryState";

export function FavoritesPage() {
  const { favoriteRestaurants, favoriteDishes } = useDelivery();
  const [tab, setTab] = useState<"restaurants" | "dishes">("restaurants");

  const savedRestaurants = restaurants.filter(r =>
    favoriteRestaurants.includes(r.id)
  );

  const savedDishes: { dish: typeof restaurants[0]["menu"][0]; restaurant: typeof restaurants[0] }[] = [];
  restaurants.forEach(r => {
    r.menu.forEach(d => {
      if (favoriteDishes.includes(d.id)) {
        savedDishes.push({ dish: d, restaurant: r });
      }
    });
  });

  return (
    <section className="section page" style={{ paddingTop: 30 }}>
      <div className="page-heading">
        <span className="kicker">Personal Wishlist</span>
        <h1>Saved Favorites</h1>
        <p>Your handpicked favorite restaurants and top-rated comfort dishes.</p>
      </div>

      <div className="orders-tab-row">
        <button
          className={tab === "restaurants" ? "active" : ""}
          onClick={() => setTab("restaurants")}
        >
          Restaurants ({savedRestaurants.length})
        </button>
        <button
          className={tab === "dishes" ? "active" : ""}
          onClick={() => setTab("dishes")}
        >
          Favorite Dishes ({savedDishes.length})
        </button>
      </div>

      {tab === "restaurants" && (
        <>
          {savedRestaurants.length > 0 ? (
            <div className="restaurant-grid">
              {savedRestaurants.map(r => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <Heart size={48} color="var(--tomato)" />
              <h2>No favorite restaurants yet</h2>
              <p>Tap the heart icon on any restaurant to bookmark it for quick ordering.</p>
              <Link className="primary" to="/restaurants">
                Browse Restaurants
              </Link>
            </div>
          )}
        </>
      )}

      {tab === "dishes" && (
        <>
          {savedDishes.length > 0 ? (
            <div className="dish-search-grid">
              {savedDishes.map(({ dish, restaurant }) => (
                <div key={`${restaurant.id}-${dish.id}`} className="search-dish-item">
                  <div className="dish-restaurant-kicker">
                    From{" "}
                    <Link to={`/restaurants/${restaurant.id}`}>
                      <b>{restaurant.name}</b>
                    </Link>
                  </div>
                  <DishCard dish={dish} restaurant={restaurant} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty">
              <Heart size={48} color="var(--tomato)" />
              <h2>No saved dishes yet</h2>
              <p>Explore restaurant menus and save your favorite dishes here.</p>
              <Link className="primary" to="/restaurants">
                Discover Dishes
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}
