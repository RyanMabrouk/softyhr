"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function UploadImage(
  formdata: any,
  FileName: string,
  Bucketname: string,
  NameFormdata?: string,
) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase.storage
    .from(Bucketname)
    .upload(FileName, formdata.get(NameFormdata || "file"), {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) {
    return {
      uploaded: false,
      Message: "Something went wrong when uploading file",
      Type: error?.message,
    };
  }
  return { uploaded: true, Message: "file uploaded successfully" };
}
