"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import deleteData from "@/api/deleteData";
import { getLogger } from "@/logging/log-util";

export const deleteCandidateSource = async (id: Number | string) => {
  const logger = getLogger("hiring");
  logger.info("deleteCandidateSource_enter");
  const supabase = createServerActionClient({ cookies });
  const { error } = await deleteData("candidate_sources", { match: { id } });
  if (error) {
    logger.error(error.message);
    return {
      Error: error,
      Msg: "Error Deleting candidate source",
    };
  } else {
    logger.info("deleteCandidateSource_exit");
    return {
      Error: null,
      Msg: "candidate source Deleted successfully",
    };
  }
};
