"use server";
import updateData from "@/api/updateData";
import { getLogger } from "@/logging/log-util";
import getData from "@/api/getData";
export async function removeFileFromUser(userId: any, fileId: any) {
  const logger = getLogger("files");
  logger.info("removeFileFromUser");
  const { data } = await getData("permissions", {
    match: {
      user_id: userId,
    },
    column: "files_ids",
  });
  const oldFilesIds: any = data?.[0].files_ids;
  const test = [
    oldFilesIds,
    oldFilesIds.filter((id: any) => id !== Number(fileId)),
  ];
  const { error } = await updateData(
    "permissions",
    { files_ids: oldFilesIds.filter((id: any) => id !== Number(fileId)) },
    { user_id: userId },
  );
  if (error) return error;
  return test;
}
