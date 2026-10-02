# Yummy --- Food Delivery Web Application TODO

> **Goal:** Completely redesign Yummy from a cooking/recipe application
> into a modern food delivery experience.
>
> **Core Flow:** Location → Discover Food → Restaurant → Menu → Add to
> Cart → Checkout → Payment → Track Order → Rate Order

## Phase 1 --- Product Redesign

-   [ ] Remove recipe-first/cooking-first product positioning
-   [ ] Remove Recipe Generator
-   [ ] Remove "What Can I Cook?"
-   [ ] Remove Meal Planner
-   [ ] Remove Cooking Assistant
-   [ ] Remove Ingredient Scanner
-   [ ] Remove Grocery List
-   [ ] Remove Nutrition Dashboard
-   [ ] Remove Kitchen Tools
-   [ ] Remove Cooking Timer
-   [ ] Remove Serving Calculator
-   [ ] Remove Ingredient Substitution features
-   [ ] Remove Recipe Collections and Cooking Guides
-   [ ] Update all copy to food ordering/delivery messaging
-   [ ] Keep the **Yummy** brand name
-   [ ] Establish a consistent food-delivery design system
-   [ ] Use ₹ pricing and India-focused demo content

## Phase 2 --- Global Layout & Navigation

-   [ ] Create sticky desktop navbar
-   [ ] Add Yummy logo
-   [ ] Add Home navigation
-   [ ] Add Restaurants navigation
-   [ ] Add Offers navigation
-   [ ] Add Orders navigation
-   [ ] Add location selector
-   [ ] Add global search
-   [ ] Add Favorites icon
-   [ ] Add Cart icon with live item count
-   [ ] Add Profile menu
-   [ ] Create mobile bottom navigation
-   [ ] Add Home, Search, Orders, Cart, and Profile mobile tabs
-   [ ] Make layouts fully responsive

## Phase 3 --- Location Experience

-   [ ] Add "Delivering to" location control
-   [ ] Create location selection modal/drawer
-   [ ] Add address search UI
-   [ ] Add mock current-location option
-   [ ] Support Home address
-   [ ] Support Work address
-   [ ] Support Other addresses
-   [ ] Add new address form
-   [ ] Persist selected location in frontend state
-   [ ] Create location-not-supported state

## Phase 4 --- Homepage

-   [ ] Replace existing hero with food-delivery hero
-   [ ] Add headline such as "Hungry? Your favourite food is just a few
    clicks away."
-   [ ] Add restaurant/dish/cuisine search field
-   [ ] Add food-focused hero imagery
-   [ ] Add "What's on your mind?" category section
-   [ ] Add Pizza category
-   [ ] Add Biryani category
-   [ ] Add Burgers category
-   [ ] Add Momos category
-   [ ] Add Chicken category
-   [ ] Add North Indian category
-   [ ] Add South Indian category
-   [ ] Add Chinese category
-   [ ] Add Rolls category
-   [ ] Add Pasta category
-   [ ] Add Healthy category
-   [ ] Add Cakes/Desserts category
-   [ ] Add Beverages category
-   [ ] Make categories horizontally scrollable on smaller screens

## Phase 5 --- Offers & Promotions

-   [ ] Add promotional banner carousel
-   [ ] Add first-order discount banner
-   [ ] Add free-delivery banner
-   [ ] Add percentage-discount banner
-   [ ] Add late-night delivery promotion
-   [ ] Display coupon codes
-   [ ] Add "Order Now" interactions
-   [ ] Create dedicated Offers page
-   [ ] Add Restaurant Offers section
-   [ ] Add Free Delivery offers
-   [ ] Add Bank Offers
-   [ ] Add UPI Offers
-   [ ] Add First Order Offers
-   [ ] Add Yummy Exclusive Deals

## Phase 6 --- Restaurant Discovery

