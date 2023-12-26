"use server";
import getData from "@/api/getData";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
export default async function resetPassword(formData: FormData) {
  console.log("🚀 resetPassword");
  //Url info
  const proto = headers().get("x-forwarded-proto") || "http";
  const header_url = headers().get("host") || "";
  const org = header_url.substring(0, header_url.indexOf("."));
  //Form data
  const email = formData.get("email") as string;
  const supabase = createServerActionClient({ cookies });
  const { data: profile, error: profile_error } = await getData("profiles", {
    match: { email: email },
  });
  if (profile_error) console.log("🚀 profile_error", profile_error);
  else {
    //user not found
    if (profile?.length === 0) {
      console.log("🚀 user not found");
      return;
    }
    //user found
    if (profile && org === profile[0].org_name) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${proto}://${header_url}/auth/forgetPassword`,
      });
      if (error) console.log("🚀 resetPassword error", error);
      else console.log("🚀 resetPassword email sent");
    } else {
      console.log("🚀 please check your org name domain name");
    }
  }
}
