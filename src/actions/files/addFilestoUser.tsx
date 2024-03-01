"use server";
import getData from "@/api/getData";
import updateData from "@/api/updateData";
import { getLogger } from "@/logging/log-util";

export async function addFilestoUser(user_id: string, fileIds: number[]) {
  const logger = getLogger("files");
  logger.info("addFilestoUser");
  const { data } = await getData("users_permissions", {
    match: {
      user_id: user_id,
    },
    column: "files_ids",
  });
  const oldFilesIds: string[] | number[] = data?.[0]?.files_ids ?? [];
  const newFilesIds = [...oldFilesIds, ...fileIds];
  const { error } = await updateData(
    "users_permissions",
    { files_ids: newFilesIds },
    { user_id: user_id },
  );
  if (error) return error;
  return null;
}
