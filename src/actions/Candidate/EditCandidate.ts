"use server";
import postData from "@/api/postData";
import updateData from "@/api/updateData";
import { getLogger } from "@/logging/log-util";
export default async function EditCandidate(
  status: string,
  comment: string,
  id: string | null,
) {
  const logger = getLogger("*");
  logger.info("EditCandidate");
  const { error } = await updateData(
    "candidates",
    { status },
    {
      id: id,
    },
  );
  if (error) {
    return {
      status: "fail",
      error: error?.hint,
      Message: "Error Updating Status",
    };
  }
  const { error: comment_error } = await postData("candidate_comments", {
    comment_content: comment,
    candidate_id: id,
  });
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
