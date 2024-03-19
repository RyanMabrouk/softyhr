"use server";
import { getLogger } from "@/logging/log-util";
import { addFilestoUser } from "./addFilestoUser";
export async function shareFilestoUsers({
  users,
  fileIds,
}: {
  users: { user_id: string }[];
  fileIds: number[];
}) {
  const logger = getLogger("files");
  logger.info("shareFilestoUsers");
  const promises = users.map((user) => {
    return addFilestoUser(user.user_id, fileIds);
  });
  const results = await Promise.all(promises);
  const error = results.find((result) => result);
  if (error) return error;
  return null;
}
