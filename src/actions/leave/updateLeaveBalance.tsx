"use server";
import getData from "@/api/getData";
import updateData from "@/api/updateData";
import { database_leave_policies_policy_type } from "@/types/database.tables.types";
export default async function updateLeaveBalance({
  user_id,
  policy_id,
  categories_id,
  total_added_duration,
  new_policy_id,
}: {
  user_id: string | string[];
  policy_id: number;
  categories_id?: number;
  total_added_duration: number;
  new_policy_id?: number;
}) {
  // get the current user leave balance
  const { data: data, error: error1 } = await getData("leave_balance", {
    match: { user_id: user_id, policy_id: policy_id },
  });
  if (error1) {
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
      balance: new_policy_balance,
    },
    { user_id: user_id, policy_id: policy_id },
  );
  if (error) {
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
