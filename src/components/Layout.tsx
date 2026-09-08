import { Heart, Home, ListChecks, Menu, Search, Soup, UserRound, UtensilsCrossed, WandSparkles, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const links = [{to:"/",label:"Home"},{to:"/recipes",label:"Recipes"},{to:"/planner",label:"Meal Planner"},{to:"/grocery",label:"Grocery List"},{to:"/nutrition",label:"Nutrition"},{to:"/tools",label:"Kitchen Tools"}];
export function Layout(){
  const [open,setOpen]=useState(false);
  return <div className="app-shell">
    <header className="topbar"><NavLink className="logo" to="/"><span>Y</span>Yummy</NavLink>
      <nav className={open?"nav-links open":"nav-links"} aria-label="Main navigation">{links.map(l=><NavLink key={l.to} to={l.to} onClick={()=>setOpen(false)}>{l.label}</NavLink>)}</nav>
      <div className="header-actions"><NavLink className="icon-button" to="/recipes" aria-label="Search recipes"><Search/></NavLink><NavLink className="icon-button" to="/favorites" aria-label="Saved recipes"><Heart/></NavLink><NavLink className="icon-button" to="/profile" aria-label="Profile"><UserRound/></NavLink><NavLink className="primary compact" to="/recipes">Start cooking</NavLink><button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button></div>
    </header>
    <main><Outlet/></main>
    <footer><div><NavLink className="logo" to="/"><span>Y</span>Yummy</NavLink><p>Your practical companion for calmer, tastier cooking.</p></div><div><h3>Cook</h3><NavLink to="/recipes">Recipes</NavLink><NavLink to="/planner">Meal planner</NavLink><NavLink to="/grocery">Grocery list</NavLink></div><div><h3>Explore</h3><NavLink to="/nutrition">Nutrition</NavLink><NavLink to="/tools">Kitchen tools</NavLink><NavLink to="/favorites">Favorites</NavLink></div><div><h3>Yummy</h3><a href="#help">Help</a><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div><small>© {new Date().getFullYear()} Yummy. Made for everyday cooks.</small></footer>
    <nav className="bottom-nav" aria-label="Mobile navigation"><NavLink to="/"><Home/>Home</NavLink><NavLink to="/recipes"><Soup/>Recipes</NavLink><NavLink to="/planner"><WandSparkles/>Planner</NavLink><NavLink to="/grocery"><ListChecks/>Grocery</NavLink><NavLink to="/profile"><UserRound/>Profile</NavLink></nav>
  </div>
}
