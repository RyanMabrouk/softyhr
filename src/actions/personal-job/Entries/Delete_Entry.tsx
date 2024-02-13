"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { getLogger } from "@/logging/log-util";

interface EntryType {
  [key: string]: FormDataEntryValue | string;
}

export const Delete_Entry = async (
  champ: string,
  data: any,
  Entry_id: string,
) => {
  
  const logger = getLogger("*"); 
  logger.info("Delete_Entry_enter"); 
  const NewData = data?.[champ]?.filter(({ id }: any) => id != Entry_id); 
  const supabase = createServerActionClient({ cookies });  
  const { data: user_profile, error } = await supabase 
    .from("profiles") 
    .update({ [champ]: NewData }) 
    .eq("user_id", data?.user_id) 
    .select();  
  if (error) { 
    logger.error(error?.message); 
    return { error: { Message: `Error Deleting ${champ}`, Type: error } }; 
  } 
  logger.info("Delete_Entry_exit"); 

};
