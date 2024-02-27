"use server";
import { cookies, headers } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Hiring_type } from "@/types/database.tables.types";
import { getLogger } from "@/logging/log-util";

export const CreateJobOpening = async (
  NewJob: Hiring_type,
  ApllymentForm: any,
) => {
  const supabase = createServerActionClient({ cookies });
  const logger = getLogger("hiring");
  /*const { error: error_add_form, data } = await supabase
    .from("Job_Applyment_Form")
    .insert([ApllymentForm]);*/
  logger.info("CreateJobOpening_enter");
  const { error } = await supabase.from("Hiring").insert([NewJob]);
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
