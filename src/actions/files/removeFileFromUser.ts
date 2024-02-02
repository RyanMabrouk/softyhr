"use server";
import updateData from "@/api/updateData";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function removeFileFromUser(userId: any, fileId: any) {
  const supabase = createServerActionClient({ cookies });

  const { data } = await supabase
    .from("profiles")
    .select("files_ids")
    .eq("user_id", userId);

  const oldFilesIds: any = data?.[0].files_ids;
  const test = [
    oldFilesIds,
    oldFilesIds.filter((id: any) => id !== Number(fileId)),
  ];
  const { error } = await updateData(
    "profiles",
    { files_ids: oldFilesIds.filter((id: any) => id !== Number(fileId)) },
    { user_id: userId },
  );
  if (error) return error;
  return test;
}
