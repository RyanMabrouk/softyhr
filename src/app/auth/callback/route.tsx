"use server";
import getSession from "@/api/getSession";
import getData from "@/api/getData";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { database_profile_type } from "@/types/database.tables.types";
export async function GET(request: NextRequest) {
  console.log("intercepted in caalback api route_enter");
  //const logger = getLogger("*");
  //logger.info("intercepted in caalback api route_enter");
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  try {
    if (!code) {
      const error = requestUrl.searchParams.get("error");
      const error_description =
        requestUrl.searchParams.get("error_description");
      console.error(error + " discription :" + error_description);
      throw new Error("code is not defined");
    }
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
    const session = await getSession();
    const { data: profiles, error } = await getData("profiles");
    const company = profiles?.filter(
      (profile: database_profile_type) => profile.user_id === session?.user.id,
    )?.[0]?.org_name;
    if (!company) throw new Error("company is not defined");
    if (error) throw new Error(error.message);
    const { error: signout_error } = await supabase.auth.signOut();
    if (signout_error) throw new Error(signout_error.message);
    const redirectUrl = `${requestUrl.protocol}//${company}.${requestUrl.host}/home`;
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    //logger.error(error);
    // URL to redirect if sign in process failes
    //logger.info("intercepted in caalback api route_exit");
    return NextResponse.redirect(`${requestUrl.origin}`);
  }
}
