import { getIronSession, IronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  adminId?: string;
  username?: string;
  name?: string;
  role?: "admin" | "staff";
  isLoggedIn?: boolean;
}

export const sessionOptions: SessionOptions = {
  cookieName: "trio_bites_admin",
  password:
    process.env.SESSION_SECRET ??
    "trio-bites-super-secret-key-change-in-production-32chars",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 hours
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}
