"use server";
import { getLogger } from "@/logging/log-util";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function updatePassword(formData: FormData) {
  const logger = getLogger("auth");
  logger.info("updatePassword");
  const password = formData.get("password") as string;
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.auth.updateUser({
    password: password,
  });
  if (error) {
    logger.error(error.message);
    return {
      error: {
        message: error.message,
        type: "Server Error",
      },
    };
  } else {
    redirect("/home");
  }
}
