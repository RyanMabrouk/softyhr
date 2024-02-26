"use server";
import { getLogger } from "@/logging/log-util";
import {
  database_leave_request_status_type,
  database_leave_requests_type,
} from "@/types/database.tables.types";
import { Database } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
export default async function getAcceptedLeaveRequests({
  end_at,
  start_at,
}: {
  end_at: Date;
  start_at: Date;
}): Promise<{
  data: database_leave_requests_type[] | null | undefined;
  error: PostgrestError | null | undefined;
}> {
  const supabase = createServerComponentClient<Database>({ cookies });
  const status: database_leave_request_status_type = "approved";
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const org_name = session?.user.user_metadata.org_name;
  const { data, error } = await supabase
    .from("leave_requests")
    .select("*")
    .match({ status: status, org_name: org_name })
    .lte("start_at", end_at.toISOString())
    .gte("end_at", start_at.toISOString());
  const logger = getLogger("Inbox");
  logger.info("getAcceptedLeaveRequests");
  if (error) {
    logger.error(error?.message);
  }
  return { data: data as database_leave_requests_type[], error: error };
}
