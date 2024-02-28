"use server";
import updateData from "@/api/updateData";
import { getLogger } from "@/logging/log-util";
export default async function addEmployeeToRole({
  user_id,
  role_id,
}: {
  user_id: string;
  role_id: number;
}) {
  const logger = getLogger("settings");
  logger.info("addEmployeeToRole");
  const { error } = await updateData(
    "users_permissions",
    {
      role_id: role_id,
    },
    { user_id: user_id },
  );
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
