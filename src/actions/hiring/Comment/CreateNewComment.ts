"use server";
import { cookies, headers } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import getCurrentorg from "@/api/getCurrentOrg";
import { insert_CandidateType } from "@/types/candidate.types";

export const CreateNewComment = async (
  NewComment: string,
  comment_Author: string,
  candidate_id: string,
  reply_id?: string,
) => {
  const supabase = createServerActionClient({ cookies });
  const org = await getCurrentorg();

  const { data, error } = await supabase
    .from("candidate_comments")
    .insert([
      {
        comment_content: NewComment,
        org_name: org?.name,
        reply_id,
        comment_Author,
        candidate_id,
      },
    ])
    .select();

  if (error) {
    return {
      Submitted: false,
      Error: error,
      message: "Something went Wrong",
    };
  } else {
    return {
      Submitted: true,
      Error: null,
      message: "comment added successfully",
    };
  }
};
