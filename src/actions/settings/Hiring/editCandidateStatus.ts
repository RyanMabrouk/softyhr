"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import deleteData from "@/api/deleteData";
import { getLogger } from "@/logging/log-util";
import postData from "@/api/postData";
import updateData from "@/api/updateData";

export const editCandidateStatus = async (name: string ,id: string | number) => {
  const logger = getLogger("hiring");
  logger.info("editCandidateStatus_exit");
  const supabase = createServerActionClient({ cookies });
  const { error } = await updateData("candidate_statuses",[{name}], { id });
  if (error) {
    logger.error(error.message);
    return {
      Error: error,
      Msg: "Error Updating candidate status",
    };
  } else {
    logger.info("editCandidateStatus_exit");
    return {
      Error: null,
      Msg: "candidate status Updated successfully",
    };
  }
};
