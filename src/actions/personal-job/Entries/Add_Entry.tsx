'use server';
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

interface EntryType {
    [key:string]:FormDataEntryValue | string;
}

export const Add_Entry=async(formdata:FormData, champ:string, data:any)=>{
    let Newdata: EntryType = {};
    formdata?.forEach(function(value:FormDataEntryValue, key:string){
            Newdata[key] = value;
    }); 
    const supabase = createServerActionClient({ cookies });
    console.log('user_id',data?.user_id);
    const { data: user_profile, error } = await supabase
      .from('profiles')
      .update({[champ]:[...(data?.[champ] || []),{...Newdata,id:uuidv4()}]})
      .eq('user_id',data?.user_id)
      .select()
      console.log(error);
      if(error) return { error:{ Message: `Error Adding ${champ}`, Type:error }}
      
}   