"use server";
import updateData from "@/api/updateData";
import { getLogger } from "@/logging/log-util";

export async function moveFile(fileId: any, newFolderId: any) {
  const logger = getLogger("files");
  logger.info("moveFile");
  const { error } = await updateData(
    "files",
    { folderId: newFolderId },
    { id: +fileId },
  );
  if (error) return error;
}
