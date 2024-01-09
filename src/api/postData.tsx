"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
type object_type = {
  [key: string]: any;
};
export default async function postData(table: string, payload: object_type) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase.from(table).insert(payload).select();
  return { data: data, error: error };
}
