import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const orders = db.getOrders();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayOrders = orders.filter(
    (o) => new Date(o.createdAt) >= todayStart
  );

  const pending = orders.filter(
    (o) => o.status === "Waiting for Approval" || o.status === "Preparing"
  );

  const completed = orders.filter((o) => o.status === "Completed");

  const revenue = todayOrders.reduce((sum, o) => sum + o.total, 0);

  return NextResponse.json({
    todayOrdersCount: todayOrders.length,
    pendingCount: pending.length,
    completedCount: completed.length,
    todayRevenue: Math.round(revenue * 100) / 100,
    recentOrders: orders.slice(0, 8),
  });
}
