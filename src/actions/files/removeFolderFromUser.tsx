"use server";
import updateData from "@/api/updateData";
import { getLogger } from "@/logging/log-util";
import getData from "@/api/getData";
export async function removeFolderFromUser(userId: string, fileIds: number[]) {
  console.log("🚀 ~ removeFolderFromUser ~ userId:", userId)
  console.log("🚀 ~ removeFolderFromUser ~ fileIds:", fileIds)
  const logger = getLogger("files");
  logger.info("removeFolderFromUser");
  const { data } = await getData("users_permissions", {
    match: {
      user_id: userId,
    },
    column: "files_ids",
  });
  const oldFilesIds: any = data?.[0].files_ids;
  console.log("🚀 ~ removeFolderFromUser ~ oldFilesIds:", oldFilesIds)
  const newFilesIds = oldFilesIds.filter(
    (id: number | string) => !fileIds.includes(Number(id)),
  );
  console.log("🚀 ~ removeFolderFromUser ~ newFilesIds:", newFilesIds)
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
