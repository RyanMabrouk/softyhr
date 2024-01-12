"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function postData(
  table: string,
  payload: { [key: string]: any },
) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase.from(table).insert(payload).select();
  return { data: data, error: error };
}
