"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getLogger } from "@/logging/log-util";
import updateData from "@/api/updateData";
export const EditCandidateStatus = async (id: string, NewStatus: string) => {

  const logger = getLogger("hiring");
  logger.info("EditCandidateStatus_enter"); 
  const supabase = createServerActionClient({ cookies }); 
  const { error } = await updateData("candidates", { status: NewStatus },{id});

  if (error) {   
    logger.error(error.message); 
    return {   
      error: { Message: `Error Updating Candidate Status`, Type: error }, 
    }; 
  } else { 
  logger.info("EditCandidateStatus_exit"); 
    return { error: null, Message: "Candidate Status Updated Successfully" }; 
  }
};
