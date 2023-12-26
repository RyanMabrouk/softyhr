"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
export default async function login(formData: FormData) {
  console.log("🚀login");
  const header_url = headers().get("host") || "";
  const supabase = createServerActionClient({ cookies });
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  if (error) console.log("🚀login error", error);
  else {
    const domain = header_url.substring(0, header_url.indexOf("."));
    const user_org = user?.user?.user_metadata?.org_name;
    if (user_org === domain) {
      redirect("/home");
    } else {
      console.log("🚀 ~ Your not registered in this domain");
      const { error: login_not_registered_error } =
        await supabase.auth.signOut();
      if (login_not_registered_error)
        console.log(
          "🚀login login_not_registered_error",
          login_not_registered_error,
        );
    }
  }
}
