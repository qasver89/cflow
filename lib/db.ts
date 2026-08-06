/**
 * lib/db.ts
 * ──────────────────────────────────────────────────────────────────────────────
 * Lightweight file-based JSON store.  Works in any Node.js environment with
 * zero native dependencies.  Swap for Postgres/SQLite/Prisma in production.
 *
 * Data lives in  <project-root>/data/db.json
 * The file is created automatically on first access.
 */

import fs from "fs";
import path from "path";
import { Order } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  name: string;
  role: "admin" | "staff";
  createdAt: string;
}

export interface Notification {
  id: string;
  message: string;
  type: "order" | "system" | "alert";
  read: boolean;
  createdAt: string;
}

export interface DbSchema {
  admins: AdminUser[];
  orders: Order[];
  notifications: Notification[];
  _meta: { version: number };
}

// ── helpers ──────────────────────────────────────────────────────────────────

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readDb(): DbSchema {
  ensureDataDir();
  if (!fs.existsSync(DB_FILE)) return seed();
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8")) as DbSchema;
  } catch {
    return seed();
  }
}

function writeDb(db: DbSchema): void {
  ensureDataDir();
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
}

/** Creates the initial database with one admin account. */
function seed(): DbSchema {
  // bcryptjs hash for "admin123" with salt rounds = 10
  // Pre-computed so seeding is synchronous and fast.
  const seedHash =
    "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi";

  const db: DbSchema = {
    _meta: { version: 1 },
    admins: [
      {
        id: "admin-1",
        username: "admin",
        passwordHash: seedHash,
        name: "Ninnes Admin",
        role: "admin",
        createdAt: new Date().toISOString(),
      },
    ],
    orders: generateSeedOrders(),
    notifications: [
      {
        id: "notif-1",
        message: "New order TB-1001 received from Table 3",
        type: "order",
        read: false,
        createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      },
      {
        id: "notif-2",
        message: "Order TB-1000 marked as Completed",
        type: "order",
        read: false,
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      },
      {
        id: "notif-3",
        message: "Low stock alert: Oat Milk running low",
        type: "alert",
        read: true,
        createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      },
    ],
  };

  writeDb(db);
  return db;
}

// ── public API ────────────────────────────────────────────────────────────────

export const db = {
  // Admins
  findAdmin(username: string): AdminUser | undefined {
    return readDb().admins.find((a) => a.username === username);
  },

  // Orders
  getOrders(): Order[] {
    return readDb().orders;
  },

  getOrder(id: string): Order | undefined {
    return readDb().orders.find((o) => o.id === id);
  },

  saveOrder(order: Order): void {
    const data = readDb();
    const idx = data.orders.findIndex((o) => o.id === order.id);
    if (idx >= 0) data.orders[idx] = order;
    else data.orders.unshift(order);
    writeDb(data);

    // Auto-create a notification for new orders
    if (idx < 0) {
      db.addNotification({
        message: `New order ${order.orderNumber} received from Table ${order.tableNumber}`,
        type: "order",
      });
    }
  },

  updateOrderStatus(
    id: string,
    status: Order["status"]
  ): Order | undefined {
    const data = readDb();
    const order = data.orders.find((o) => o.id === id);
    if (!order) return undefined;
    order.status = status;
    writeDb(data);
    db.addNotification({
      message: `Order ${order.orderNumber} updated to "${status}"`,
      type: "order",
    });
    return order;
  },

  // Notifications
  getNotifications(): Notification[] {
    return readDb().notifications.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  addNotification(n: { message: string; type: Notification["type"] }): void {
    const data = readDb();
    data.notifications.unshift({
      id: `notif-${Date.now()}`,
      message: n.message,
      type: n.type,
      read: false,
      createdAt: new Date().toISOString(),
    });
    // Keep at most 50 notifications
    data.notifications = data.notifications.slice(0, 50);
    writeDb(data);
  },

  markNotificationsRead(): void {
    const data = readDb();
    data.notifications = data.notifications.map((n) => ({ ...n, read: true }));
    writeDb(data);
  },
};

// ── seed helpers ──────────────────────────────────────────────────────────────

function ago(minutes: number): string {
  return new Date(Date.now() - minutes * 60 * 1000).toISOString();
}

function generateSeedOrders(): Order[] {
  const statuses: Order["status"][] = [
    "Waiting for Approval",
    "Preparing",
    "Ready",
    "Completed",
  ];

  const items = [
    { id: "bur-01", name: "Trio Smash Burger", price: 8.5 },
    { id: "piz-02", name: "Pepperoni Pizza", price: 12.0 },
    { id: "cof-01", name: "Ninnes Espresso", price: 4.5 },
    { id: "des-01", name: "Dark Chocolate Torte", price: 6.5 },
    { id: "dri-02", name: "Fresh Lemonade", price: 4.0 },
    { id: "bur-02", name: "Crispy Chicken Burger", price: 8.0 },
    { id: "tea-01", name: "Karak Chai", price: 3.5 },
    { id: "piz-01", name: "Margherita Pizza", price: 10.5 },
  ];

  const orders: Order[] = [];
  for (let i = 0; i < 12; i++) {
    const pickedItems = items.slice(i % items.length, (i % items.length) + 2);
    const orderItems = pickedItems.map((it) => ({
      ...it,
      quantity: (i % 3) + 1,
    }));
    const subtotal = orderItems.reduce(
      (s, it) => s + it.price * it.quantity,
      0
    );
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    orders.push({
      id: `seed-order-${i}`,
      orderNumber: `TB-${1000 + i}`,
      tableNumber: (i % 12) + 1,
      items: orderItems,
      notes: i % 4 === 0 ? "Extra spicy please" : "",
      subtotal: Math.round(subtotal * 100) / 100,
      tax,
      total: Math.round((subtotal + tax) * 100) / 100,
      estimatedPrepTime: 15 + (i % 10),
      status: statuses[i % statuses.length],
      createdAt: ago(i * 8),
    });
  }
  return orders;
}
