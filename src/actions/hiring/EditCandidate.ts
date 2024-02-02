"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

interface EntryType {
  [key: string]: FormDataEntryValue | string;
}

export const EditCandidateStatus = async (
  id: string ,
  NewStatus: string,
) => {
  const supabase = createServerActionClient({ cookies });
  const { data: user_profile, error } = await supabase
    .from("candidates")
    .update({"status": NewStatus})
    .eq("id", id)
    .select();

  if (error)
    return { error: { Message: `Error Updating Candidate Status`, Type: error } };
  else 
  return { error: null , Message:"Candidate Status Updated Successfully"}
};
