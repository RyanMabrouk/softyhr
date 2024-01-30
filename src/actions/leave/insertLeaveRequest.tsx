"use server";
import getCurrentorg from "@/api/getCurrentOrg";
import getData from "@/api/getData";
import postData from "@/api/postData";
import { getDaysInBetween } from "@/helpers/date.helpers";
import { database_leave_policies_policy_type } from "@/types/database.tables.types";
import { getPolicyType } from "./getPolicyType";
export default async function insertLeaveRequest({
  formData,
  user_id,
}: {
  formData: FormData;
  user_id: string | string[];
}) {
  console.log("🚀 ~ insertLeaveRequest");
  const start_at = formData.get("start_at") as string;
  const end_at = formData.get("end_at") as string;
  const durations = formData.getAll("duration_date");
  const policy_id = Number(formData.get("policy_id") as string);
  const org = await getCurrentorg();
  // get the total duration of the leave request
  const total_duration = durations.reduce((acc, e) => acc + Number(e), 0);
  // get the type of the leave policy
  const { error: error0, policy_type: type } = await getPolicyType({
    policy_id: policy_id,
  });
  if (error0) {
    return {
      error: {
        message: error0.message,
        type: "Server Error : Getting Policy Type",
      },
    };
  }
  // get the current user profile
  const { data: data, error: error1 } = await getData("leave_balance", {
    match: { user_id: user_id, policy_id: policy_id },
  });
  const old_balance: number = data?.[0]?.balance;
  if (error1) {
    return {
      error: {
        message: error1.message,
        type: "Server Error : Getting Old Leave Balance",
      },
    };
  }
  // Check if the user has a balance for the policy and get the balance
  if (old_balance === undefined) {
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
    balance:
      type === "unlimited"
        ? old_balance + total_duration
        : old_balance - total_duration,
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
  }
  return { error: null };
}
