"use server";
import getData from "@/api/getData";
import { database_profile_type } from "@/types/database.tables.types";
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
  const { data: profiles, error: profiles_error } = await getData("profiles", {
    match: { org_name: org },
    column: "Contact,org_name",
  });
  if (profiles_error) {
    return {
      error: {
        message: profiles_error.message,
        type: "Server Error",
      },
    };
  } else {
    const profile = profiles?.find(
      (profile: any) => profile?.Contact?.["Work Email"] === email,
    );
    //user not found
    if (!profile) {
      return {
        error: {
          message: "User profile not found",
          type: "Server Error",
        },
      };
    }
    //user found check org
    if (org === profile.org_name) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${proto}://${header_url}/auth/forgetPassword`,
      });
      if (error) {
        return {
          error: {
            message: error.message,
            type: "Server Error",
          },
        };
      } else {
        return {
          error: null,
        };
      }
    } else {
      return {
        error: {
          message: "Please check your organization domain name",
          type: "Authentication failed",
        },
      };
    }
  }
}
