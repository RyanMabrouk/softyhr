"use server";
import deleteData from "@/api/deleteData";
import { getLogger } from "@/logging/log-util";
export default async function deleteFile(request_id: any) {
  const logger = getLogger("files");
  logger.info("deleteFile");
  const { error } = await deleteData("files", {
    match: { id: request_id },
  });
  if (error) {
    return {
      error: {
        message: error.message,
        type: "Server Error : Failed to Delete the Folder",
      },
    };
  }
  return { error: null };
}
