"use server";
import getSession from "@/actions/getSession";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function getData(
  table: string,
  { user, match }: { user: boolean; match: Object },
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
