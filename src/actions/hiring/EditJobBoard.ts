"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getLogger } from "@/logging/log-util";
import updateData from "@/api/updateData";
import { Application_Details_type } from "@/types/database.tables.types";
import { ObjectOfStrings } from "@/app/(dashboard)/Hiring/jobs/add/context/StepsContext";
interface EntryType {
  [key: string]: FormDataEntryValue | string;
}
export const EditJobBoard = async (JobBoard: string, id: string | null) => {
  const logger = getLogger("hiring");
  logger.info("EditjobBoards_enter");
  const { error } = await updateData(
    "Hiring",
    {
      job_Boards: JobBoard,
    },
    { id },
  );
  if (error) {
    logger.error(error.message);
    return {
      error: { Message: `Error Updating job boards`, Type: error },
    };
  }
  logger.info("EditjobBoards_exit");
  return;
};
