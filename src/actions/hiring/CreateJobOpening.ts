"use server";
import { cookies, headers } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Hiring_type } from "@/types/database.tables.types";
import { getLogger } from "@/logging/log-util";
import postData from "@/api/postData";

export const CreateJobOpening = async (NewJob: Hiring_type, ApllymentForm:any) => {
  console.log(ApllymentForm);
  const supabase = createServerActionClient({ cookies });
  const logger = getLogger("hiring"); 

  logger.info("CreateJobOpening_enter");
  const { error } = await postData("Hiring",[NewJob]);
  if (error) {
    logger.error(error.message);
    return {
      Error: error,
      Msg: "Error creating job opening",
    };
  } else {
  logger.info("CreateJobOpening_exit");
    return {
      Error: null,
      Msg: "job opening created successfully",
    };
  }
};
