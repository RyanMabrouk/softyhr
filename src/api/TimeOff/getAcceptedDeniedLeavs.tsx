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
const cards_per_page = 9;
export default async function getAcceptedDeniedLeavs({
  status,
  page,
  sort,
}: {
  status: database_leave_request_status_type[];
  page: number;
  sort: "user_id" | "reviewed_at";
}): Promise<{
  data: database_leave_requests_type[] | null | undefined;
  error: PostgrestError | null | undefined;
}> {
  const logger = getLogger("Inbox");
  logger.info("getAcceptedDeniedLeavs");
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const org_name = session?.user.user_metadata.org_name;
  const start = page === 1 ? 0 : (page - 1) * cards_per_page;
  const end = page === 1 ? cards_per_page - 1 : start + cards_per_page - 1;
  const { data, error } = await supabase
    .from("leave_requests")
    .select("*")
    .filter(
      "status",
      "in",
      `(${status.reduce((acc, e) => acc + `"${e}",`, "")})`,
    )
    .match({ org_name: org_name })
    .order(sort, { ascending: false })
    .range(start, end);
  if (error) {
    logger.error(error?.message);
  }
  return { data: data as database_leave_requests_type[], error: error };
}
