"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import deleteData from "@/api/deleteData";
import { getLogger } from "@/logging/log-util";

export const deleteJobOpening = async (id: Number) => {
  const logger = getLogger("hiring");
  logger.info("deleteJobOpening");
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.from("Hiring").delete().eq("id", id);
  console.error(error);
  if (error) {
    logger.error(error.message);
    return {
      Error: error,
      Msg: "Error Deleting job opening",
    };
  } else {
    return {
      Error: null,
      Msg: "job opening Deleted successfully",
    };
  }
};
