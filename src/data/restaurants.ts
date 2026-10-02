import type { CuisineType, CustomizationGroup, Restaurant } from "../domain/delivery";
import heroImg from "../assets/hero-food.jpg";
import mealImg from "../assets/meal-kit.jpg";
import bowlImg from "../assets/smoothie-bowl.jpg";
import ballsImg from "../assets/protein-balls.jpg";

export const foodCategories: { id: string; name: string; cuisine: CuisineType; image: string }[] = [
  { id: "cat-biryani", name: "Biryani", cuisine: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80" },
  { id: "cat-pizza", name: "Pizza", cuisine: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop&q=80" },
  { id: "cat-burgers", name: "Burgers", cuisine: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80" },
  { id: "cat-north-indian", name: "North Indian", cuisine: "North Indian", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&auto=format&fit=crop&q=80" },
  { id: "cat-south-indian", name: "South Indian", cuisine: "South Indian", image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=300&auto=format&fit=crop&q=80" },
  { id: "cat-chinese", name: "Chinese & Momos", cuisine: "Chinese", image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=300&auto=format&fit=crop&q=80" },
  { id: "cat-rolls", name: "Rolls & Wraps", cuisine: "Rolls & Wraps", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&auto=format&fit=crop&q=80" },
  { id: "cat-healthy", name: "Healthy & Salads", cuisine: "Healthy & Salads", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=80" },
  { id: "cat-desserts", name: "Cakes & Desserts", cuisine: "Desserts", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&auto=format&fit=crop&q=80" },
  { id: "cat-beverages", name: "Chai & Shakes", cuisine: "Beverages", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300&auto=format&fit=crop&q=80" }
];

const pizzaCustomizations: CustomizationGroup[] = [
  {
    id: "size",
    title: "Choose Size",
    required: true,
    options: [
      { id: "regular", name: "Regular (7 inch)", extraPrice: 0 },
      { id: "medium", name: "Medium (10 inch)", extraPrice: 150 },
      { id: "large", name: "Large (12 inch)", extraPrice: 280 }
    ]
  },
  {
    id: "crust",
    title: "Choose Crust",
    required: true,
    options: [
      { id: "classic", name: "Classic Pan Crust", extraPrice: 0 },
      { id: "thin", name: "Crispy Thin Crust", extraPrice: 30 },
      { id: "cheese-burst", name: "Gooey Cheese Burst", extraPrice: 85 }
    ]
  },
  {
    id: "add-ons",
    title: "Add Extra Toppings",
    required: false,
    options: [
      { id: "extra-cheese", name: "Extra Mozzarella", extraPrice: 50 },
      { id: "jalapenos", name: "Pickled Jalapeños", extraPrice: 35 },
      { id: "black-olives", name: "Spanish Black Olives", extraPrice: 40 }
    ]
  }
];

const biryaniCustomizations: CustomizationGroup[] = [
  {
    id: "portion",
    title: "Choose Portion",
    required: true,
    options: [
      { id: "regular", name: "Regular (Serves 1-2)", extraPrice: 0 },
      { id: "jumbo", name: "Jumbo Pot (Serves 3-4)", extraPrice: 220 }
    ]
  },
  {
    id: "spice",
    title: "Spice Level",
    required: true,
    options: [
      { id: "mild", name: "Medium Masala", extraPrice: 0 },
      { id: "spicy", name: "Andhra Hot Style", extraPrice: 0 }
    ]
  },
  {
    id: "sides",
    title: "Extra Accompaniments",
    required: false,
    options: [
      { id: "extra-raita", name: "Burani Raita", extraPrice: 35 },
      { id: "salan", name: "Hyderabadi Mirchi Ka Salan", extraPrice: 45 },
      { id: "boiled-egg", name: "Extra Boiled Egg (2 pcs)", extraPrice: 40 }
    ]
  }
];

const burgerCustomizations: CustomizationGroup[] = [
  {
    id: "patty",
    title: "Cheese & Patty Options",
    required: true,
    options: [
      { id: "single", name: "Single Patty with Cheese", extraPrice: 0 },
      { id: "double", name: "Double Patty Double Cheese", extraPrice: 80 }
    ]
  },
  {
    id: "meal-combo",
    title: "Make it a Meal?",
    required: false,
    options: [
      { id: "peri-peri-fries", name: "Peri Peri Fries + Cold Drink (300ml)", extraPrice: 99 },
      { id: "cheese-fries", name: "Loaded Cheesy Fries + Shake", extraPrice: 149 }
    ]
  }
];

export const restaurants: Restaurant[] = [
  {
    id: "rest-1",
    name: "Bawarchi Royal Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Biryani", "North Indian", "Street Food"],
    rating: 4.6,
    reviewCount: 3820,
    deliveryTimeMinutes: 28,
    distanceKm: 2.4,
    costForTwo: 450,
    isVeg: false,
    isPromoted: true,
    offerText: "50% OFF up to ₹100",
    address: "100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru",
    openingHours: "11:00 AM - 11:30 PM",
    menu: [
      {
        id: "b-1",
        restaurantId: "rest-1",
        name: "Hyderabadi Dum Chicken Biryani",
        description: "Fragrant long-grain basmati rice layered with succulent marinated chicken, slow-cooked in dum with aromatic saffron.",
        price: 299,
        originalPrice: 360,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        isBestseller: true,
        category: "Biryani",
        customizationGroups: biryaniCustomizations
      },
      {
        id: "b-2",
        restaurantId: "rest-1",
        name: "Royal Paneer Tikka Biryani",
        description: "Fresh cottage cheese cubes marinated in tandoori spices layered with spiced basmati rice and caramelized onions.",
        price: 269,
        originalPrice: 320,
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: true,
        category: "Biryani",
        customizationGroups: biryaniCustomizations
      },
      {
        id: "b-3",
        restaurantId: "rest-1",
        name: "Mutton Dum Biryani (Nalli Gosht)",
        description: "Tender goat meat slow braised in aromatic ghee and whole spices, cooked with layered royal rice.",
        price: 399,
        originalPrice: 470,
        image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        isBestseller: false,
        category: "Biryani",
        customizationGroups: biryaniCustomizations
      },
      {
        id: "b-4",
        restaurantId: "rest-1",
        name: "Chicken 65 (Boneless)",
        description: "Crispy fried chicken tossed in spicy curd, curry leaves, and green chillies.",
        price: 249,
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        isBestseller: true,
        category: "Starters"
      },
      {
        id: "b-5",
        restaurantId: "rest-1",
        name: "Shahi Tukda with Rabdi",
        description: "Golden fried bread soaked in saffron sugar syrup and topped with thick, velvety rabdi.",
        price: 129,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: false,
        category: "Desserts"
      }
    ]
  },
  {
    id: "rest-2",
    name: "Toscano Woodfired Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Pizza", "Italian", "Desserts"],
    rating: 4.7,
    reviewCount: 2940,
    deliveryTimeMinutes: 24,
    distanceKm: 1.8,
    costForTwo: 600,
    isVeg: false,
    offerText: "Flat ₹125 OFF | SAVE125",
    address: "5th Block, Koramangala, Bengaluru",
    openingHours: "11:30 AM - 11:00 PM",
    menu: [
      {
        id: "p-1",
        restaurantId: "rest-2",
        name: "Margherita Tradizionale",
        description: "Italian San Marzano tomato base, creamy bocconcini mozzarella, fresh sweet basil and extra virgin olive oil drizzle.",
        price: 299,
        originalPrice: 350,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: true,
        category: "Pizza",
        customizationGroups: pizzaCustomizations
      },
      {
        id: "p-2",
        restaurantId: "rest-2",
        name: "Fiery Paneer & Bell Pepper",
        description: "Spicy chipotle base, charred cottage cheese cubes, roasted capsicum, red paprika, and stretchy mozzarella.",
        price: 349,
        originalPrice: 420,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: true,
        category: "Pizza",
        customizationGroups: pizzaCustomizations
      },
      {
        id: "p-3",
        restaurantId: "rest-2",
        name: "Smoked BBQ Chicken Feast",
        description: "Slow-smoked chicken chunks, barbecue drizzle, sliced red onions, and melted sharp cheddar.",
        price: 389,
        originalPrice: 450,
        image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        isBestseller: true,
        category: "Pizza",
        customizationGroups: pizzaCustomizations
      },
      {
        id: "p-4",
        restaurantId: "rest-2",
        name: "Cheesy Garlic Dough Balls",
        description: "Freshly baked herb dough rolls stuffed with mozzarella and served with spicy marinara dip.",
        price: 169,
        image: ballsImg,
        isVeg: true,
        isBestseller: false,
        category: "Sides"
      },
      {
        id: "p-5",
        restaurantId: "rest-2",
        name: "Belgian Chocolate Lava Cake",
        description: "Warm molten chocolate cake with gooey, decadent liquid center.",
        price: 139,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: true,
        category: "Desserts"
      }
    ]
  },
  {
    id: "rest-3",
    name: "Burger Craft & Co.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Burgers", "Beverages", "Street Food"],
    rating: 4.5,
    reviewCount: 2180,
    deliveryTimeMinutes: 20,
    distanceKm: 1.2,
    costForTwo: 350,
    isVeg: false,
    offerText: "Free Delivery above ₹149",
    address: "Church Street, MG Road, Bengaluru",
    openingHours: "11:00 AM - 12:00 AM",
    menu: [
      {
        id: "burg-1",
        restaurantId: "rest-3",
        name: "Crispy Paneer Makhani Burger",
        description: "Crispy panko-crumbed paneer patty lathered in creamy makhani gravy, sliced pickles and iceberg lettuce in brioche bun.",
        price: 199,
        originalPrice: 240,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: true,
        category: "Burgers",
        customizationGroups: burgerCustomizations
      },
      {
        id: "burg-2",
        restaurantId: "rest-3",
        name: "The Classic Crunchy Chicken Burger",
        description: "Double-fried crunchy buttermilk chicken breast, garlic mayonnaise, cheddar cheese, and signature tangy slaw.",
        price: 239,
        originalPrice: 280,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        isBestseller: true,
        category: "Burgers",
        customizationGroups: burgerCustomizations
      },
      {
        id: "burg-3",
        restaurantId: "rest-3",
        name: "Peri Peri Crinkle Cut Fries",
        description: "Golden crinkle cut french fries dusted with our fiery African bird's eye chili seasoning.",
        price: 119,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: false,
        category: "Sides"
      },
      {
        id: "burg-4",
        restaurantId: "rest-3",
        name: "Thick Belgian Chocolate Shake",
        description: "Creamy, rich milkshake blended with dark chocolate and ice cream.",
        price: 159,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: true,
        category: "Beverages"
      }
    ]
  },
  {
    id: "rest-4",
    name: "Sagar Ratna (Pure Veg)",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&auto=format&fit=crop&q=80",
    cuisines: ["South Indian", "North Indian"],
    rating: 4.8,
    reviewCount: 4500,
    deliveryTimeMinutes: 22,
    distanceKm: 2.1,
    costForTwo: 300,
    isVeg: true,
    isPromoted: true,
    offerText: "20% OFF on all items",
    address: "CMH Road, Indiranagar, Bengaluru",
    openingHours: "7:00 AM - 10:30 PM",
    menu: [
      {
        id: "sr-1",
        restaurantId: "rest-4",
        name: "Ghee Roast Masala Dosa",
        description: "Crispy golden crepe roasted in pure desi cow ghee, filled with spiced potato palya, served with 3 chutneys & sambar.",
        price: 135,
        originalPrice: 160,
        image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: true,
        category: "South Indian"
      },
      {
        id: "sr-2",
        restaurantId: "rest-4",
        name: "Steamed Button Idli & Vada Combo",
        description: "Two pillow-soft steamed idlis and one crispy medu vada with hot aromatic lentil sambar and fresh coconut chutney.",
        price: 110,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: true,
        category: "South Indian"
      },
      {
        id: "sr-3",
        restaurantId: "rest-4",
        name: "Bisi Bele Bath with Boondi",
        description: "Karnataka specialty rice cooked with lentils, mixed vegetables, tamarind, and aromatic spice blend, served with crisp boondi.",
        price: 140,
        image: heroImg,
        isVeg: true,
        isBestseller: false,
        category: "South Indian"
      },
      {
        id: "sr-4",
        restaurantId: "rest-4",
        name: "Filter Coffee (Madras Kaapi)",
        description: "Authentic chicory filter coffee frothed with creamy boiling milk.",
        price: 55,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: true,
        category: "Beverages"
      }
    ]
  },
  {
    id: "rest-5",
    name: "Punjab Grill & Dhaba",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80",
    cuisines: ["North Indian", "Biryani"],
    rating: 4.6,
    reviewCount: 3100,
    deliveryTimeMinutes: 30,
    distanceKm: 3.1,
    costForTwo: 550,
    isVeg: false,
    offerText: "50% OFF up to ₹100",
    address: "Outer Ring Road, Bellandur, Bengaluru",
    openingHours: "12:00 PM - 11:30 PM",
    menu: [
      {
        id: "pg-1",
        restaurantId: "rest-5",
        name: "Dal Makhani (Grandma's Style)",
        description: "Black lentils slow-cooked overnight with churned butter and rich cream on charcoal embers.",
        price: 240,
        originalPrice: 280,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: true,
        category: "Main Course"
      },
      {
        id: "pg-2",
        restaurantId: "rest-5",
        name: "Butter Chicken Delhi 6",
        description: "Tandoori chicken simmered in silky tomato, cashew and fenugreek gravy, finished with dairy cream.",
        price: 320,
        originalPrice: 380,
        image: mealImg,
        isVeg: false,
        isBestseller: true,
        category: "Main Course"
      },
      {
        id: "pg-3",
        restaurantId: "rest-5",
        name: "Butter Garlic Naan (2 pcs)",
        description: "Leavened flatbread brushed with garlic and butter, charred in clay oven.",
        price: 90,
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: false,
        category: "Breads"
      },
      {
        id: "pg-4",
        restaurantId: "rest-5",
        name: "Paneer Tikka Angara",
        description: "Marinated cubes of fresh paneer skewered with peppers and charred in clay tandoor.",
        price: 250,
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: true,
        category: "Starters"
      }
    ]
  },
  {
    id: "rest-6",
    name: "Dragon Express Chinese",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Chinese", "Street Food"],
    rating: 4.4,
    reviewCount: 1850,
    deliveryTimeMinutes: 25,
    distanceKm: 2.7,
    costForTwo: 400,
    isVeg: false,
    offerText: "Free Delivery above ₹149",
    address: "Residency Road, Shanthala Nagar, Bengaluru",
    openingHours: "11:30 AM - 11:00 PM",
    menu: [
      {
        id: "dx-1",
        restaurantId: "rest-6",
        name: "Steamed Chicken Momos (6 pcs)",
        description: "Delicate wrappers filled with seasoned minced chicken, herbs, served with fiery spicy red garlic chutney.",
        price: 159,
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        isBestseller: true,
        category: "Momos & Starters"
      },
      {
        id: "dx-2",
        restaurantId: "rest-6",
        name: "Veg Hakka Noodles Wok Tossed",
        description: "Stir-fried noodles with crunchy julienned veggies, scallions, and light soya garlic sauce.",
        price: 179,
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: true,
        category: "Main Course"
      },
      {
        id: "dx-3",
        restaurantId: "rest-6",
        name: "Crispy Chilli Paneer Dry",
        description: "Batter-fried paneer cubes wok tossed with spring onions, capsicum, and chilli bean paste.",
        price: 219,
        image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: true,
        category: "Momos & Starters"
      },
      {
        id: "dx-4",
        restaurantId: "rest-6",
        name: "Schezwan Fried Rice (Chicken)",
        description: "Wok toasted fragrant rice with chicken shreds and house-made bold Schezwan sauce.",
        price: 219,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        isBestseller: false,
        category: "Main Course"
      }
    ]
  },
  {
    id: "rest-7",
    name: "Rolls King & Shawarma",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Rolls & Wraps", "Street Food"],
    rating: 4.5,
    reviewCount: 1670,
    deliveryTimeMinutes: 18,
    distanceKm: 1.5,
    costForTwo: 280,
    isVeg: false,
    offerText: "Combos starting @ ₹149",
    address: "Koramangala 1st Block, Bengaluru",
    openingHours: "11:00 AM - 1:00 AM",
    menu: [
      {
        id: "rk-1",
        restaurantId: "rest-7",
        name: "Double Egg Double Chicken Roll",
        description: "Flaky paratha layered with two whipped eggs, stuffed with juicy grilled spiced chicken and crisp pickled onions.",
        price: 189,
        originalPrice: 220,
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        isBestseller: true,
        category: "Rolls & Wraps"
      },
      {
        id: "rk-2",
        restaurantId: "rest-7",
        name: "Paneer Tikka Kathi Roll",
        description: "Tandoori marinated paneer rolled in flaky paratha with mint coriander chutney and crunchy peppers.",
        price: 159,
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: true,
        category: "Rolls & Wraps"
      },
      {
        id: "rk-3",
        restaurantId: "rest-7",
        name: "Lebanese Chicken Shawarma",
        description: "Shredded rotisserie chicken, homemade garlic toum sauce, french fries, and pickled cucumbers wrapped in rumali roti.",
        price: 169,
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500&auto=format&fit=crop&q=80",
        isVeg: false,
        isBestseller: true,
        category: "Rolls & Wraps"
      }
    ]
  },
  {
    id: "rest-8",
    name: "Green Bowl - Clean Eating",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Healthy & Salads", "Beverages"],
    rating: 4.8,
    reviewCount: 1420,
    deliveryTimeMinutes: 22,
    distanceKm: 2.0,
    costForTwo: 500,
    isVeg: true,
    isPromoted: true,
    offerText: "Flat ₹125 OFF | SAVE125",
    address: "HSR Layout, Sector 3, Bengaluru",
    openingHours: "8:00 AM - 10:00 PM",
    menu: [
      {
        id: "gb-1",
        restaurantId: "rest-8",
        name: "Mediterranean Quinoa Power Bowl",
        description: "Organic tricolor quinoa, herby baked chickpeas, cherry tomatoes, kalamata olives, cucumber, feta cheese, and tahini dressing.",
        price: 289,
        originalPrice: 340,
        image: bowlImg,
        isVeg: true,
        isBestseller: true,
        category: "Healthy & Salads"
      },
      {
        id: "gb-2",
        restaurantId: "rest-8",
        name: "Avocado & Edamame Crunch Salad",
        description: "Hass avocado, steamed edamame, baby spinach, roasted pumpkin seeds, and citrus honey vinaigrette.",
        price: 319,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: true,
        category: "Healthy & Salads"
      },
      {
        id: "gb-3",
        restaurantId: "rest-8",
        name: "Detox Green Cold Pressed Juice",
        description: "Cold-pressed cucumber, green apple, spinach, celery, mint, and lemon with zero added sugar.",
        price: 149,
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop&q=80",
        isVeg: true,
        isBestseller: false,
        category: "Beverages"
      }
    ]
  }
];
