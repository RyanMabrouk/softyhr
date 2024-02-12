"use server";
import getData from "@/api/getData";
import updateData from "@/api/updateData";
import { getPolicyType } from "./getPolicyType";
import { getLogger } from "@/logging/log-util";
export default async function updateLeaveBalance({
  user_id,
  policy_id,
  categories_id,
  total_added_duration,
  new_policy_id,
}: {
  user_id: string | string[];
  policy_id: number;
  total_added_duration: number;
  categories_id?: number;
  new_policy_id?: number;
}) {
  const logger = getLogger("*");
  logger.info(
    "updating Leave Balance for ",
    user_id,
    " by ",
    total_added_duration,
    " policy => ",
    policy_id,
  );
  // get the new policy type
  const { policy_type: new_policy_type, error: error2 } = new_policy_id
    ? await getPolicyType({ policy_id: new_policy_id })
    : { policy_type: null, error: null };
  if (error2) {
    logger.error(error2.message);
    return {
      new_policy_balance: null,
      error: {
        message: error2.message,
        type: "Server Error : Getting New Policy Type",
      },
    };
  }
  // get the current user leave balance
  const { data: data, error: error1 } = await getData("leave_balance", {
    match: { user_id: user_id, policy_id: policy_id },
  });
  if (error1) {
    logger.error(error1.message);
    return {
      new_policy_balance: null,
      error: {
        message: error1.message,
        type: "Server Error : Getting Old Leave Balance",
      },
    };
  }
  const old_leave_balance = data?.[0];
  const new_policy_balance = old_leave_balance?.balance + total_added_duration;
  const { error } = await updateData(
    "leave_balance",
    {
      policy_id: new_policy_id
        ? new_policy_id
        : policy_id ?? old_leave_balance?.policy_id,
      categories_id: categories_id ?? old_leave_balance?.categories_id,
      balance: new_policy_type === "unlimited" ? 0 : new_policy_balance,
    },
    { user_id: user_id, policy_id: policy_id },
  );
  if (error) {
    logger.error(error.message);
    return {
      new_policy_balance: null,
      error: {
        message: error.message,
        type: "Server Error : Updating Leave Balance",
      },
    };
  }
  return { new_policy_balance: new_policy_balance, error: null };
}
