"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import getSession from "@/api/getSession";
import { getLogger } from "@/logging/log-util";

export const GetAllCandidates = async (page: number) => {
  const logger = getLogger("condidate");
  logger.info("GetAllCandidates_enter");
  const session = await getSession();
  const org_name = session?.user.user_metadata.org_name;
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from("condidates")
    .select("*", { count: "exact" })
    .eq("org_name", org_name)
    .range(page * 6 - 1, 6 + page * 6);
  if (error) {
    logger.error(error.message);
    return {
      error,
    };
  } else {
    logger.info("GetAllCandidates_exit");
    return {
      data,
    };
  }
};
