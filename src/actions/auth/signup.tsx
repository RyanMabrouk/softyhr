"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { getLogger } from "@/logging/log-util";
import { createOrg } from "./createOrg";
import { createProfile } from "./createProfile";
export default async function signup(formData: FormData) {
  const logger = getLogger("auth");
  logger.info("signup");
  const headersList = headers();
  const header_url = headersList.get("host") || "";
  const proto = headers().get("x-forwarded-proto") || "http";
  //Company Info
  const company = formData.get("company") as string;
  //Admin Info
  const email = formData.get("email") as string;
  const tel = formData.get("tel") as string;
  const password = formData.get("password") as string;
  const job = formData.get("job") as string;
  const options = {
    data: {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      tel: tel,
      job: job,
      org_name: company,
    },
    emailRedirectTo: `${proto}://${header_url}/auth/callback`,
  };
  const supabase = createServerActionClient({ cookies });
  const { data, error: signup_error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: options,
  });
  if (signup_error) {
    logger.error(signup_error.message);
    return {
      error: { message: signup_error.message, type: "Signup Error" },
    };
  }
  if (data?.user?.identities?.length === 0) {
    logger.warn("user already have an account");
    return {
      error: { message: "You already have an account", type: "Signup Error" },
    };
  } else {
    //Create organization
    const employee_count = formData.get("employee_count") as string;
    const country = formData.get("country") as string;
    const { error: organizations_error, roles } = await createOrg({
      company,
      employee_count,
      country,
    });
    if (organizations_error) {
      logger.error(organizations_error.message);
      return {
        error: {
          message: organizations_error.message,
          type: "creating an organization failed",
        },
      };
    } else {
      //Create profile
      const first_name = formData.get("first_name") as string;
      const last_name = formData.get("last_name") as string;
      const user_id = data?.user?.id as string;
      const { error: profiles_error } = await createProfile({
        user_id,
        company,
        first_name,
        last_name,
        email,
        tel,
        job,
        role_id: roles?.find((role) => role.name === "Full Admin")?.id,
      });
      if (profiles_error) {
        logger.error(profiles_error.message);
        return {
          error: {
            message: profiles_error.message,
            type: "creating a profile failed",
          },
        };
      } else {
        return {
          error: null,
        };
      }
    }
  }
}
