"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GetSettings(section: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore });

  try {
    let { data: settings, error } = await supabase
      .from("settings")
      .select('"personnal "');
    return settings[0]["personnal "];
  } catch (error) {
    console.log(error);
  }
}
