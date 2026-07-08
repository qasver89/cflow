import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  return NextResponse.json({
    admin: {
      id: session.adminId,
      username: session.username,
      name: session.name,
      role: session.role,
    },
  });
}
