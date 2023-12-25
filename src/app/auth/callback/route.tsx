import getSession from "@/actions/getSession";
import getData from "@/api/getData";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { profile } from "console";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  try {
    if (code) {
      const supabase = createRouteHandlerClient({ cookies });
      await supabase.auth.exchangeCodeForSession(code);
      //get usre company name
      const session = await getSession();
      const { data: profiles, error } = await getData("profiles");
      const company = profiles?.filter(
        (profile) => profile.user_id === session?.user.id,
      )[0].org_name;
      // URL to redirect to after sign in process completes
      return NextResponse.redirect(
        `${requestUrl.protocol}//${company}.${requestUrl.host}/home`,
      );
    }
  } catch (error) {
    console.log("🚀 ~ file: route.tsx:15 ~ GET ~ error:", error);
    // URL to redirect to after sign in process completes
    return NextResponse.redirect(`${requestUrl.origin}`);
  }
}
