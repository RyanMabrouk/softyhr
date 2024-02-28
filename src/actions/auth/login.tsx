"use server";
import { getLogger } from "@/logging/log-util";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
export default async function login(formData: FormData) {
  const logger = getLogger("auth");
  logger.info("login");
  const supabase = createServerActionClient({ cookies });
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  if (error) {
    logger.error(error.message);
    return {
      error: {
        message: error.message,
        type: "Login Error",
      },
    };
  } else {
    const host = headers().get("host")?.split(".");
    const subdomain = host?.[0] === "www" ? host?.[1] : host?.[0];
    const user_org = user?.user?.user_metadata?.org_name;
    if (user_org === subdomain) {
      redirect("/home");
    } else {
      const { error: login_not_registered_error } =
        await supabase.auth.signOut();
      if (login_not_registered_error) {
        logger.error(login_not_registered_error.message);
        return {
          error: {
            message: login_not_registered_error.message,
            type: "Server Error",
          },
        };
      }
      logger.warn("User not registered in this domain");
      return {
        error: {
          message: "Your not registered in this domain",
          type: "Login Error",
        },
      };
    }
  }
}
