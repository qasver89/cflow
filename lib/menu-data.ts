import { MenuItem } from "./types";

export const CATEGORIES: MenuItem["category"][] = [
  "Coffee",
  "Tea",
  "Burgers",
  "Pizza",
  "Desserts",
  "Drinks",
];

export const MENU_ITEMS: MenuItem[] = [
  // Coffee
  {
    id: "cof-01",
    name: "Ninnes Espresso",
    description: "Double shot, dark roast, pulled fresh per order.",
    price: 4.5,
    category: "Coffee",
    image:
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop",
    prepTime: 4,
    popular: true,
    vegetarian: true,
  },
  {
    id: "cof-02",
    name: "Oat Milk Latte",
    description: "Espresso, steamed oat milk, light foam.",
    price: 5.5,
    category: "Coffee",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop",
    prepTime: 5,
    vegetarian: true,
  },
  {
    id: "cof-03",
    name: "Iced Caramel Mocha",
    description: "Espresso, chocolate, caramel drizzle, cold milk.",
    price: 6.0,
    category: "Coffee",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop",
    prepTime: 5,
    popular: true,
    vegetarian: true,
  },
  // Tea
  {
    id: "tea-01",
    name: "Karak Chai",
    description: "Strong black tea simmered with milk and cardamom.",
    price: 3.5,
    category: "Tea",
    image:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=800&auto=format&fit=crop",
    prepTime: 6,
    popular: true,
    vegetarian: true,
  },
  {
    id: "tea-02",
    name: "Peach Iced Tea",
    description: "Cold-brewed black tea, fresh peach, mint.",
    price: 4.0,
    category: "Tea",
    image:
      "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?q=80&w=800&auto=format&fit=crop",
    prepTime: 4,
    vegetarian: true,
  },
  {
    id: "tea-03",
    name: "Green Tea",
    description: "Light, grassy loose-leaf green tea.",
    price: 3.0,
    category: "Tea",
    image:
      "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=800&auto=format&fit=crop",
    prepTime: 4,
    vegetarian: true,
  },
  // Burgers
  {
    id: "bur-01",
    name: "Trio Smash Burger",
    description: "Double smash patty, cheddar, house sauce, brioche bun.",
    price: 8.5,
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
    prepTime: 14,
    popular: true,
  },
  {
    id: "bur-02",
    name: "Crispy Chicken Burger",
    description: "Buttermilk-fried chicken thigh, slaw, spicy mayo.",
    price: 8.0,
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop",
    prepTime: 13,
  },
  {
    id: "bur-03",
    name: "Garden Veggie Burger",
    description: "Grilled chickpea patty, avocado, roasted pepper.",
    price: 7.5,
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=800&auto=format&fit=crop",
    prepTime: 12,
    vegetarian: true,
  },
  // Pizza
  {
    id: "piz-01",
    name: "Margherita Pizza",
    description: "San Marzano tomato, fior di latte, fresh basil.",
    price: 10.5,
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop",
    prepTime: 16,
    popular: true,
    vegetarian: true,
  },
  {
    id: "piz-02",
    name: "Pepperoni Pizza",
    description: "Double pepperoni, mozzarella, chili honey drizzle.",
    price: 12.0,
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop",
    prepTime: 16,
    popular: true,
  },
  {
    id: "piz-03",
    name: "Four Cheese Pizza",
    description: "Mozzarella, gorgonzola, parmesan, ricotta.",
    price: 11.5,
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    prepTime: 16,
    vegetarian: true,
  },
  // Desserts
  {
    id: "des-01",
    name: "Dark Chocolate Torte",
    description: "70% single-origin cacao, sea salt.",
    price: 6.5,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop",
    prepTime: 3,
    popular: true,
    vegetarian: true,
  },
  {
    id: "des-02",
    name: "New York Cheesecake",
    description: "Classic baked cheesecake, berry compote.",
    price: 6.0,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=800&auto=format&fit=crop",
    prepTime: 3,
    vegetarian: true,
  },
  {
    id: "des-03",
    name: "Churros & Dip",
    description: "Cinnamon sugar churros, warm chocolate dip.",
    price: 5.5,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1541599468348-e96984315921?q=80&w=800&auto=format&fit=crop",
    prepTime: 8,
    vegetarian: true,
  },
  // Drinks
  {
    id: "dri-01",
    name: "Cascara Fizz",
    description: "Coffee cherry tea, soda, citrus.",
    price: 5.0,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop",
    prepTime: 4,
    vegetarian: true,
  },
  {
    id: "dri-02",
    name: "Fresh Lemonade",
    description: "Hand-squeezed lemon, mint, soda water.",
    price: 4.0,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=800&auto=format&fit=crop",
    prepTime: 3,
    popular: true,
    vegetarian: true,
  },
  {
    id: "dri-03",
    name: "Mango Smoothie",
    description: "Blended mango, yogurt, honey.",
    price: 5.5,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=800&auto=format&fit=crop",
    prepTime: 5,
    vegetarian: true,
  },
];
