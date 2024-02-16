"use server";
import getCurrentorg from "../getCurrentOrg";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getLogger } from "@/logging/log-util";
export async function UpdateSettings(column: { [key: string]: any }) {
  const logger = getLogger("settings");
  logger.info("UpdateSettings_enter");
  const org = await getCurrentorg();
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("settings")
    .update(column)
    .eq("org_name", org?.name)
    .select();
  logger.info("UpdateSettings_exit");
  if (error) {
    logger.error(error?.message);
  }
  return { data: data, error: error };
}
