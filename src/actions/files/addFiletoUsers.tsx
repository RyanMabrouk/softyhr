"use server";
import { getLogger } from "@/logging/log-util";
import { addFiletoUser } from "./addFiletoUser";
export async function addFiletoUsers({
  users,
  fileId,
}: {
  users: { user_id: string }[];
  fileId: number;
}) {
  const logger = getLogger("files");
  logger.info("addFiletoUsers");
  const promises = users.map((user) => {
    return addFiletoUser(user.user_id, fileId);
  });
  const results = await Promise.all(promises);
  const error = results.find((result) => result);
  if (error) return error;
  return null;
}
