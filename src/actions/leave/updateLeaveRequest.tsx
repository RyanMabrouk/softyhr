"use server";
import getData from "@/api/getData";
import updateData from "@/api/updateData";
import { getDaysInBetween } from "@/helpers/date";
import { database_leave_requests_insert_type } from "@/types/database.tables.types";
export default async function updateLeaveRequest(
  formData: FormData,
  user_id: string | string[],
  old_request: database_leave_requests_insert_type,
  old_user_leave_balance: { [key: string]: any }[],
) {
  console.log("updateLeaveRequest");
  const start_at = formData.get("start_at") as string;
  const end_at = formData.get("end_at") as string;
  const durations = formData.getAll("duration_date");
  const total_duration = durations.reduce((acc, e) => acc + Number(e), 0);
  const policy_id = Number(formData.get("policy_id") as string);
  // Get the category of the policy
  const { data: categories_id, error: categories_error } = await getData(
    "leave_policies",
    {
      match: { id: policy_id },
      column: "categories_id",
    },
  );
  // Check if the policy has a category
  if (categories_error) {
    return {
      error: {
        message: categories_error.message,
        type: "Server Error : category invalid",
      },
    };
  }
  // Update the leave request
  const payload = {
    start_at: start_at,
    end_at: end_at,
    policy_id: policy_id,
    note: formData.get("note") as string,
    duration_used: getDaysInBetween(new Date(start_at), new Date(end_at)).map(
      (date: Date, index: number) => ({
        date: date,
        duration: durations[index],
      }),
    ),
  };
  const { error } = await updateData("leave_requests", payload, {
    id: Number(old_request.id),
  });
  if (error) {
    return {
      error: {
        message: error.message,
        type: "Server Error : Updating Leave Request",
      },
    };
  }
  // Check if the leave request is approved
  if (old_request?.status == "approved") {
    // Update the leave balance
    // Get the total duration of the old leave request
    const old_leave_request_total_duration = old_request?.duration_used.reduce(
      (acc: number, duration: any) => acc + Number(duration.duration),
      0,
    );
    // Check if the user has a balance for the policy
    const unchanged_balance = old_user_leave_balance?.filter(
      (e) => e.policy_id != policy_id,
    );
    const changed_balance = old_user_leave_balance?.find(
      (e) => e.policy_id == policy_id,
    );
    // Calculate the new balance
    const new_balance =
      Number(changed_balance?.balance) +
      (Number(old_leave_request_total_duration) - total_duration);
    // Update the leave balance
    const balance = [
      ...unchanged_balance,
      {
        policy_id: policy_id,
        categories_id: categories_id[0].categories_id,
        balance: new_balance,
      },
    ];
    const { error: error2 } = await updateData(
      "profiles",
      { leave_balance: balance },
      {
        user_id: user_id,
      },
    );
    if (error2) {
      return {
        error: {
          message: error2.message,
          type: "Server Error : Adjusting Leave Balance",
        },
      };
    } else {
      return { error: null };
    }
  }
  return { error: null };
}
