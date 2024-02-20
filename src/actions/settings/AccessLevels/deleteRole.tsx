"use server";
import deleteData from "@/api/deleteData";
import { getLogger } from "@/logging/log-util";
export default async function deleteRole({ role_id }: { role_id: number }) {
  const logger = getLogger("settings");
  logger.info("addEmployeeToRole_enter");
  const { error } = await deleteData("roles", {
    match: { role_id: role_id },
  });
  if (error) {
    logger.error(error);
    return {
      error: {
        message: error.message,
        type: "Server Error ",
      },
    };
  }
  return {
    error: null,
  };
}
