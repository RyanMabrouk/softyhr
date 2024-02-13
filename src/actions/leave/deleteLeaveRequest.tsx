"use server";
import deleteData from "@/api/deleteData";
import { getLogger } from "@/logging/log-util";
export default async function deleteLeaveRequest({
  request_id,
}: {
  request_id: number;
}) {
  const logger = getLogger("*");
  logger.info("deleteLeaveRequest");
  const { error } = await deleteData("leave_requests", {
    match: { id: request_id },
  });
  if (error) {
    logger.error(error.message);
    return {
      error: {
        message: error.message,
        type: "Server Error : Failed to Delete Leave Request",
      },
    };
  }
  return { error: null };
}
