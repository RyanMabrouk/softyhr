"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import deleteData from "@/api/deleteData";
import { getLogger } from "@/logging/log-util";

export const deleteCandidateStatus= async (id: Number | string) => {
  const logger = getLogger("hiring");
  logger.info("deleteCandidateStatus_enter");
  const supabase = createServerActionClient({ cookies });
  const { error } = await deleteData("candidate_statuses", { match: { id } });
  if (error) {
    logger.error(error.message);
    return {
      Error: error,
      Msg: "Error Deleting candidate status",
    };
  } else {
    logger.info("deleteCandidateStatus_exit");
    return {
      Error: null,
      Msg: "candidate status Deleted successfully",
    };
  }
};
