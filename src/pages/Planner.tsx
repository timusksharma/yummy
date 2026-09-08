import { RefreshCw, Shuffle } from "lucide-react";
import type { DietaryPreference } from "../domain/models";
import { recipes } from "../data/recipes";
import { useKitchen } from "../hooks/useKitchenState";
import { createMealPlan } from "../services/kitchen";
const preferences: DietaryPreference[]=["Balanced","Vegetarian","Vegan","High Protein","Low Carb","Gluten Free"];
export function PlannerPage(){
 const {plan,setPlan}=useKitchen(); const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
 const generate=()=>setPlan(createMealPlan(recipes,plan.preference));
 const replace=(id:string)=>setPlan({...plan,slots:plan.slots.map(s=>s.id===id?{...s,recipeId:recipes[(recipes.findIndex(r=>r.id===s.recipeId)+1)%recipes.length].id}:s)});
 return <section className="section page"><div className="page-heading row"><div><span className="kicker">A calmer week starts here</span><h1>Weekly meal planner</h1><p>Choose a style, generate your week, then swap anything you like.</p></div><button className="primary" onClick={generate}><RefreshCw/>Generate meal plan</button></div><div className="filter-row planner-filter">{preferences.map(p=><button className={plan.preference===p?"active":""} onClick={()=>setPlan({...plan,preference:p})} key={p}>{p}</button>)}</div><div className="planner-grid">{days.map(day=><article key={day}><h2>{day}</h2>{plan.slots.filter(s=>s.day===day).map(slot=>{const recipe=recipes.find(r=>r.id===slot.recipeId)!;return <div className="meal-slot" key={slot.id}><span>{slot.type}</span><img src={recipe.image} alt="" width="70" height="70"/><div><b>{recipe.title}</b><small>{recipe.time} min · {recipe.nutrition.calories} cal</small></div><button onClick={()=>replace(slot.id)} aria-label={`Replace ${slot.type} on ${day}`}><Shuffle/></button></div>})}</article>)}</div></section>
}
