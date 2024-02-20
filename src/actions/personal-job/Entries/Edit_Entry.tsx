"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { getLogger } from "@/logging/log-util";

interface EntryType {
  [key: string]: FormDataEntryValue | string;
}

export const Edit_Entry = async (
  formdata: FormData,
  champ: string,
  data: any,
  Entry_id: string,
) => {

  const logger = getLogger("*");

  logger.info("Edit_Entry_enter"); 
  let Newdata: EntryType = {}; 
  formdata?.forEach(function (value: FormDataEntryValue, key: string) { 
    Newdata[key] = value; 
  }); 

  const supabase = createServerActionClient({ cookies });     
  const NewData = data?.[champ]?.map((item: any) => {     
    if (item?.id == Entry_id) return { id: item?.id, ...Newdata };  
    return { ...item }; 
  }); 
  const { data: user_profile, error } = await supabase      
    .from("profiles")   
    .update({ [champ]: NewData })  
    .eq("user_id", data?.user_id)
    .select(); 
  
  if (error) {  
    logger.error(error?.message); 
    return { error: { Message: `Error Updating ${champ}`, Type: error } }; 
  } 
  logger.info("Edit_Entry_exit"); 

};
