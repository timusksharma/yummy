# Yummy Food Delivery Delivery Tickets

Status values: `TODO`, `IN PROGRESS`, `DONE`.

| Ticket | Work | Acceptance criteria | Status |
|---|---|---|---|
| DEL-001 | Food delivery domain models, mock dataset & storage | Comprehensive Indian food dataset with ₹ pricing, restaurants, menus, offers, addresses, and order history | DONE |
| DEL-002 | Global state management (Cart, Location, Orders, Delivery) | React context with local storage persistence for cart items, selected location, active order, coupons, and favorites | DONE |
| DEL-003 | App shell & Navigation (Desktop & Mobile) | Sticky topbar with delivery location selector, global search, live cart badge, and app-like mobile bottom nav | DONE |
| DEL-004 | Homepage & Food Discovery Experience | Food delivery hero, "What's on your mind?" circular categories, promotional offer carousel, and curated restaurant feeds | DONE |
| DEL-005 | Restaurant Listing, Search & Filter Engine | Multi-criteria filters (Pure Veg, 4.0+ rating, <30 mins, Cuisines), sorting options, and unified dish/restaurant search | DONE |
| DEL-006 | Restaurant Detail & Interactive Menu | Restaurant banner, category jump tabs, Veg/Non-Veg indicators, Bestseller badges, and dish cards with ADD action | DONE |
| DEL-007 | Dish Customization & Cart Management | Modal for sizes, crusts, toppings, special notes, ADD into `− 1 +` counter, and floating mobile cart bar | DONE |
| DEL-008 | Full Cart Page & Coupon Engine | Itemized cart, restaurant-switch protection, coupon codes (`YUMMY50`, `FREEDEL`, `SAVE125`), and detailed ₹ bill breakdown | DONE |
| DEL-009 | Checkout, Address Selection & Payment | Delivery address selection (Home/Work/New address modal), payment methods (UPI, GPay, Cards, COD), and Place Order flow | DONE |
| DEL-010 | Live Order Tracking & Delivery Simulation | Animated order progress (Confirmed → Preparing → Out for Delivery → Delivered), simulated delivery map, and rider details | DONE |
| DEL-011 | Orders History, 1-Click Reorder & Review | Active & past orders list, 1-click reorder rebuilding the cart, and 5-star order rating modal | DONE |
| DEL-012 | Favorites, User Profile & Notification Center | Saved restaurants and dishes, address manager, notification drawer, and demo account settings | DONE |
| DEL-013 | Quality Assurance, Unit Tests, Typecheck & Build | Updated Vitest unit tests for delivery cart/pricing/coupons, strict TypeScript passing, ESLint clean, and production build passing | DONE |

## Delivery Strategy & Flow
```text
Choose Location → Discover Food & Offers → Find Restaurant → Explore Menu & Customize → Add to Cart → Apply Coupon → Select Address & Payment → Place Order → Live Tracking Simulation → Rate & Review
```

## Validation Log
- TypeScript: passed (`npm run typecheck` with 0 errors).
- ESLint: passed (`npm run lint` with 0 warnings).
- Automated tests: 9 passed (`npm test`).
- Production build: passed (`npm run build` in 1.10s).
- Local dev server: running at `http://localhost:8080/`.