-   [ ] Create "Restaurants Near You" section
-   [ ] Create reusable restaurant card component
-   [ ] Show restaurant cover image
-   [ ] Show restaurant name
-   [ ] Show cuisines
-   [ ] Show rating and review count
-   [ ] Show estimated delivery time
-   [ ] Show distance
-   [ ] Show approximate cost for two
-   [ ] Show delivery fee
-   [ ] Show current offer
-   [ ] Add favorite/heart control
-   [ ] Add Pure Veg indicator where relevant
-   [ ] Add Promoted label where relevant
-   [ ] Add Top Rated Near You section
-   [ ] Add Fast Delivery section
-   [ ] Add Budget Friendly section
-   [ ] Add Trending Restaurants section
-   [ ] Add New on Yummy section
-   [ ] Add Pure Veg section
-   [ ] Add Premium Dining section
-   [ ] Add Late Night Delivery section

## Phase 7 --- Restaurant Listing & Filters

-   [ ] Create restaurant listing page
-   [ ] Add sticky filter bar
-   [ ] Add Rating 4.0+ filter
-   [ ] Add Pure Veg filter
-   [ ] Add Under 30 Min filter
-   [ ] Add Offers filter
-   [ ] Add Free Delivery filter
-   [ ] Add Price filter
-   [ ] Add Cuisine filter
-   [ ] Add Distance filter
-   [ ] Add Open Now filter
-   [ ] Add Recommended sorting
-   [ ] Add Rating sorting
-   [ ] Add Delivery Time sorting
-   [ ] Add Distance sorting
-   [ ] Add Price Low to High sorting
-   [ ] Add Price High to Low sorting
-   [ ] Show active filters as removable chips
-   [ ] Add clear-all-filters action

## Phase 8 --- Search

-   [ ] Create dedicated search experience
-   [ ] Search restaurants
-   [ ] Search dishes
-   [ ] Search cuisines
-   [ ] Add autocomplete suggestions
-   [ ] Add recent searches
-   [ ] Add trending searches
-   [ ] Group results into Dishes and Restaurants
-   [ ] Add clear search action
-   [ ] Create no-results state
-   [ ] Add search loading/skeleton state

## Phase 9 --- Restaurant Detail Page

-   [ ] Create restaurant detail page
-   [ ] Add restaurant cover image
-   [ ] Add restaurant name and cuisine information
-   [ ] Add rating and review count
-   [ ] Add address
-   [ ] Add distance
-   [ ] Add estimated delivery time
-   [ ] Add price for two
-   [ ] Add opening hours
-   [ ] Add delivery fee
-   [ ] Add restaurant information
-   [ ] Add restaurant offer cards
-   [ ] Add favorite restaurant action
-   [ ] Add Veg Only toggle

## Phase 10 --- Restaurant Menu

-   [ ] Add Recommended menu section
-   [ ] Add Bestsellers
-   [ ] Add Starters
-   [ ] Add Main Course
-   [ ] Add Biryani
-   [ ] Add Rice
-   [ ] Add Indian Breads
-   [ ] Add Chinese
-   [ ] Add Combos
-   [ ] Add Desserts
-   [ ] Add Beverages
-   [ ] Create sticky menu-category navigation
-   [ ] Add menu search
-   [ ] Create reusable food item card
-   [ ] Show veg/non-veg indicator
-   [ ] Show Bestseller badge
-   [ ] Show dish name
-   [ ] Show dish rating/review count
-   [ ] Show description
-   [ ] Show regular and discounted price
-   [ ] Show food image
-   [ ] Show Customizable indicator
-   [ ] Add ADD button

## Phase 11 --- Cart Interactions

-   [ ] Make ADD button functional
-   [ ] Change ADD into `− 1 +` after adding
-   [ ] Increase item quantity
-   [ ] Decrease item quantity
-   [ ] Remove item at zero quantity
-   [ ] Update cart count globally
-   [ ] Update cart total instantly
-   [ ] Add subtle add-to-cart animation
-   [ ] Create floating/sticky cart summary
-   [ ] Show item count and total
-   [ ] Add View Cart action

## Phase 12 --- Food Customization

