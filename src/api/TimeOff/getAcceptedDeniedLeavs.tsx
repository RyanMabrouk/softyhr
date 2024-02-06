"use server";
import { database_leave_request_status_type } from "@/types/database.tables.types";
import { Database } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function getAcceptedDeniedLeavs({
  status,
  status2,
}: {
  status: database_leave_request_status_type;
  status2: database_leave_request_status_type;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const org_name = session?.user.user_metadata.org_name;
  const { data, error } = await supabase
    .from("leave_requests")
    .select("*")
    .filter("status", "in", `("${status}","${status2}")`)
    .match({ org_name: org_name });
  return { data: data, error: error };
}
