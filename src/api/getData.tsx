"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/database.types";
import { getLogger } from "@/logging/log-util";
import { PostgrestError } from "@supabase/supabase-js";
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
): Promise<{ data: any[] | null; error: PostgrestError | null }> {
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
    if (!user_id) {
      return {
        data: null,
        error: {
          message: "User not found",
          details: "User not found",
          hint: "User not found",
          code: "400",
        },
      };
    }
    query = query.eq("user_id", user_id);
  }
  if (org) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const org_name = session?.user.user_metadata.org_name;
    if (!org_name) {
      return {
        data: null,
        error: {
          message: "Org not found",
          details: "Org not found",
          hint: "Org not found",
          code: "400",
        },
      };
    }
    query = query.eq("org_name", org_name);
  }
  const { data, error } = await query;
  const logger = getLogger("*");
  if (error) {
    logger.error(error?.message);
  }
  return { data: data, error: error };
}