-   [ ] Create customization modal/drawer
-   [ ] Support required options
-   [ ] Support optional add-ons
-   [ ] Add size selection
-   [ ] Add crust/variant selection
-   [ ] Add toppings
-   [ ] Add extras
-   [ ] Update price based on customization
-   [ ] Add special instructions field
-   [ ] Validate required choices
-   [ ] Add customized item to cart

## Phase 13 --- Cart Page

-   [ ] Create full cart page
-   [ ] Show restaurant information
-   [ ] Show selected dishes
-   [ ] Show customizations
-   [ ] Add quantity controls
-   [ ] Add remove-item action
-   [ ] Add "Add More Items"
-   [ ] Add restaurant/cooking instructions
-   [ ] Add "Complete Your Meal" recommendations
-   [ ] Add quick add-ons for drinks, sides, and desserts
-   [ ] Prevent mixing restaurants or show restaurant-switch warning

## Phase 14 --- Coupons & Bill

-   [ ] Create Apply Coupon UI
-   [ ] Add YUMMY50 demo coupon
-   [ ] Add FREEDEL demo coupon
-   [ ] Add SAVE125 demo coupon
-   [ ] Validate coupon eligibility
-   [ ] Apply coupon
-   [ ] Remove coupon
-   [ ] Recalculate total immediately
-   [ ] Show Item Total
-   [ ] Show Delivery Fee
-   [ ] Show Platform Fee
-   [ ] Show GST & Restaurant Charges
-   [ ] Show Discount
-   [ ] Show final "To Pay" amount

## Phase 15 --- Checkout & Address

-   [ ] Create checkout page
-   [ ] Show cart/order summary
-   [ ] Create delivery-address selection
-   [ ] Add Home address card
-   [ ] Add Work address card
-   [ ] Add Other address card
-   [ ] Add "Deliver Here" action
-   [ ] Add new-address form
-   [ ] Allow editing addresses
-   [ ] Allow deleting mock addresses
-   [ ] Display estimated delivery time

## Phase 16 --- Payment

-   [ ] Create payment page
-   [ ] Add UPI payment section
-   [ ] Add Google Pay option
-   [ ] Add PhonePe option
-   [ ] Add Paytm option
-   [ ] Add Other UPI option
-   [ ] Add Credit Card option
-   [ ] Add Debit Card option
-   [ ] Add Wallets section
-   [ ] Add Cash on Delivery where applicable
-   [ ] Create mock payment processing state
-   [ ] Create payment success state
-   [ ] Create payment failed state
-   [ ] Add retry payment action

## Phase 17 --- Place Order

-   [ ] Show final restaurant summary
-   [ ] Show ordered items
-   [ ] Show selected address
-   [ ] Show payment method
-   [ ] Show bill summary
-   [ ] Show estimated delivery time
-   [ ] Add prominent Place Order button
-   [ ] Simulate order creation
-   [ ] Clear active cart after successful order

## Phase 18 --- Order Confirmation

-   [ ] Create Order Confirmed page
-   [ ] Display order ID
-   [ ] Display restaurant
-   [ ] Display ordered items
-   [ ] Display amount paid
-   [ ] Display delivery address
-   [ ] Display estimated arrival
-   [ ] Add Track Order CTA

## Phase 19 --- Live Order Tracking

-   [ ] Create order tracking page
-   [ ] Add Order Confirmed state
-   [ ] Add Restaurant Accepted state
-   [ ] Add Preparing Food state
-   [ ] Add Delivery Partner Assigned state
-   [ ] Add Order Picked Up state
-   [ ] Add On the Way state
-   [ ] Add Delivered state
-   [ ] Animate demo order progress
-   [ ] Add estimated arrival countdown/state
-   [ ] Create simulated delivery map UI
-   [ ] Show restaurant marker
-   [ ] Show delivery partner marker
-   [ ] Show customer marker
-   [ ] Clearly treat map/tracking as demo data

## Phase 20 --- Delivery Partner

