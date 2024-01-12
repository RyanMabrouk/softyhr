"use server ";
import updateLeaveBalance from "./updateLeaveBalance";
export default async function changePolicy({
  formData,
  policy_id,
  user_id,
}: {
  formData: FormData;
  user_id: string | string[];
  policy_id: number;
}) {
  const new_policy_id = formData.get("policy_id") as string;
  const { error: balance_error } = await updateLeaveBalance({
    user_id: user_id,
    policy_id: Number(policy_id),
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
