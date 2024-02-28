"use server";
import updateData from "@/api/updateData";
import { getLogger } from "@/logging/log-util";

export async function renameFile(fileId: any, newName: string) {
  const logger = getLogger("files");
  logger.info("renameFile");
  const { error } = await updateData(
    "files",
    { name: newName },
    { id: +fileId },
  );
  if (error) return error;
}