-   [ ] Add delivery partner card
-   [ ] Show profile image
-   [ ] Show name
-   [ ] Show rating
-   [ ] Show vehicle information
-   [ ] Add mock Call action
-   [ ] Add mock Message interaction

## Phase 21 --- Orders

-   [ ] Create Your Orders page
-   [ ] Add Active tab
-   [ ] Add Past Orders tab
-   [ ] Add Cancelled tab
-   [ ] Show restaurant
-   [ ] Show ordered items
-   [ ] Show order date
-   [ ] Show total price
-   [ ] Show order status
-   [ ] Add View Details
-   [ ] Add Reorder
-   [ ] Add Rate Order
-   [ ] Make Reorder rebuild the cart
-   [ ] Handle unavailable reordered items

## Phase 22 --- Ratings & Reviews

-   [ ] Add post-delivery rating prompt
-   [ ] Add 1--5 star rating
-   [ ] Add Food rating
-   [ ] Add Restaurant rating
-   [ ] Add Delivery rating
-   [ ] Add written review field
-   [ ] Create restaurant reviews section
-   [ ] Show overall rating
-   [ ] Show rating distribution
-   [ ] Show customer comments
-   [ ] Add demo customer food photos
-   [ ] Add Recent/Helpful review sorting

## Phase 23 --- Favorites

-   [ ] Create Favorites page
-   [ ] Add Restaurants tab
-   [ ] Add Dishes tab
-   [ ] Allow restaurant favorite/unfavorite
-   [ ] Allow dish favorite/unfavorite
-   [ ] Add heart micro-animation
-   [ ] Create empty favorites state

## Phase 24 --- User Profile

-   [ ] Create profile page
-   [ ] Add Personal Information
-   [ ] Add Saved Addresses
-   [ ] Add Payment Methods
-   [ ] Link Your Orders
-   [ ] Link Favorites
-   [ ] Link Offers & Coupons
-   [ ] Add Notifications settings
-   [ ] Add Help & Support
-   [ ] Add general Settings
-   [ ] Add Logout demo action

## Phase 25 --- Notifications

-   [ ] Create notification center
-   [ ] Add order updates
-   [ ] Add delivery updates
-   [ ] Add offer notifications
-   [ ] Add restaurant promotions
-   [ ] Add payment updates
-   [ ] Add read/unread state
-   [ ] Add mark-all-as-read action

## Phase 26 --- Empty, Error & Loading States

-   [ ] Design empty cart state
-   [ ] Design no favorites state
-   [ ] Design no orders state
-   [ ] Design no search results state
-   [ ] Add Restaurant Closed state
-   [ ] Add Dish Unavailable state
-   [ ] Add Delivery Unavailable state
-   [ ] Add Payment Failed state
-   [ ] Add Location Not Supported state
-   [ ] Add Order Cancelled state
-   [ ] Add Network Error state
-   [ ] Add appropriate retry/recovery actions
-   [ ] Add restaurant-card skeletons
-   [ ] Add menu-item skeletons
-   [ ] Add search skeletons
-   [ ] Add order skeletons
-   [ ] Add restaurant-detail skeletons

## Phase 27 --- Responsive UX

-   [ ] Optimize for desktop
-   [ ] Optimize for tablet
-   [ ] Optimize for mobile
-   [ ] Use 3--4 restaurant cards per row where appropriate on desktop
-   [ ] Use single-column restaurant feed on mobile
-   [ ] Make filter UI mobile-friendly
-   [ ] Use sticky menu/cart areas intelligently on desktop
-   [ ] Use sticky cart CTA above mobile bottom navigation
-   [ ] Ensure touch-friendly controls
-   [ ] Test at common mobile widths
-   [ ] Avoid horizontal overflow
-   [ ] Ensure modals/drawers work on small screens

## Phase 28 --- Animations & Interaction Polish

