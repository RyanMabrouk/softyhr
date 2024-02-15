"use server";
import addLeavePolicy from "@/actions/leave/addLeavePolicy";
import changePolicy from "@/actions/leave/changePolicy";
import { usersWithoutCurrentId } from "@/app/_ui/_PopUp/components/Settings/TimeOff/components/SwitchEmployeesDragAndDrop/SwitchEmployeesDragAndDrop";
import { getLogger } from "@/logging/log-util";
export default async function addEmployeesToPolicy({
  users,
  policy_id,
  categories_id,
}: {
  users: usersWithoutCurrentId[];
  policy_id: number;
  categories_id: number;
}) {
  const logger = getLogger("settings");
  logger.info("addEmployeesToPolicy");
  const promises = users.map(async (user) => {
    const { error } = user.current_id
      ? await changePolicy({
          old_policy_id: user.current_id,
          user_id: user.user_id,
          new_policy_id: policy_id,
        })
      : await addLeavePolicy({
          policy_id: policy_id,
          categories_id: categories_id,
          user_id: user.user_id,
        });
    if (error) {
      return {
        error: {
          message: error.message,
          type: error.type,
        },
      };
    }
  });
  const results = await Promise.all(promises);
  const errors = results.filter((result) => result && result.error);
  if (errors.length > 0) {
    logger.error(errors?.[0]?.error.message);
    return {
      error: errors?.[0]?.error,
    };
  }
  return {
    error: null,
  };
}
