"use server";
import { cookies } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export default async function GetFilesByIDs(ids: any) {
  const supabase = createServerActionClient({ cookies });

  let query = supabase.from("files").select("*").in("id", ids);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Files could not be loaded");
  }
  return { data };
}
