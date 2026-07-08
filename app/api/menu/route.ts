import { NextResponse } from "next/server";
import { MENU_ITEMS, CATEGORIES } from "@/lib/menu-data";

export async function GET() {
  return NextResponse.json({
    categories: CATEGORIES,
    items: MENU_ITEMS,
  });
}
