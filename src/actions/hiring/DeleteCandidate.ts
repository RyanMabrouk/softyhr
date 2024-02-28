"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import deleteData from "@/api/deleteData";
import { getLogger } from "@/logging/log-util";

export const deleteCandidate = async (id: Number) => {
  const logger = getLogger("hiring");
  logger.info("deleteCandidate_enter");
  const supabase = createServerActionClient({ cookies });
  const { error } = await deleteData("candidates", {match: {id}});
  if (error) {
    logger.error(error.message);
    return {
      Error: error,
      Msg: "Error Deleting candidate",
    };
  } else {
    logger.info("deleteCandidate_exit");
    return {
      Error: null,
      Msg: "candidate Deleted successfully",
    };
  }
};
