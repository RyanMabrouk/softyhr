"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import postData from "@/api/postData";
import { getLogger } from "@/logging/log-util";
import getData from "@/api/getData";
import { PostgrestError } from "@supabase/supabase-js";
import { database_roles_type } from "@/types/database.tables.types";
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
    console.log("🚀 ~ signup ~ roles:", roles);
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
        role_id: roles?.find((role) => role.name === "admin")?.id,
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
export async function createOrg({
  company,
  employee_count,
  country,
}: {
  company: string;
  employee_count: string;
  country: string;
}): Promise<{
  error: PostgrestError | null;
  roles: database_roles_type[] | undefined | null;
}> {
  const { error } = await postData("organizations", [
    {
      name: company,
      employee_count: employee_count,
      country: country,
    },
  ]);
  if (error) return { error, roles: undefined };
  else {
    const { data } = await getData("roles", {
      match: {
        org_name: company,
      },
    });
    return {
      roles: data,
      error,
    };
  }
}
export async function createProfile({
  user_id,
  company,
  first_name,
  last_name,
  email,
  tel,
  job,
  supervisor_id = null,
  role_id,
}: {
  user_id: string;
  company: string;
  first_name: string;
  last_name: string;
  email: string;
  tel: string;
  job: string;
  role_id: number | undefined;
  supervisor_id?: string | null;
}) {
  if (!role_id) throw new Error("role_id is not defined");
  const { error } = await postData("profiles", [
    {
      user_id: user_id,
      org_name: company,
      supervisor_id: supervisor_id,
      accrual_start_date: new Date(),
      Hiring: {
        "Hire Date": new Date(),
      },
      "Basic Information": {
        Age: "",
        NIN: "",
        SIN: "",
        SSN: "XXX-XX-XXXX",
        Gender: "",
        Status: "Active",
        Employee: "",
        Allergies: "Peanuts",
        "Last name": last_name,
        "Birth Date": "",
        Birthplace: "",
        "First name": first_name,
        "Shirt Size": "",
        "Shirt size": "",
        Citizenship: "",
        "Jacket Size": "",
        "Middle name": " ",
        "National ID": "",
        Nationality: "",
        "T-Shirt Size": "",
        "Marital Status": "",
        "Preferred name": "",
        "Tax File Number": "",
        "Secondary Language": "",
        "Dietary Restrictions": "",
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
          Location: "",
          Division: "",
          Department: "",
          "Job Title": job,
        },
      ],
    },
  ]);
  if (error)
    return {
      error,
    };
  else {
    const { error: permissions_error } = await postData("permissions", {
      user_id: user_id,
      role_id: role_id,
      org_name: company,
      files_ids: [],
    });
    return {
      error: permissions_error,
    };
  }
}
