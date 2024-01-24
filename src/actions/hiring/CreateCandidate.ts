"use server";
import { cookies, headers } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import getCurrentorg from "@/api/getCurrentOrg";

export const CreateCandidate = async (NewCandaidate: any) => {
  const supabase = createServerActionClient({ cookies });
  const org = await getCurrentorg();

  const { data, error } = await supabase
    .from("candidates")
    .insert([{...NewCandaidate, org_name: org?.name}])
    .select();
  console.log("data", data);
  console.log(error);
  if (error) {
    return {
      Submitted:false,
      Error: error ,
      Msg:"Something went Wrong"
    };
  } else {
    return {
      Submitted: true,
      Error: null,
      Msg: "candidate added successfully",
    };
  }
};
