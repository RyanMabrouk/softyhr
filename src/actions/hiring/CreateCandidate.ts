"use server";
import { cookies, headers } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import getCurrentorg from "@/api/getCurrentOrg";
import { insert_CandidateType } from "@/types/candidate.types";
import { getLogger } from "@/logging/log-util";
import postData from "@/api/postData";

export const CreateCandidate = async (NewCandaidate: insert_CandidateType) => {
  const logger = getLogger("hiring");
  logger.info("CreateCandidate_enter");
  const supabase = createServerActionClient({ cookies });
  const org = await getCurrentorg();
  const { error } = await postData("candidates", [
    { ...NewCandaidate, org_name: org?.name },
  ]);
  if (error) {
    logger.error(error.message);
    return {
      Submitted: false,
      Error: error,
      Msg: error?.message?.includes("candidates_Email_key")
        ? "email already exist"
        : "Something went Wrong",
    };
  } else {
    logger.info("CreateCandidate_exit");
    return {
      Submitted: true,
      Error: null,
      Msg: "candidate added successfully",
    };
  }
};
