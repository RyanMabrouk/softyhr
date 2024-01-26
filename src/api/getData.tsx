"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSession from "@/api/getSession";
import { Database } from "@/types/database.types";
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
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const org_name = session?.user.user_metadata.org_name;
  const user_id = session?.user?.id;
  const { data, error } = match
    ? org
      ? user
        ? await supabase
            .from(table)
            .select(column)
            .match(match)
            .eq("user_id", user_id)
            .eq("org_name", org_name)
        : await supabase
            .from(table)
            .select(column)
            .match(match)
            .eq("org_name", org_name)
      : user
        ? await supabase
            .from(table)
            .select(column)
            .match(match)
            .eq("user_id", user_id)
        : await supabase.from(table).select(column).match(match)
    : org
      ? user
        ? await supabase
            .from(table)
            .select(column)
            .eq("org_name", org_name)
            .eq("user_id", user_id)
        : await supabase.from(table).select(column).eq("org_name", org_name)
      : user
        ? await supabase.from(table).select(column).eq("user_id", user_id)
        : await supabase.from(table).select(column);
  return { data: data, error: error };
}
