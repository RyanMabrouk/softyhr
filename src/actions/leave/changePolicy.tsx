"use server";
import updateLeaveBalance from "./updateLeaveBalance";
export default async function changePolicy({
  new_policy_id,
  old_policy_id,
  user_id,
}: {
  new_policy_id: string | number;
  user_id: string | string[];
  old_policy_id: number;
}) {
  const { error: balance_error } = await updateLeaveBalance({
    user_id: user_id,
    policy_id: Number(old_policy_id),
    total_added_duration: 0,
    new_policy_id: Number(new_policy_id),
  });
  if (balance_error) {
    return {
      error: {
        message: balance_error.message,
        type: "Server Error : changing balance",
      },
    };
  }
  return {
    error: null,
  };
}
