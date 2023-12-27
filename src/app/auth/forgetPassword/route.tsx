import getSession from "@/actions/getSession";
import getData from "@/api/getData";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  console.log("🚀 ~ interceptd in forget password callback");
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  try {
    if (code) {
      const supabase = createRouteHandlerClient({ cookies });
      await supabase.auth.exchangeCodeForSession(code);
      //get user company name
      const session = await getSession();
      const { data: profiles, error } = await getData("profiles");
      const company = profiles?.filter(
        (profile) => profile.user_id === session?.user.id,
      )[0].org_name;
      if (error) throw new Error(error.message);
      // URL to redirect after sign in process completed
      return NextResponse.redirect(
        `${requestUrl.protocol}//${company}.${requestUrl.host}/change_password`,
      );
    }
  } catch (error) {
    console.log("🚀 ~ file: route.tsx:15 ~ GET ~ error:", error);
    // URL to redirect if sign in process failes
    return NextResponse.redirect(`${requestUrl.origin}`);
  }
}