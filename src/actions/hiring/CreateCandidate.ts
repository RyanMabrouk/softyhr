'use server';
import { cookies, headers } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export const CreateCandidate =async(NewCandaidate:any)=>{
  const supabase = createServerActionClient({ cookies });
  console.log(NewCandaidate);
    const { data, error } = await supabase
     .from('candidates')
     .insert([NewCandaidate])
     .select()
    if(error){
        return {
         Error: "Application submitted successfully",
     }
    }
    else{
      return {
         Msg: "Application submitted successfully",
     } }
}