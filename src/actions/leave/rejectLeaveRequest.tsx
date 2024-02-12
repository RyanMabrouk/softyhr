"use server";
import updateData from "@/api/updateData";
import { getLogger } from "@/logging/log-util";
import { database_leave_request_status_type } from "@/types/database.tables.types";
export default async function rejectLeaveRequest({
  request_id,
  reviewed_by,
  reviewed_comment,
}: {
  request_id: number;
  reviewed_by: string;
  reviewed_comment: string;
}) {
  const logger = getLogger("*");
  logger.info("rejectLeaveRequest");
  const status: database_leave_request_status_type = "rejected";
  const { error } = await updateData(
    "leave_requests",
    {
      status: status,
      reviewed_by: reviewed_by,
      reviewed_at: new Date(),
      reviewed_comment: reviewed_comment,
    },
    { id: request_id },
  );
  if (error) {
    logger.error(error.message);
    return {
      error: {
        message: error.message,
        type: "Error Rejecting Leave Request",
      },
    };
  }
  return { error: null };
}
