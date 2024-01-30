"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
export default async function signout() {
  console.log("🚀 ~ signout ");
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log("🚀 ~ signout ~ error:", error);
    return;
  } else {
    const header_url = headers().get("host") || "";
    console.log("🚀 ~ signout success ");
    const proto = headers().get("x-forwarded-proto") || "http";
    const domain_url = `${proto}://${header_url.substring(
      header_url.indexOf(".") + 1,
      header_url.length,
    )}`;
    redirect("/logout");
  }
}
