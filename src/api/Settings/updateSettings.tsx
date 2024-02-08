"use server";
import getCurrentorg from "../getCurrentOrg";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Settings_type } from "@/types/database.tables.types";
export async function UpdateSettings(column: { [key: string]: any }) {
  const org = await getCurrentorg();
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("settings")
    .update(column)
    .eq("org_name", org?.name)
    .select();
  return { data: data, error: error };
}
