import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const url = new URL(req.url);
  const supabase = createMiddlewareClient({ req, res });

  if (url.pathname === "/auth/callback") {
    const code = url.searchParams.get("code");
    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
    }
  } else {
    await supabase.auth.getSession();
  }
  return res;
}
