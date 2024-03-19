"use server";
import updateData from "@/api/updateData";
import { getLogger } from "@/logging/log-util";
import getData from "@/api/getData";
export async function removeFileFromUser(userId: any, fileId: any) {
  const logger = getLogger("files");
  logger.info("removeFileFromUser");
  const { data } = await getData("users_permissions", {
    match: {
      user_id: userId,
    },
    column: "files_ids",
  });
  const oldFilesIds: any = data?.[0].files_ids;
  const newFilesIds = oldFilesIds.filter(
    (id: any) => String(id) != String(fileId),
  );
  const { error } = await updateData(
    "users_permissions",
    {
      files_ids: newFilesIds,
    },
    { user_id: userId },
  );
  if (error) return error;
  return null;
}
