"use server";

import updateData from "@/api/updateData";
import { database_leave_request_status_type } from "@/types/database.tables.types";

export default async function cancelLeaveRequest(
  formData: FormData,
  leave_request_id: number,
) {
  console.log("cancelLeaveRequest");
  const stauts: database_leave_request_status_type = "canceled";
  const { error } = await updateData(
    "leave_requests",
    { status: stauts },
    {
      id: Number(leave_request_id),
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
