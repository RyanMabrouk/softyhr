"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import postData from "@/api/postData";
export default async function signup(formData: FormData) {
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
    console.log("🚀signup_error", signup_error);
    return;
  }
  if (data?.user?.identities?.length === 0) {
    console.log("🚀already signed up");
  } else {
    console.log("🚀verify your email");
    //Create organization
    const { error: organizations_error } = await postData("organizations", [
      {
        name: company,
        employee_count: formData.get("employee_count") as string,
        country: formData.get("country") as string,
      },
    ]);
    if (organizations_error) {
      console.log("🚀organizations_error", organizations_error);
      return;
    } else {
      //Create profile
      const { error: profiles_error } = await postData("profiles", [
        {
          user_id: data?.user?.id,
          org_name: company,
          first_name: formData.get("first_name"),
          last_name: formData.get("last_name"),
          job: job,
          email: email,
          tel: tel,
          role: "admin",
        },
      ]);
      if (profiles_error) {
        console.log("🚀profiles_error", profiles_error);
        return;
      } else {
        //Create settings
        const { error: settings_error } = await postData("settings", [
          {
            org_name: company,
          },
        ]);
        if (settings_error) {
          console.log("🚀settings_error", settings_error);
          return;
        } else {
          console.log("🚀redirecting to /");
          redirect("/");
        }
      }
    }
  }
}
