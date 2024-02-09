"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

interface EntryType {
  [key: string]: FormDataEntryValue | string;
}

export const Delete_Entry = async (
  champ: string,
  data: any,
  Entry_id: string,
) => {
  //console.log(Entry_id, data?.[champ]?.filter(({id}:any)=> id != Entry_id));
  const NewData = data?.[champ]?.filter(({ id }: any) => id != Entry_id);
  const supabase = createServerActionClient({ cookies });
  const { data: user_profile, error } = await supabase
    .from("profiles")
    .update({ [champ]: NewData })
    .eq("user_id", data?.user_id)
    .select();
  console.error(error);
  if (error)
    return { error: { Message: `Error Deleting ${champ}`, Type: error } };
};
