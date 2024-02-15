"use server";
import { usersWithoutCurrentId } from "@/app/_ui/_PopUp/components/Settings/TimeOff/components/SwitchEmployeesDragAndDrop/SwitchEmployeesDragAndDrop";
import { getLogger } from "@/logging/log-util";
import addEmployeeToRole from "./addEmployeeToRole";
export default async function addEmployeesToRole({
  users,
  role_id,
}: {
  users: usersWithoutCurrentId[];
  role_id: number;
}) {
  const logger = getLogger("settings");
  logger.info("addEmployeesToRole");
  const promises = users.map(async (user) => {
    const { error } = await addEmployeeToRole({
      user_id: user.user_id,
      role_id,
    });
    if (error) {
      return error;
    }
  });
  const results = await Promise.all(promises);
  const errors = results.filter((result) => result !== undefined);
  if (errors.length > 0) {
    logger.error(errors);
    return {
      error: errors?.[0],
    };
  }
  return {
    error: null,
  };
}
