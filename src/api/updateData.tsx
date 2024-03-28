"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getCurrentorg from "./getCurrentOrg";
import { getLogger } from "@/logging/log-util";
import { table_type } from "@/types/database.tables.types";
export default async function updateData(
  table: table_type,
  payload: {
    [key: string]: any;
  },
  match: {
    [key: string]: string | number | boolean | null | string[];
  },
) {
  const supabase = createServerActionClient({ cookies });
  const org = await getCurrentorg();
  const { data, error } = await supabase
    .from(table)
    .update(payload)
    .match(match)
    .eq("org_name", org?.name)
    .select();
  const logger = getLogger("*");
  if (error) {
    logger.error(error?.message);
  }
  return { data: data, error: error };
}
