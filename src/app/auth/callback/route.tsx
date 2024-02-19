"use server";
import getSession from "@/api/getSession";
import getData from "@/api/getData";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { database_profile_type } from "@/types/database.tables.types";
export async function GET(request: NextRequest) {
  //const logger = getLogger("*");
  //logger.info("intercepted in caalback api route_enter");
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
        (profile: database_profile_type) =>
          profile.user_id === session?.user.id,
      )?.[0]?.org_name;
      if (error) throw new Error(error.message);
      //sign out from the landing page url
      const { error: signout_error } = await supabase.auth.signOut();
      if (signout_error) throw new Error(signout_error.message);
      if (!company) throw new Error("company is not defined");
      // URL to redirect to after sign in process completes
      //logger.info("intercepted in caalback api route_exit");
      return NextResponse.redirect(
        `${requestUrl.protocol}//${company}.${requestUrl.host}/home`,
      );
    } else {
      const error = requestUrl.searchParams.get("error");
      const error_description =
        requestUrl.searchParams.get("error_description");
      // logger.error(error + " discription :" + error_description);
      console.error(error + " discription :" + error_description);
      throw new Error("code is not defined");
    }
  } catch (error) {
    //logger.error(error);
    // URL to redirect if sign in process failes
    //logger.info("intercepted in caalback api route_exit");
    return NextResponse.redirect(`${requestUrl.origin}`);
  }
}
