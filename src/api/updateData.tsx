"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function updateData(
  table: string,
  payload: Object[],
  match: Object,
) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from(table)
    .update(payload)
    .match(match)
    .select();
  return { data: data, error: error };
}
