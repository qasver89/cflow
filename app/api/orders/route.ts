import { NextRequest, NextResponse } from "next/server";
import { MENU_ITEMS } from "@/lib/menu-data";
import { Order, PlacedOrderItem } from "@/lib/types";
import { db } from "@/lib/db";

const TAX_RATE = 0.08;
let counter = 1099;

function generateOrderNumber() {
  counter += 1;
  return `TB-${counter}`;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json(
      { error: "Order must include at least one item." },
      { status: 400 }
    );
  }

  if (typeof body.tableNumber !== "number") {
    return NextResponse.json(
      { error: "A table must be selected before placing an order." },
      { status: 400 }
    );
  }

  const placedItems: PlacedOrderItem[] = [];
  let prepTimeMax = 0;

  for (const line of body.items as { id: string; quantity: number }[]) {
    const menuItem = MENU_ITEMS.find((m) => m.id === line.id);
    if (!menuItem || !line.quantity || line.quantity <= 0) continue;
    placedItems.push({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: line.quantity,
    });
    prepTimeMax = Math.max(prepTimeMax, menuItem.prepTime);
  }

  if (placedItems.length === 0) {
    return NextResponse.json(
      { error: "None of the submitted items were recognized." },
      { status: 400 }
    );
  }

  const subtotal = placedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  const order: Order = {
    id: crypto.randomUUID(),
    orderNumber: generateOrderNumber(),
    tableNumber: body.tableNumber,
    items: placedItems,
    notes: typeof body.notes === "string" ? body.notes.slice(0, 300) : "",
    subtotal: Math.round(subtotal * 100) / 100,
    tax,
    total,
    estimatedPrepTime: prepTimeMax + 5,
    status: "Waiting for Approval",
    createdAt: new Date().toISOString(),
  };

  db.saveOrder(order);

  return NextResponse.json({ order }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing order id." }, { status: 400 });
  }
  const order = db.getOrder(id);
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }
  return NextResponse.json({ order });
}
