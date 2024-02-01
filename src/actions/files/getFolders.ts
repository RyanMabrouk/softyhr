"use server";
import { cookies } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export default async function GetFoldersByIDs(ids: any) {
  const supabase = createServerActionClient({ cookies });

  let query = supabase.from("folders").select("*,files(*)").in("id", ids);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Folders could not be loaded");
  }
  return { data };
}
