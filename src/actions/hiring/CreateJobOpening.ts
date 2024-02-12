"use server";
import { cookies, headers } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Hiring_type } from "@/types/database.tables.types";
import { getLogger } from "@/logging/log-util";

export const CreateJobOpening = async (NewJob: Hiring_type) => {
  const supabase = createServerActionClient({ cookies });
  const logger = getLogger("hiring");
  logger.info("CreateJobOpening");
  const { error } = await supabase.from("Hiring").insert([NewJob]);
  if (error) {
    logger.error(error.message);
    return {
      Error: error,
      Msg: "Error creating job opening",
    };
  } else {
    return {
      Error: null,
      Msg: "job opening created successfully",
    };
  }
};
