export type VegKind="veg"|"non-veg"; export type OrderStatus="Confirmed"|"Preparing"|"Picked Up"|"On the Way"|"Delivered";
export interface DishOption{group:string;required?:boolean;choices:{id:string;label:string;price:number}[]}
export interface Dish{id:string;restaurantId:string;name:string;description:string;price:number;image:string;kind:VegKind;rating:number;category:string;bestseller?:boolean;options?:DishOption[]}
export interface Restaurant{id:string;name:string;image:string;cuisines:string[];rating:number;deliveryMinutes:number;priceForTwo:number;distance:number;offer?:string;deliveryFee:number;isNew?:boolean;dishes:Dish[]}
export interface CartItem{id:string;dishId:string;restaurantId:string;quantity:number;choices:{group:string;choiceId:string;label:string;price:number}[];instructions?:string}
export interface Address{id:string;label:"Home"|"Work"|"Other";line:string}
export interface Coupon{code:string;title:string;type:"percent"|"delivery";value:number;restaurantId?:string}
export interface PaymentMethod{id:string;type:"UPI"|"Card"|"Wallet"|"Cash on Delivery";label:string}
export interface Review{orderId:string;foodRating:number;deliveryRating:number;comment:string}
export interface Order{id:string;restaurantId:string;items:CartItem[];address:Address;payment:PaymentMethod;subtotal:number;deliveryFee:number;tax:number;discount:number;total:number;placedAt:number;status:OrderStatus;review?:Review}
