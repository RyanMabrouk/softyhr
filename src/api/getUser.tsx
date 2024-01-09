"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSession from "@/api/getSession";

export default async function getUser() {
  const supabase = createServerComponentClient({ cookies });
  const session = await getSession();
  const user_id = session?.user?.id;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user_id);
  return { data: data, error: error };
}
