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
export const EditApplicationDetails = async (
  NewData: ObjectOfStrings,
  id: string | null,
) => {
  const logger = getLogger("hiring");
  logger.info("EditApplicationDetails_enter");
  const { error } = await updateData(
    "Hiring",
    {
      Application_Details: NewData,
    },
    { id },
  );
  if (error) {
    logger.error(error.message);
    return {
      error: { Message: `Error Updating Application details`, Type: error },
    };
  }
  logger.info("EditApplicationDetails_exit");
  return;
};
