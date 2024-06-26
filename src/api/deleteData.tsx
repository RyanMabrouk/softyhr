"use server";
import { getLogger } from "@/logging/log-util";
import { table_type } from "@/types/database.tables.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function deleteData(
  table: table_type,
  { match }: { match: { [key: string]: any } },
) {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.from(table).delete().match(match);
  const logger = getLogger("*");
  logger.error(error?.message);
  return { error };
}
