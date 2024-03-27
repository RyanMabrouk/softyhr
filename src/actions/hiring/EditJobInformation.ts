"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getLogger } from "@/logging/log-util";
import updateData from "@/api/updateData";
interface EntryType {
  [key: string]: FormDataEntryValue | string;
}
export const EditJobInformation = async (
  formdata: FormData,
  champ: string,
  id: string | null,
  JobStatus: string,
) => {
  const logger = getLogger("hiring");
  logger.info("EditJobInformation_enter");
  let Newdata: EntryType = {};
  formdata?.forEach(function (value: FormDataEntryValue, key: string) {
    Newdata[key] = value;
  });
  let status = formdata.has("Job Status");
  const { error } = await updateData(
    "Hiring",
    {
      [champ]: Newdata,
      Department_id: formdata?.get("Department"),
      ["Job Status"]: status ? formdata.get("Job Status") : JobStatus,
    },
    { id },
  );
  if (error) {
    logger.error(error.message);
    return { error: { Message: `Error Updating ${champ}`, Type: error } };
  }
  logger.info("EditJobInformation_exit");
  return;
};
