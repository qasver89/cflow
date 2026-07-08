export type Category =
  | "Coffee"
  | "Tea"
  | "Burgers"
  | "Pizza"
  | "Desserts"
  | "Drinks";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  prepTime: number; // minutes
  popular?: boolean;
  vegetarian?: boolean;
}

export interface CartLine {
  item: MenuItem;
  quantity: number;
}

export interface PlacedOrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  tableNumber: number;
  items: PlacedOrderItem[];
  notes: string;
  subtotal: number;
  tax: number;
  total: number;
  estimatedPrepTime: number;
  status: "Waiting for Approval" | "Preparing" | "Ready" | "Completed";
  createdAt: string;
}
