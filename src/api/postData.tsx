"use server";
import { getLogger } from "@/logging/log-util";
import { table_type } from "@/types/database.tables.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function postData(
  table: table_type,
  payload: { [key: string]: any },
) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase.from(table).insert(payload).select();
  const logger = getLogger("*");
  if (error) {
    logger.error(error?.message);
  }
  return { data: data, error: error };
}
