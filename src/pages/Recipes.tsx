import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Clock, Flame, Heart, Play, Star, Users } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { RecipeCard } from "../components/RecipeCard";
import { recipes } from "../data/recipes";
import { useKitchen } from "../hooks/useKitchenState";

export function RecipesPage(){
  const [params]=useSearchParams(); const initial=params.get("filter")??"All"; const [query,setQuery]=useState(""); const [filter,setFilter]=useState(initial);
  const filters=["All","Breakfast","Lunch","Dinner","Vegetarian","Vegan","High Protein","Indian","Italian","Asian"];
  const shown=useMemo(()=>recipes.filter(r=>(!query||`${r.title} ${r.ingredients.map(i=>i.name).join(" ")}`.toLowerCase().includes(query.toLowerCase()))&&(filter==="All"||r.category===filter||r.cuisine===filter||r.diets.includes(filter as never))),[query,filter]);
  return <section className="section page"><div className="page-heading"><span className="kicker">Cook something wonderful</span><h1>Find your next favorite recipe</h1><p>Search by dish or ingredient, then filter to suit your day.</p></div><div className="search-panel"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search recipes or ingredients…" aria-label="Search recipes"/><div className="filter-row">{filters.map(f=><button key={f} className={filter===f?"active":""} onClick={()=>setFilter(f)}>{f}</button>)}</div></div><div className="results-line"><b>{shown.length} recipes</b><span>Sorted for everyday cooking</span></div>{shown.length?<div className="card-grid">{shown.map(r=><RecipeCard key={r.id} recipe={r}/>)}</div>:<div className="empty"><span>🥄</span><h2>No recipes found</h2><p>Try a different ingredient or clear your filter.</p><button className="primary" onClick={()=>{setQuery("");setFilter("All")}}>Show all recipes</button></div>}</section>
}

export function RecipeDetailPage(){
  const {id}=useParams(); const recipe=recipes.find(r=>r.id===id); const {favorites,toggleFavorite,setPlan,plan}=useKitchen();
  if(!recipe)return <section className="section page empty"><h1>Recipe not found</h1><Link className="primary" to="/recipes">Browse recipes</Link></section>;
  const addPlan=()=>setPlan({...plan,slots:plan.slots.map((s,i)=>i===0?{...s,recipeId:recipe.id}:s)});
  return <section className="section page"><Link className="back" to="/recipes"><ArrowLeft/>All recipes</Link><div className="detail-hero"><img src={recipe.image} alt={recipe.imageAlt} width="800" height="650"/><div><span className="kicker">{recipe.cuisine} · {recipe.category}</span><h1>{recipe.title}</h1><p>{recipe.description}</p><div className="detail-stats"><span><Star fill="currentColor"/><b>{recipe.rating}</b> rating</span><span><Clock/><b>{recipe.time}</b> minutes</span><span><Users/><b>{recipe.servings}</b> servings</span><span><Flame/><b>{recipe.nutrition.calories}</b> calories</span></div><div className="actions"><Link className="primary" to={`/recipes/${recipe.id}/cook`}><Play/>Start cooking</Link><button className="secondary" onClick={()=>toggleFavorite(recipe.id)}><Heart fill={favorites.includes(recipe.id)?"currentColor":"none"}/>{favorites.includes(recipe.id)?"Saved":"Save recipe"}</button><button className="secondary" onClick={addPlan}>Add to meal plan</button></div></div></div><div className="recipe-columns"><article className="panel"><h2>Ingredients</h2><ul className="ingredient-list">{recipe.ingredients.map(i=><li key={i.name}><Check/><span>{i.name}</span><b>{i.amount} {i.unit}</b></li>)}</ul></article><article className="panel"><h2>Nutrition per serving</h2><div className="nutrition-mini">{Object.entries(recipe.nutrition).map(([k,v])=><span key={k}><b>{v}{k==="calories"?"":"g"}</b>{k}</span>)}</div></article></div><article className="panel steps"><h2>How to make it</h2>{recipe.steps.map(s=><div key={s.id}><span>{s.id}</span><p>{s.instruction}</p>{s.timerMinutes&&<small><Clock/>{s.timerMinutes} min</small>}</div>)}</article></section>
}

export function CookingPage(){
  const {id}=useParams(); const recipe=recipes.find(r=>r.id===id); const [step,setStep]=useState(0); const [seconds,setSeconds]=useState(0);
  useEffect(()=>{if(seconds<=0)return;const timer=window.setInterval(()=>setSeconds(s=>Math.max(0,s-1)),1000);return()=>window.clearInterval(timer)},[seconds]);
  if(!recipe)return <NavigateBack/>; const current=recipe.steps[step];
  return <section className="cook-mode"><Link to={`/recipes/${recipe.id}`}><ArrowLeft/>Exit cooking mode</Link><div className="cook-card"><div className="cook-progress"><span>Step {step+1} of {recipe.steps.length}</span><div><i style={{width:`${((step+1)/recipe.steps.length)*100}%`}}/></div></div><span className="step-number">{step+1}</span><h1>{current.instruction}</h1>{current.timerMinutes&&<button className="timer-button" onClick={()=>setSeconds(current.timerMinutes!*60)}><Clock/>{seconds?`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,"0")}`:`Start ${current.timerMinutes} min timer`}</button>}<div className="cook-actions"><button className="secondary" disabled={step===0} onClick={()=>setStep(step-1)}><ChevronLeft/>Previous</button><button className="primary" disabled={step===recipe.steps.length-1} onClick={()=>setStep(step+1)}>Next step<ChevronRight/></button></div></div></section>;
}
function NavigateBack(){return <section className="section page empty"><h1>Recipe not found</h1><Link className="primary" to="/recipes">Back to recipes</Link></section>}
