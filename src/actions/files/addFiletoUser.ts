"use server";
import updateData from "@/api/updateData";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import getSession from "@/api/getSession";

export async function addFiletoUser(userId: any, newFileId: any) {
  const supabase = createServerActionClient({ cookies });

  const { data } = await supabase
    .from("profiles")
    .select("files_ids")
    .eq("user_id", userId);

  const oldFilesIds: any = data?.[0].files_ids;
  const { error } = await updateData(
    "profiles",
    { files_ids: [...oldFilesIds, newFileId] },
    { user_id: userId },
  );
  if (error) return error;
}
