"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getCurrentorg from "./getCurrentOrg";
export default async function updateData(
  table: string,
  payload: {
    [key: string]: any;
  },
  match: {
    [key: string]: string | number | boolean | null | string[];
  },
) {
  const supabase = createServerActionClient({ cookies })
  const org = await getCurrentorg();
  const { data, error } = await supabase
    .from(table)
    .update(payload)
    .match(match)
    .eq("org_name", org?.name)
    .select();
  return { data: data, error: error };
}
