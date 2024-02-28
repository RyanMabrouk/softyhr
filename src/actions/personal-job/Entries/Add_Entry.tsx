"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { getLogger } from "@/logging/log-util";

interface EntryType {
  [key: string]: FormDataEntryValue | string;
}

export const Add_Entry = async (
  formdata: FormData,
  champ: string,
  data: any,
) => {
  const logger = getLogger("*");
  logger.info("Add_Entry_enter");
  let Newdata: EntryType = {};
  formdata?.forEach(function (value: FormDataEntryValue, key: string) {
    Newdata[key] = value;
  });
  const supabase = createServerActionClient({ cookies }); 
  const { error } = await supabase 
    .from("profiles") 
    .update({ 
      [champ]: [...(data?.[champ] || []), { ...Newdata, id: uuidv4() }], 
    }) 
    .eq("user_id", data?.user_id) 
    .select(); 
  if (error) { 
    logger.error(error?.message); 
    return { error: { Message: `Error Adding ${champ}`, Type: error } }; 
  }
  logger.info("Add_Entry_exit"); 
};
