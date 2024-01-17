"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function updateData(
  table: string,
  payload: {
    [key: string]: any;
  },
  match: {
    [key: string]: string | number | boolean | null | string[];
  },
) {
  const supabase = createServerActionClient({ cookies });
  console.log(table, payload, match);
  const { data, error } = await supabase
    .from(table)
    .update(payload)
    .match(match)
    .select();
  return { data: data, error: error };
}
