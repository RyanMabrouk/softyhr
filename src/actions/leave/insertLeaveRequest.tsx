"use server";
import getCurrentorg from "@/api/getCurrentOrg";
import postData from "@/api/postData";
import { getDaysInBetween } from "@/helpers/date";
import { database_profile_leave_balance_type } from "@/types/database.tables.types";
export default async function insertLeaveRequest(
  formData: FormData,
  user_id: string | string[],
  old_user_leave_balance: database_profile_leave_balance_type,
) {
  console.log("insertLeaveRequest");
  const start_at = formData.get("start_at") as string;
  const end_at = formData.get("end_at") as string;
  const durations = formData.getAll("duration_date");
  const total_duration = durations.reduce((acc, e) => acc + Number(e), 0);
  const policy_id = Number(formData.get("policy_id") as string);
  const org = await getCurrentorg();
  // Check if the user has a balance for the policy and get the balance
  const old_balance = old_user_leave_balance?.find(
    (e) => Number(e.policy_id) == policy_id,
  )?.balance;
  if (!old_balance) {
    return {
      error: {
        message: "You don't have a balance for this policy",
        type: "Input Error ",
      },
    };
  }
  // Insert the leave request
  const payload = {
    user_id: user_id,
    org_name: org?.name,
    start_at: start_at,
    end_at: end_at,
    policy_id: policy_id,
    note: formData.get("note") as string,
    balance: old_balance - total_duration,
    duration_used: getDaysInBetween(new Date(start_at), new Date(end_at)).map(
      (date: Date, index: number) => ({
        date: date,
        duration: durations[index],
      }),
    ),
  };
  const { error } = await postData("leave_requests", payload);
  if (error) {
    return {
      error: {
        message: error.message,
        type: "Server Error : Inserting Leave Request",
      },
    };
  } else {
    return { error: null };
  }
}
