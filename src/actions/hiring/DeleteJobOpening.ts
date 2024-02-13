"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import deleteData from "@/api/deleteData";
import { getLogger } from "@/logging/log-util";

export const deleteJobOpening = async (id: Number) => {
  const logger = getLogger("hiring");
  logger.info("deleteJobOpening_enter");
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.from("Hiring").delete().eq("id", id);
  if (error) {
    logger.error(error.message);
    return {
      Error: error,
      Msg: "Error Deleting job opening",
    };
  } else {
  logger.info("deleteJobOpening_exit");
    return {
      Error: null,
      Msg: "job opening Deleted successfully",
    };
  }
};
