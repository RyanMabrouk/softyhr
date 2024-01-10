"use server";
import getCurrentorg from "./getCurrentOrg";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
export async function UpdateSettings(column: any) {
  try {
    const org = await getCurrentorg();
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
      .from("settings")
      .update(column)
      .eq("org_name", org?.name)
      .select();

    return column;
  } catch (error) {
  }
}
