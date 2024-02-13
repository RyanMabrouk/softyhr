"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { getLogger } from "@/logging/log-util";
export default async function GetFilesByIDs(ids: any) {
  const logger = getLogger("files");
  logger.info("GetFilesByIDs");
  const supabase = createServerActionClient({ cookies });
  let query = supabase.from("files").select("*").in("id", ids);
  const { data, error } = await query;
  if (error) {
    logger.error(error);
    throw new Error("Files could not be loaded");
  }
  return { data };
}
