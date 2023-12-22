"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function postData(table: string, payload: Object[]) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase.from(table).insert(payload);
  return { data: data, error: error };
}
