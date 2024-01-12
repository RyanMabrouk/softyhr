"use server";
import getData from "@/api/getData";
import updateData from "@/api/updateData";
import { database_profile_leave_balance_type } from "@/types/database.tables.types";
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
  const { data: data, error } = await getData("profiles", {
    column: "leave_balance",
    match: { user_id: user_id },
  });
  const old_leave_balance: database_profile_leave_balance_type[] =
    data?.[0].leave_balance;
  if (error) {
    return {
      new_policy_balance: null,
      error: {
        message: error.message,
        type: "Server Error : Getting Old Leave Balance",
      },
    };
  } else {
    // get the changed leave balance
    const changed_leave_balance = old_leave_balance?.find(
      (e) => e.policy_id == policy_id,
    );
    if (!changed_leave_balance) {
      return {
        new_policy_balance: null,
        error: {
          message: "You don't have a balance for this policy",
          type: "Input Error ",
        },
      };
    }
    // get the unchanged leave balance
    const unchanged_leave_balance = old_leave_balance?.filter(
      (e) => !(e.policy_id == policy_id),
    );
    //
    const new_policy_balance =
      (changed_leave_balance?.balance ?? 0) + total_added_duration;
    // update the leave balance
    const newBalance = [
      ...unchanged_leave_balance,
      {
        policy_id: new_policy_id
          ? new_policy_id
          : policy_id ?? changed_leave_balance?.policy_id,
        categories_id: categories_id ?? changed_leave_balance?.categories_id,
        balance: new_policy_balance,
      },
    ];
    const { error } = await updateData(
      "profiles",
      { leave_balance: newBalance },
      { user_id: user_id },
    );
    if (error) {
      return {
        new_policy_balance: null,
        error: {
          message: error.message,
          type: "Server Error : Updating Leave Balance",
        },
      };
    } else {
      return { new_policy_balance: new_policy_balance, error: null };
    }
  }
}
