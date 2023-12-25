"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSession from "@/actions/getSession";
type getDataParams = {
  user?: boolean;
  match?: Object;
};
export default async function getData(
  table: string,
  { user, match }: getDataParams = { user: undefined, match: undefined },
) {
  const supabase = createServerComponentClient({ cookies });
  const session = await getSession();
  const user_id = session?.user?.id;
  const { data, error } = match
    ? user
      ? await supabase.from(table).select("*").match(match)
      : await supabase
          .from(table)
          .select("*")
          .match(match)
          .eq("user_id", user_id)
    : await supabase.from(table).select("*");
  if (error) {
    console.log("supabase error");
    console.error(error.message);
    return null;
  } else if (data) {
    return data;
  }
}
