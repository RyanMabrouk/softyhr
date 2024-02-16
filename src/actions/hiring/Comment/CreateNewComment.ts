"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import getCurrentorg from "@/api/getCurrentOrg";
import { getLogger } from "@/logging/log-util";
export const CreateNewComment = async (
  NewComment: string,
  comment_Author: string,
  candidate_id: string,
  reply_id?: string,
) => {
  const logger = getLogger("hiring");
  logger.info("CreateNewComment_enter");
  const supabase = createServerActionClient({ cookies });
  const org = await getCurrentorg();
  const { error } = await supabase.from("candidate_comments").insert([ 
    { 
      comment_content: NewComment, 
      org_name: org?.name, 
      reply_id,   
      comment_Author, 
      candidate_id, 
    }, 
  ]); 
  if (error) { 
    logger.error(error.message);
    return {
      Submitted: false,
      Error: error, 
      message: "Something went Wrong",
    };
  } else {
  logger.info("CreateNewComment_exit");
    return {
      Submitted: true,
      Error: null,
      message: "comment added successfully",
    };
  }
};
