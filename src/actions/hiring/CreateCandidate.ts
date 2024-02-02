"use server";
import { cookies, headers } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import getCurrentorg from "@/api/getCurrentOrg";
import { insert_CandidateType } from "@/types/candidate.types";

export const CreateCandidate = async (NewCandaidate: insert_CandidateType) => {
  const supabase = createServerActionClient({ cookies });
  const org = await getCurrentorg();
  console.log(NewCandaidate);
  const { data, error } = await supabase
    .from("candidates")
    .insert([{ ...NewCandaidate, org_name: org?.name }])
    .select();
  console.log("data", data);
  console.log(error);
  if (error) {
    return {
      Submitted: false,
      Error: error,
      Msg: error?.message?.includes("candidates_Email_key")
        ? "email already exist"
        : "Something went Wrong",
    };
  } else {
    return {
      Submitted: true,
      Error: null,
      Msg: "candidate added successfully",
    };
  }
};
