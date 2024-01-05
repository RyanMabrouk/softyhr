"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSession from "@/actions/getSession";
type getDataParams = {
  user?: boolean;
  org?: boolean;
  match?: object;
};
export default async function getData(
  table: string,
  { user = undefined, org = undefined, match = undefined }: getDataParams = {
    user: undefined,
    match: undefined,
    org: undefined,
  },
) {
  const supabase = createServerComponentClient({ cookies });
  const session = await getSession();
  const org_name = session?.user.user_metadata.org_name;
  const user_id = session?.user?.id;
  const { data, error } = match
    ? org
      ? user
        ? await supabase
            .from(table)
            .select("*")
            .match(match)
            .eq("user_id", user_id)
            .eq("org_name", org_name)
        : await supabase
            .from(table)
            .select("*")
            .match(match)
            .eq("org_name", org_name)
      : await supabase.from(table).select("*").match(match)
    : org
      ? user
        ? await supabase
            .from(table)
            .select("*")
            .eq("org_name", org_name)
            .eq("user_id", user_id)
        : await supabase.from(table).select("*").eq("org_name", org_name)
      : await supabase.from(table).select("*");
  return { data: data, error: error };
}
