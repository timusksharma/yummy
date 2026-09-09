import { ArrowRight, Check, Search, Star } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import bowl from "../assets/smoothie-bowl.jpg";
import meal from "../assets/meal-kit.jpg";
import bites from "../assets/protein-balls.jpg";
import heroPerson from "../assets/yummy-hero-person.png";
import pizza from "../assets/yummy-pizza.png";
import burger from "../assets/yummy-burger.png";
import { DishCard } from "../components/DishCard";
import { RestaurantCard } from "../components/RestaurantCard";
import { cuisines, restaurants } from "../data/delivery";
import { deliveryBenefits, serviceSteps } from "../data/homeContent";

const categoryImages = [pizza, meal, burger, bowl, meal, bites, bowl, meal, burger, bites];

export function HomePage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const popular = restaurants.flatMap((restaurant) => restaurant.dishes.map((dish) => ({ dish, restaurant }))).filter(({ dish }) => dish.bestseller);
  const search = (event: FormEvent) => { event.preventDefault(); navigate(`/restaurants?q=${encodeURIComponent(query)}`); };

  return (
    <>
      <section className="monkey-hero">
        <div className="hero-message">
          <span className="soft-orb"/>
          <p className="hero-kicker">Hungry? We are one click away.</p>
          <h1>Fastest <em>Delivery</em><br/>& easy <em>pickup.</em></h1>
          <form className="green-search" onSubmit={search}><Search/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find restaurants, dishes, or cuisines"/><button>Find restaurants</button></form>
          <Link className="how-link" to="/orders"><span><ArrowRight/></span>How ordering works</Link>
        </div>
        <div className="hero-art"><span className="hero-disc"/><i className="arc arc-green"/><i className="arc arc-red"/><i className="arc arc-grey"/><img src={heroPerson} alt="Smiling customer enjoying a burger" width="800" height="1000"/></div>
        <div className="benefit-stack">{deliveryBenefits.map(({ icon: Icon, title, description }) => <article key={title}><span><Icon/></span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
      </section>

      <section className="mobile-banner section"><div className="mini-phone"><span>Yummy<span>.</span></span><img src={burger} alt=""/><small>Let’s eat<br/>quality food</small></div><div><span className="tiny-label">YUMMY IN YOUR POCKET</span><h2>Download<br/>our mobile app</h2><div className="people-row">{["AK","NM","RS","JP"].map((person) => <span key={person}>{person}</span>)}<Link to="/restaurants"><ArrowRight/></Link></div></div><div className="store-ratings"><article><b>▶</b><span><strong>4.8/5</strong><small>★★★★★</small></span></article><article><b>●</b><span><strong>4.9/5</strong><small>★★★★★</small></span></article></div></section>

      <section className="section reference-categories"><div className="reference-heading"><h2>Our <em>best delivered</em><br/>categories</h2><p>It is not just about bringing good food from restaurants. We deliver a better everyday experience.</p></div><div className="category-gallery">{cuisines.slice(0,6).map((category, index) => <Link to={`/restaurants?q=${encodeURIComponent(category)}`} key={category}><span className={`category-ring ring-${index % 3}`}><img src={categoryImages[index]} alt={category} loading="lazy"/></span><b>{category}</b><small>Order now <ArrowRight/></small></Link>)}</div></section>

      <section className="speed-band"><div className="speed-copy"><span className="tiny-label">HOT, FRESH, AND FAST</span><h2>Fastest food<br/><em>delivery</em> in town</h2><p>Order from neighborhood favorites and follow every step to your door.</p><Link className="light-link" to="/restaurants">Explore food <ArrowRight/></Link></div><img src={pizza} alt="Fresh vegetable pizza ready for delivery" width="1200" height="800" loading="lazy"/><div className="speed-notes"><article><span>✦</span><div><b>Quick routes</b><small>Smart demo delivery estimates</small></div></article><article><span>✓</span><div><b>Carefully packed</b><small>Made fresh and sealed for travel</small></div></article></div></section>

      <section className="section serve-section"><div className="reference-heading centered"><h2>How we <em>serve you</em></h2></div><div className="serve-grid">{serviceSteps.map(({ icon: Icon, title, description }, index) => <article key={title}><span className={`serve-icon serve-${index}`}><Icon/></span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

      <section className="section promo-collage"><Link to="/restaurants" className="promo-main"><div><span>YUMMY COMBO</span><h2>Buy 2<br/>get 1 free</h2><b>From ₹599</b></div><img src={burger} alt="Burger and fries promotional meal" loading="lazy"/></Link><div><Link to="/offers" className="promo-small cocoa"><span>Save 20%</span><h3>Sweet endings</h3><img src={bowl} alt="Dessert special" loading="lazy"/></Link><Link to="/offers" className="promo-small coral"><span>₹120 off</span><h3>Big flavor offers</h3><img src={meal} alt="Restaurant meal offer" loading="lazy"/></Link></div></section>

      <RestaurantSection title="Restaurants near you" subtitle="Popular around Green Park" list={restaurants}/>
      <section className="section popular-dishes"><div className="reference-heading"><h2>Popular <em>dishes</em></h2><Link to="/restaurants">See all <ArrowRight/></Link></div><div className="dish-home-grid">{popular.map(({ dish, restaurant }) => <DishCard key={dish.id} dish={dish} restaurant={restaurant}/>)}</div></section>

      <section className="section kitchen-callout"><div><span className="tiny-label">YUMMY KITCHEN</span><h2>Prefer to cook?<br/><em>We have you.</em></h2><p>Discover recipes, plan seven delicious days, and keep your grocery list tidy.</p><Link className="green-button" to="/kitchen/recipes">Open Yummy Kitchen <ArrowRight/></Link></div><div className="kitchen-bubbles"><span><Check/>Smart recipes</span><span><Check/>Meal planning</span><span><Check/>Kitchen tools</span></div></section>

      <section className="network-band"><div className="logo-cloud">{restaurants.map((restaurant) => <span key={restaurant.id}>{restaurant.name.slice(0,2)}</span>)}</div><div><span className="tiny-label">MORE CHOICE, MORE JOY</span><h2>Enjoy hundreds of dishes<br/>from neighborhood favorites</h2><Link to="/restaurants">Order now <ArrowRight/></Link></div></section>
    </>
  );
}

function RestaurantSection({ title, subtitle, list }: { title: string; subtitle: string; list: typeof restaurants }) {
  return <section className="section restaurant-home"><div className="reference-heading"><div><span className="tiny-label">{subtitle}</span><h2>{title}</h2></div><Link to="/restaurants">See all <ArrowRight/></Link></div><div className="restaurant-grid">{list.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant}/>)}</div></section>;
}
