"use server";
import updateData from "@/api/updateData";
import { getLogger } from "@/logging/log-util";
import getData from "@/api/getData";
export async function addFiletoUser(userId: any, newFileId: any) {
  const logger = getLogger("files");
  logger.info("addFiletoUser");
  const { data } = await getData("permissions", {
    match: {
      user_id: userId,
    },
    column: "files_ids",
  });
  const oldFilesIds: any = data?.[0].files_ids;
  const { error } = await updateData(
    "permissions",
    { files_ids: [...oldFilesIds, newFileId] },
    { user_id: userId },
  );
  if (error) return error;
}
