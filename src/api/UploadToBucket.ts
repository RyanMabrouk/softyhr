"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export async function UploadToBucket({
  file,
  fileName,
  BucketName,
}: {
  file: string;
  fileName: string;
  BucketName: string;
}) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase.storage
    .from(BucketName)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });
  return { data, error };
}
