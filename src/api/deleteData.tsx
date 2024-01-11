"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function deleteData(
  table: string,
  { match }: { [key: string]: any },
) {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.from(table).delete().match(match);
  return { error };
}
