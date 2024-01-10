"use server";
import updateData from "@/api/updateData";
import {
  database_leave_request_status_type,
  database_leave_requests_type,
} from "@/types/database.tables.types";
import updateLeaveBalance from "./updateLeaveBalance";

export default async function cancelLeaveRequest({
  leave_request,
  user_id,
}: {
  leave_request: database_leave_requests_type;
  user_id: string | string[];
}) {
  console.log("cancelLeaveRequest");
  // if the leave request is approved then remove it from the leave balance
  if (leave_request.status === "approved") {
    const request_duration = leave_request.duration_used.reduce(
      (acc: number, e: any) => acc + Number(e.duration),
      0,
    );
    const { error: balance_error } = await updateLeaveBalance({
      user_id: user_id,
      policy_id: leave_request.policy_id,
      total_added_duration: request_duration,
    });
    if (balance_error) {
      return { error: balance_error };
    }
  }
  // update the leave request status
  const stauts: database_leave_request_status_type = "canceled";
  const { error } = await updateData(
    "leave_requests",
    { status: stauts },
    {
      id: leave_request.id,
    },
  );
  if (error) {
    return {
      error: {
        message: error.message,
        type: "Server Error : Updating Leave Request",
      },
    };
  } else {
    return { error: null };
  }
}
