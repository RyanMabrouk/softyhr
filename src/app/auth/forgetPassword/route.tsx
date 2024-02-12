import getSession from "@/api/getSession";
import getData from "@/api/getData";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getLogger } from "@/logging/log-util";
export async function GET(request: NextRequest) {
  const logger = getLogger("*");
  logger.info("intercepted in forget password api route");
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  try {
    if (code) {
      const supabase = createRouteHandlerClient({ cookies });
      await supabase.auth.exchangeCodeForSession(code);
      //get user company name
      const { data: profile, error } = await getData("profiles", {
        user: true,
        column: "org_name",
      });
      const company = profile?.[0].org_name;
      if (error) throw new Error(error.message);
      // URL to redirect after sign in process completed
      return NextResponse.redirect(
        `${requestUrl.protocol}//${company}.${requestUrl.host}/change_password`,
      );
    }
  } catch (error) {
    logger.error(error);
    // URL to redirect if sign in process failes
    return NextResponse.redirect(`${requestUrl.origin}`);
  }
}