-   [ ] Add restaurant card hover effects
-   [ ] Add subtle food image zoom
-   [ ] Add heart/favorite animation
-   [ ] Add ADD button feedback
-   [ ] Add cart count bounce
-   [ ] Animate quantity changes
-   [ ] Add coupon-applied feedback
-   [ ] Add smooth filter transitions
-   [ ] Animate search suggestions
-   [ ] Add skeleton shimmer
-   [ ] Add page transitions
-   [ ] Add order-progress animation
-   [ ] Add toast notifications
-   [ ] Add smooth modal/drawer transitions
-   [ ] Add button press feedback
-   [ ] Respect reduced-motion preferences

## Phase 29 --- Demo Data

-   [ ] Create 15--20 realistic mock restaurants
-   [ ] Create 8--15 dishes per restaurant
-   [ ] Include North Indian restaurants
-   [ ] Include South Indian restaurants
-   [ ] Include Chinese restaurants
-   [ ] Include Biryani restaurants
-   [ ] Include Pizza restaurants
-   [ ] Include Burger restaurants
-   [ ] Include Cafes
-   [ ] Include Bakeries
-   [ ] Include Dessert shops
-   [ ] Include Healthy Food restaurants
-   [ ] Add realistic ₹ prices
-   [ ] Add realistic ratings
-   [ ] Add realistic delivery times
-   [ ] Add realistic offers
-   [ ] Add realistic food descriptions
-   [ ] Add high-quality food imagery
-   [ ] Create demo order history
-   [ ] Create demo reviews
-   [ ] Create demo saved addresses and coupons

## Phase 30 --- Frontend State & Demo Logic

-   [ ] Manage selected location state
-   [ ] Manage search state
-   [ ] Manage filter/sort state
-   [ ] Manage favorites state
-   [ ] Manage cart state
-   [ ] Manage customization state
-   [ ] Manage coupon state
-   [ ] Manage checkout state
-   [ ] Manage selected address
-   [ ] Manage selected payment method
-   [ ] Manage mock order state
-   [ ] Manage order tracking state
-   [ ] Manage notification state
-   [ ] Persist useful demo state locally where appropriate
-   [ ] Ensure refreshes do not unnecessarily destroy the demo
    experience

## Phase 31 --- Accessibility & Quality

-   [ ] Add descriptive image alt text
-   [ ] Add keyboard-accessible controls
-   [ ] Add visible focus states
-   [ ] Use semantic buttons and links
-   [ ] Ensure adequate color contrast
-   [ ] Add labels to form inputs
-   [ ] Make modals keyboard accessible
-   [ ] Prevent layout shifts from images
-   [ ] Optimize image loading
-   [ ] Lazy-load non-critical imagery
-   [ ] Test all primary user flows
-   [ ] Remove dead buttons and placeholder interactions
-   [ ] Ensure every visible primary CTA works

## Final Demo Checklist

-   [ ] User can select a delivery location
-   [ ] User can browse food categories
-   [ ] User can discover restaurants
-   [ ] User can filter and sort restaurants
-   [ ] User can search for food and restaurants
-   [ ] User can open a restaurant
-   [ ] User can browse its menu
-   [ ] User can customize a dish
-   [ ] User can add/remove/update cart items
-   [ ] User can apply a coupon
-   [ ] User can select an address
-   [ ] User can select a payment method
-   [ ] User can place a simulated order
-   [ ] User sees an order confirmation
-   [ ] User can track the simulated delivery
-   [ ] User can view past orders
-   [ ] User can reorder
-   [ ] User can favorite restaurants/dishes
-   [ ] User can rate a completed order
-   [ ] Desktop experience feels purpose-built
-   [ ] Mobile experience feels app-like
-   [ ] No cooking/recipe-first UI remains
-   [ ] Yummy clearly communicates **food ordering and delivery**

------------------------------------------------------------------------

## Definition of Done

The project is complete when a portfolio visitor can experience the
complete frontend journey:

**Discover → Restaurant → Menu → Customize → Cart → Checkout → Pay →
Order → Track → Review**

Yummy should feel like a believable food-delivery product, not a static
landing page and not a cooking application.
