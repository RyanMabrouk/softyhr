"use server";
import getData from "./getData";
import getCurrentorg from "./getCurrentOrg";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
export async function UpdateSettings( column :any) {
  console.log(column);
  try {
    const org = await getCurrentorg();
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
      .from("settings")
      .update({ personnal: column })
      .eq("org_name", org?.name)
      .select();
              
    return data
  } catch (error) {
    console.log(error);
  }
}

          