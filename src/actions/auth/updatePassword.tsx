"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function updatePassword(formData: FormData) {
  console.log("🚀 updatePassword");
  const password = formData.get("password") as string;
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.auth.updateUser({
    password: password,
  });
  if (error)
    return {
      error: {
        message: error.message,
        type: "Server Error",
      },
    };
  else {
    redirect("/home");
  }
}
