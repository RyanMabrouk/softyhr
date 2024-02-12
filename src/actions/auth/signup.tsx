"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import postData from "@/api/postData";
import { getLogger } from "@/logging/log-util";
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
    const { error: organizations_error } = await postData("organizations", [
      {
        name: company,
        employee_count: formData.get("employee_count") as string,
        country: formData.get("country") as string,
      },
    ]);
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
      const { error: profiles_error } = await postData("profiles", [
        {
          user_id: data?.user?.id,
          org_name: company,
          role: "admin",
          "Basic Information": {
            "Birth Date": "",
            Age: "",
            Gender: "",
            "Marital Status": "",
            NIN: "",
            "Tax File Number": "",
            SSN: "",
            "First Name": formData.get("first_name"),
            "Middle Name": "",
            "Last Name": formData.get("last_name"),
            "Preferred Name": "",
            "Employee #": "",
            Status: "",
            "Secondary Language": "",
          },
          Contact: {
            "Work Phone": "",
            Ext: "",
            "Mobile Phone": tel,
            "Home Phone": "",
            "Work Email": email,
            "Home Email": "",
          },
          "Job Information": [
            {
              "Effective Date": new Date(),
              Location: "",
              Division: "",
              Department: "",
              "Job Title": job,
              "Reports To": "",
            },
          ],
        },
      ]);
      if (profiles_error) {
        logger.error(profiles_error.message);
        return {
          error: {
            message: profiles_error.message,
            type: "creating a profile failed",
          },
        };
      } else {
        //Create settings
        const { error: settings_error } = await postData("settings", [
          {
            org_name: company,
          },
        ]);
        if (settings_error) {
          logger.error(settings_error.message);
          return {
            error: {
              message: settings_error.message,
              type: "creating settings failed",
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
}
