"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import deleteData from "@/api/deleteData";
import { getLogger } from "@/logging/log-util";
import postData from "@/api/postData";
import {
  InsertStatusType,
  statusType,
} from "@/app/(dashboard)/Settings/(settings)/Jobs/types/status.types";
import getCurrentorg from "@/api/getCurrentOrg";

export const createCandidateStatus = async (payload: InsertStatusType) => {
  const logger = getLogger("hiring");
  logger.info("createCandidateStatus_enter");
  const org = await getCurrentorg();
  const { error } = await postData("candidate_statuses", [
    { ...payload, org_name: org?.name },
  ]);
  if (error) {
    logger.error(error.message);
    return {
      Error: error,
      message: error?.message?.includes(
        "candidate_statuses_org_name_group_name_name_key",
      )
        ? `status already exist in ${payload}`
        : "Error creating candidate status",
    };
  } else {
    logger.info("createCandidateStatus_exit");
    return {
      Error: null,
      message: "candidate status created successfully",
    };
  }
};
