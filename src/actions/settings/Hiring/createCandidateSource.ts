"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import deleteData from "@/api/deleteData";
import { getLogger } from "@/logging/log-util";
import postData from "@/api/postData";
import {
  InsertSourcesType
} from "@/app/(dashboard)/Settings/(settings)/Jobs/types/status.types";
import getCurrentorg from "@/api/getCurrentOrg";

export const createCandidateSources = async (payload: InsertSourcesType) => {
  const logger = getLogger("hiring");
  logger.info("createCandidateSources_enter");
  const org = await getCurrentorg();
  const { error } = await postData("candidate_sources", [
    { ...payload, org_name: org?.name },
  ]);
  if (error) {
    logger.error(error.message);
    return {
      Error: error,
      message: error?.message?.includes(
        "candidate_sources_org_name_name_key",
      )
        ? `source already exist`
        : "Error creating candidate source",
    };
  } else {
    logger.info("createCandidateSources_exit");
    return {
      Error: null,
      message: "candidate source created successfully",
    };
  }
};
