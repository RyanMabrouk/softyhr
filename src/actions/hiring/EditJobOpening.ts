"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

interface EntryType {
  [key: string]: FormDataEntryValue | string;
}

export const Edit_JobOpening = async (
  formdata: FormData,
  champ: string,
  id: string | null,
  JobStatus: string,
) => {
  let Newdata: EntryType = {};
  formdata?.forEach(function (value: FormDataEntryValue, key: string) {
    Newdata[key] = value;
  });
  const supabase = createServerActionClient({ cookies });
  let status = formdata.has("Job Status");
  const { data: user_profile, error } = await supabase
    .from("Hiring")
    .update({
      [champ]: Newdata,
      ["Job Status"]: status ? formdata.get("Job Status") : JobStatus,
    })
    .eq("id", id)
    .select();

  if (error)
    return { error: { Message: `Error Updating ${champ}`, Type: error } };
};
