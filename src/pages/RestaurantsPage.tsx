import {
  ArrowUpDown,
  Check,
  Clock,
  Filter,
  Percent,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  X
} from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RestaurantCard } from "../components/RestaurantCard";
import { restaurants } from "../data/restaurants";
import type { CuisineType, FilterState } from "../domain/delivery";
import { filterRestaurants } from "../services/deliveryService";

const allCuisines: CuisineType[] = [
  "Biryani",
  "Pizza",
  "Burgers",
  "North Indian",
  "South Indian",
  "Chinese",
  "Rolls & Wraps",
  "Healthy & Salads",
  "Desserts",
  "Beverages"
];

export function RestaurantsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial query parameters
  const initialCuisine = searchParams.get("cuisine") as CuisineType | null;
  const initialFilter = searchParams.get("filter");
  const initialSort = (searchParams.get("sort") as FilterState["sortBy"]) || "relevance";

  const [pureVegOnly, setPureVegOnly] = useState(initialFilter === "pureVeg");
  const [rating4Plus, setRating4Plus] = useState(false);
  const [under30Mins, setUnder30Mins] = useState(initialFilter === "under30");
  const [hasOffers, setHasOffers] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState<CuisineType[]>(
    initialCuisine ? [initialCuisine] : []
  );
  const [sortBy, setSortBy] = useState<FilterState["sortBy"]>(initialSort);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCuisine = (cuisine: CuisineType) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const clearAllFilters = () => {
    setPureVegOnly(false);
    setRating4Plus(false);
    setUnder30Mins(false);
    setHasOffers(false);
    setSelectedCuisines([]);
    setSortBy("relevance");
    setSearchQuery("");
    setSearchParams({});
  };

  const activeFilterCount =
    (pureVegOnly ? 1 : 0) +
    (rating4Plus ? 1 : 0) +
    (under30Mins ? 1 : 0) +
    (hasOffers ? 1 : 0) +
    selectedCuisines.length +
    (sortBy !== "relevance" ? 1 : 0);

  const filteredRestaurants = useMemo(() => {
    return filterRestaurants(restaurants, {
      pureVegOnly,
      rating4Plus,
      under30Mins,
      hasOffers,
      selectedCuisines,
      sortBy,
      searchQuery
    });
  }, [
    pureVegOnly,
    rating4Plus,
    under30Mins,
    hasOffers,
    selectedCuisines,
    sortBy,
    searchQuery
  ]);

  return (
    <section className="section page">
      <div className="page-heading">
        <span className="kicker">Discover Best Eats</span>
        <h1>Restaurants Delivering to You</h1>
        <p>
          Order from top kitchens, local favorites, and verified hygienic restaurants in your area.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="discovery-filter-bar">
        {/* Search Input */}
        <div className="filter-search-box">
          <Search size={18} color="var(--muted)" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by restaurant name, cuisine, or dish…"
            aria-label="Filter restaurants"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="clear-search-btn"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Quick Filter Buttons */}
        <div className="quick-filter-scroll">
          {/* Pure Veg Toggle */}
          <button
            className={`filter-btn ${pureVegOnly ? "active veg-active" : ""}`}
            onClick={() => setPureVegOnly(!pureVegOnly)}
          >
            <span className="veg-indicator-dot" />
            Pure Veg
          </button>

          {/* 4.0+ Rating */}
          <button
            className={`filter-btn ${rating4Plus ? "active" : ""}`}
            onClick={() => setRating4Plus(!rating4Plus)}
          >
            <Star size={14} fill={rating4Plus ? "currentColor" : "none"} />
            Ratings 4.0+
          </button>

          {/* Under 30 Mins */}
          <button
            className={`filter-btn ${under30Mins ? "active" : ""}`}
            onClick={() => setUnder30Mins(!under30Mins)}
          >
            <Clock size={14} />
            Under 30 Mins
          </button>

          {/* Has Offers */}
          <button
            className={`filter-btn ${hasOffers ? "active" : ""}`}
            onClick={() => setHasOffers(!hasOffers)}
          >
            <Percent size={14} />
            Offers & Deals
          </button>

          {/* Sort Dropdown */}
          <div className="sort-dropdown-wrap">
            <ArrowUpDown size={14} />
            <select
              value={sortBy}
              onChange={e =>
                setSortBy(e.target.value as FilterState["sortBy"])
              }
              aria-label="Sort restaurants by"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="rating">Rating: High to Low</option>
              <option value="deliveryTime">Delivery Time: Fastest</option>
              <option value="costLowToHigh">Cost: Low to High</option>
              <option value="costHighToLow">Cost: High to Low</option>
            </select>
          </div>
        </div>

        {/* Cuisines Pill Row */}
        <div className="cuisines-pill-row">
          {allCuisines.map(cuisine => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <button
                key={cuisine}
                className={`cuisine-pill ${isSelected ? "selected" : ""}`}
                onClick={() => toggleCuisine(cuisine)}
              >
                {isSelected && <Check size={14} />}
                {cuisine}
              </button>
            );
          })}
        </div>

        {/* Results summary and Clear */}
        <div className="filter-summary-row">
          <span>
            <b>{filteredRestaurants.length}</b>{" "}
            {filteredRestaurants.length === 1 ? "restaurant" : "restaurants"} found
          </span>

          {activeFilterCount > 0 && (
            <button className="clear-filters-link" onClick={clearAllFilters}>
              Clear all filters ({activeFilterCount})
            </button>
          )}
        </div>
      </div>

      {/* Restaurant Grid */}
      {filteredRestaurants.length > 0 ? (
        <div className="restaurant-grid">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <span style={{ fontSize: "3rem" }}>🍽️</span>
          <h2>No matching restaurants found</h2>
          <p>Try clearing some filters or searching for another cuisine.</p>
          <button className="primary" onClick={clearAllFilters}>
            Show All Restaurants
          </button>
        </div>
      )}
    </section>
  );
}
