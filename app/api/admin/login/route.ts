import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { username, password } = body ?? {};

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required." },
      { status: 400 }
    );
  }

  const admin = db.findAdmin(username);

  // Constant-time comparison even when admin not found
  const hash = admin?.passwordHash ?? "$2a$10$invalidhashplaceholderXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  const valid = await bcrypt.compare(password, hash);

  if (!admin || !valid) {
    return NextResponse.json(
      { error: "Invalid username or password." },
      { status: 401 }
    );
  }

  const session = await getSession();
  session.adminId = admin.id;
  session.username = admin.username;
  session.name = admin.name;
  session.role = admin.role;
  session.isLoggedIn = true;
  await session.save();

  return NextResponse.json({
    ok: true,
    admin: { id: admin.id, username: admin.username, name: admin.name, role: admin.role },
  });
}
