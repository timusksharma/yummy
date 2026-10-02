import { ArrowRight, Search, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DishCard } from "../components/DishCard";
import { RestaurantCard } from "../components/RestaurantCard";
import { restaurants } from "../data/restaurants";
import { searchFoodAndRestaurants } from "../services/deliveryService";

const trendingSearches = [
  "Biryani",
  "Butter Chicken",
  "Margherita Pizza",
  "Burger",
  "Masala Dosa",
  "Momos",
  "Kathi Roll",
  "Hakka Noodles",
  "Chocolate Lava Cake"
];

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<"all" | "dishes" | "restaurants">("all");

  const results = useMemo(() => {
    return searchFoodAndRestaurants(query, restaurants);
  }, [query]);

  const handleTrendingClick = (term: string) => {
    setQuery(term);
    setSearchParams({ q: term });
  };

  return (
    <section className="section page" style={{ paddingTop: 30 }}>
      <div className="page-heading">
        <span className="kicker">Instant Food Search</span>
        <h1>Search Dishes & Restaurants</h1>
      </div>

      {/* Search Input Bar */}
      <div className="big-search-box">
        <Search size={22} className="search-icon" />
        <input
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setSearchParams(e.target.value ? { q: e.target.value } : {});
          }}
          placeholder="Search for biryani, pizza, burger, Chinese, or restaurant name…"
          autoFocus
        />
        {query && (
          <button
            className="clear-search-btn"
            onClick={() => {
              setQuery("");
              setSearchParams({});
            }}
            aria-label="Clear query"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Trending Suggestions */}
      {!query && (
        <div className="trending-search-block">
          <h3>
            <Sparkles size={16} color="var(--orange)" /> Popular Searches Right Now
          </h3>
          <div className="trending-pills-row">
            {trendingSearches.map(term => (
              <button
                key={term}
                className="trending-pill"
                onClick={() => handleTrendingClick(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results View */}
      {query && (
        <>
          <div className="search-tabs-row">
            <button
              className={activeTab === "all" ? "active" : ""}
              onClick={() => setActiveTab("all")}
            >
              All Results ({results.matchedDishes.length + results.matchedRestaurants.length})
            </button>
            <button
              className={activeTab === "dishes" ? "active" : ""}
              onClick={() => setActiveTab("dishes")}
            >
              Dishes ({results.matchedDishes.length})
            </button>
            <button
              className={activeTab === "restaurants" ? "active" : ""}
              onClick={() => setActiveTab("restaurants")}
            >
              Restaurants ({results.matchedRestaurants.length})
            </button>
          </div>

          {/* Results: Dishes */}
          {(activeTab === "all" || activeTab === "dishes") &&
            results.matchedDishes.length > 0 && (
              <div className="search-section">
                <h2>Matching Dishes ({results.matchedDishes.length})</h2>
                <div className="dish-search-grid">
                  {results.matchedDishes.map(({ dish, restaurant }) => (
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
              </div>
            )}

          {/* Results: Restaurants */}
          {(activeTab === "all" || activeTab === "restaurants") &&
            results.matchedRestaurants.length > 0 && (
              <div className="search-section" style={{ marginTop: 40 }}>
                <h2>Matching Restaurants ({results.matchedRestaurants.length})</h2>
                <div className="restaurant-grid">
                  {results.matchedRestaurants.map(restaurant => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              </div>
            )}

          {/* No results */}
          {results.matchedDishes.length === 0 &&
            results.matchedRestaurants.length === 0 && (
              <div className="empty" style={{ margin: "50px 0" }}>
                <span style={{ fontSize: "3rem" }}>🔍</span>
                <h2>No dishes or restaurants found for "{query}"</h2>
                <p>Check the spelling or try searching for another cuisine or popular dish.</p>
                <div className="trending-pills-row" style={{ justifyContent: "center" }}>
                  {trendingSearches.slice(0, 4).map(term => (
                    <button
                      key={term}
                      className="trending-pill"
                      onClick={() => handleTrendingClick(term)}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
        </>
      )}
    </section>
  );
}
