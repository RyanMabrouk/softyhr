"use server";
import getData from "@/api/getData";
import updateData from "@/api/updateData";
import { getDaysInBetween } from "@/helpers/date.helpers";
import {
  database_leave_request_status_type,
  database_leave_requests_insert_type,
  database_profile_leave_balance_type,
} from "@/types/database.tables.types";
import updateLeaveBalance from "./updateLeaveBalance";
export default async function updateLeaveRequest({
  formData,
  user_id,
  old_request,
}: {
  formData: FormData;
  user_id: string | string[];
  old_request: database_leave_requests_insert_type;
}) {
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
  const status: database_leave_request_status_type | undefined | string =
    old_request?.status;
  // Check if the leave request was approved
  if (status == "approved") {
    // Get the total duration of the old leave request
    const old_leave_request_total_duration = old_request?.duration_used.reduce(
      (acc: number, duration: any) => acc + Number(duration.duration),
      0,
    );
    // Update the leave balance
    const { error: error1 } = await updateLeaveBalance({
      user_id: user_id,
      policy_id: policy_id,
      categories_id: categories_id[0].categories_id,
      total_added_duration: old_leave_request_total_duration - total_duration,
    });
    if (error1) {
      return {
        error: error1,
      };
    }
  }
  return { error: null };
}
