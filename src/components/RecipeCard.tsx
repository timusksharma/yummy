import { Clock, Flame, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Recipe } from "../domain/models";
import { useKitchen } from "../hooks/useKitchenState";
export function RecipeCard({recipe}:{recipe:Recipe}){
  const {favorites,toggleFavorite}=useKitchen(); const saved=favorites.includes(recipe.id);
  return <article className="recipe-card"><div className="image-wrap"><img src={recipe.image} alt={recipe.imageAlt} width="640" height="420" loading="lazy"/><button className={saved?"favorite saved":"favorite"} onClick={()=>toggleFavorite(recipe.id)} aria-label={saved?"Remove from favorites":"Save to favorites"}><Heart fill={saved?"currentColor":"none"}/></button></div><div className="card-body"><div className="eyebrow">{recipe.cuisine} · {recipe.category}</div><h3>{recipe.title}</h3><p>{recipe.description}</p><div className="meta"><span><Clock/>{recipe.time} min</span><span><Flame/>{recipe.nutrition.calories} cal</span><span><Star fill="currentColor"/>{recipe.rating}</span></div><Link className="secondary" to={`/recipes/${recipe.id}`}>View recipe</Link></div></article>
}
