"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/database.types";
import { getLogger } from "@/logging/log-util";
type getDataParams = {
  user?: boolean;
  org?: boolean;
  match?: {
    [key: string]: string | number | boolean | null | string[] | undefined;
  };
  column?: string;
};
export default async function getData(
  table: string,
  {
    user = undefined,
    org = undefined,
    match = undefined,
    column = "*",
  }: getDataParams = {
    user: undefined,
    match: undefined,
    org: undefined,
    column: "*",
  },
): Promise<{ data: any; error: any }> {
  const supabase = createServerComponentClient<Database>({ cookies });
  let query = supabase.from(table).select(column);
  if (match) {
    query = query.match(match);
  }
  if (user) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user_id = session?.user?.id;
    query = query.eq("user_id", user_id);
  }
  if (org) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const org_name = session?.user.user_metadata.org_name;
    query = query.eq("org_name", org_name);
  }
  const { data, error } = await query;
  const logger = getLogger("*");
  if (error) {
    logger.error(error?.message);
  }
  return { data: data, error: error };
}
