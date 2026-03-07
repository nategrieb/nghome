import "server-only";

import crypto from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { Session } from "@/lib/session";

const SESSION_COOKIE = "cc_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const SESSION_HMAC_SECRET = process.env.AUTH_COOKIE_SECRET ?? "development-session-secret";

function signPayload(payload: string): string {
  return crypto.createHmac("sha256", SESSION_HMAC_SECRET).update(payload).digest("base64url");
}

function encodeSession(session: Session): string {
  const json = JSON.stringify(session);
  const payload = Buffer.from(json, "utf8").toString("base64url");
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

function decodeSession(cookieValue: string): Session | null {
  try {
    const [payload, signature] = cookieValue.split(".");
    if (!payload || !signature) {
      return null;
    }

    const expectedSignature = signPayload(payload);
    if (signature !== expectedSignature) {
      return null;
    }

    const json = Buffer.from(payload, "base64url").toString("utf8");
    const parsed = JSON.parse(json) as Session;

    if (!parsed.user?.name || !parsed.createdAt) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function getSafeNextPath(nextPath: string | null): string {
  if (!nextPath || !nextPath.startsWith("/")) {
    return "/";
  }

  return nextPath;
}

export function isAuthRequired(): boolean {
  return process.env.AUTH_REQUIRED === "true";
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);
  if (!sessionCookie?.value) {
    return null;
  }

  return decodeSession(sessionCookie.value);
}

export async function signInAction(formData: FormData): Promise<void> {
  "use server";

  const rawName = formData.get("name")?.toString().trim();
  const rawEmail = formData.get("email")?.toString().trim();
  const nextPath = getSafeNextPath(formData.get("next")?.toString() ?? null);

  const session: Session = {
    user: {
      name: rawName || "Operator",
      email: rawEmail || undefined,
    },
    createdAt: new Date().toISOString(),
  };

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect(nextPath);
}

export async function signOutAction(formData: FormData): Promise<void> {
  "use server";

  const nextPath = getSafeNextPath(formData.get("next")?.toString() ?? "/login");
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);

  redirect(nextPath);
}
