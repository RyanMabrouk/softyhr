"use server";
import getCurrentorg from "@/api/getCurrentOrg";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function EditCandidate(
  status: string,
  comment: string,
  id: string | null,
) {
  const supabase = createServerActionClient({ cookies });
  const org = await getCurrentorg();

  const { data, error } = await supabase
    .from("candidates")
    .update({ status })
    .eq("id", id)
    .select();

  if (error) {
    return {
      status: "fail",
      error: error?.hint,
      Message: "Error Updating Status",
    };
  }
  
  const { data: comment_data, error: comment_error } = await supabase
    .from("candidate_comments")
    .insert({ comment_content: comment, candidate_id: id })
    .select();

  if (comment_error) {
    return {
      status: "fail",
      error: comment_error?.hint,
      Message: "Error Updating Status",
    };
  }
  
  return {
    status: "success",
    error: null,
    Message: "Candidate Updated Successfully !",
  };
}
