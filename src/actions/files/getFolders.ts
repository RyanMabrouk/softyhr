"use server";
import { cookies } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { getLogger } from "@/logging/log-util";

export default async function GetFoldersByIDs(ids: any) {
  const logger = getLogger("files");
  logger.info("GetFoldersByIDs");
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from("folders")
    .select("*,files(*)")
    .in("id", ids);
  if (error) {
    logger.error(error);
    throw new Error("Folders could not be loaded");
  }
  return { data };
}
