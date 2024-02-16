"use server";
import { getLogger } from "@/logging/log-util";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function UploadImage(
  formdata: any,
  FileName: string,
  Bucketname: string,
  NameFormdata?: string,
) {
  const logger = getLogger("*"); 
  logger.info("UploadImage_enter"); 
  const supabase = createServerActionClient({ cookies }); 
  const { data, error } = await supabase.storage 
    .from(Bucketname) 
    .upload(FileName, formdata.get(NameFormdata || "file"), {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) {
    logger.error(error.message);
    return {
      uploaded: false,
      Message: "Something went wrong when uploading file",
      Type: error?.message,
    };
  }
  logger.info("UploadImage_exit"); 
  return { uploaded: true, Message: "file uploaded successfully" };
}
