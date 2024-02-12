"use server";
import { cookies, headers } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import getCurrentorg from "@/api/getCurrentOrg";
import { insert_CandidateType } from "@/types/candidate.types";
import { getLogger } from "@/logging/log-util";

export const CreateCandidate = async (NewCandaidate: insert_CandidateType) => {
  const logger = getLogger("hiring");
  logger.info("CreateCandidate");
  const supabase = createServerActionClient({ cookies });
  const org = await getCurrentorg();
  const { error } = await supabase
    .from("candidates")
    .insert([{ ...NewCandaidate, org_name: org?.name }]);
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
    return {
      Submitted: true,
      Error: null,
      Msg: "candidate added successfully",
    };
  }
};
