"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import postData from "@/api/postData";

export default async function signup(formData: FormData) {
  console.log("🚀 ~ file: signup.tsx:3 ~ signup ~ formData:", formData);
  const headersList = headers();
  const header_url = headersList.get("host") || "";
  //Company Info
  const company = formData.get("company") as string;
  //Admin Info
  const email = formData.get("email") as string;
  const tel = formData.get("tel") as string;
  const password = formData.get("password") as string;
  const job = formData.get("job") as string;
  const emailRedirectTo = `http://${company}.${header_url}/auth/callback`;
  console.log(
    "🚀 ~ file: signup.tsx:20 ~ signup ~ emailRedirectTo:",
    emailRedirectTo,
  );
  const options = {
    data: {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      tel: tel,
      job: job,
    },
    emailRedirectTo: emailRedirectTo,
  };
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore });
  const { data, error: signup_error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: options,
  });
  console.log("🚀 ~ file: signup.tsx:35 ~ signup ~ data:", data);
  if (signup_error) {
    console.log("signup_error", signup_error);
    return;
  }
  if (data?.user?.identities?.length === 0) {
    console.log("already signed up");
  } else {
    console.log("verify your email");
    const { error: organizations_error } = await postData("organizations", [
      {
        name: company,
        employee_count: formData.get("employee_count") as string,
        country: formData.get("country") as string,
      },
    ]);
    if (organizations_error) {
      console.log("organizations_error", organizations_error);
      return;
    } else {
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
        console.log("profiles_error", profiles_error);
        return;
      } else {
        redirect("/");
      }
    }
  }
}
