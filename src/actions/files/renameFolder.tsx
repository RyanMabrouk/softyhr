"use server";
import updateData from "@/api/updateData";
import { getLogger } from "@/logging/log-util";
export async function renameFolder(foldId: any, newName: string) {
  const logger = getLogger("files");
  logger.info("renameFolder");
  const { error } = await updateData(
    "folders",
    { name: newName },
    { id: +foldId },
  );
  if (error) return error;
}
