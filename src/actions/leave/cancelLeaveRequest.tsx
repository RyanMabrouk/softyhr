"use server";
import updateData from "@/api/updateData";
import {
  database_leave_request_status_type,
  database_leave_requests_type,
} from "@/types/database.tables.types";
import updateLeaveBalance from "./updateLeaveBalance";
import { getLogger } from "@/logging/log-util";
export default async function cancelLeaveRequest({
  leave_request,
  user_id,
}: {
  leave_request: database_leave_requests_type;
  user_id: string | string[];
}) {
  const logger = getLogger("*");
  logger.info("canceled Leave Request by", user_id);
  // if the leave request is approved then remove it from the leave balance
  if (leave_request.status === "approved") {
    const request_duration: number = leave_request.duration_used.reduce(
      (acc: number, e: any) => acc + Number(e.duration),
      0,
    );
    const { error: balance_error } = await updateLeaveBalance({
      user_id: user_id,
      policy_id: leave_request.policy_id,
      total_added_duration: request_duration,
    });
    if (balance_error) {
      logger.error(balance_error.message);
      return {
        error: {
          message: balance_error.message,
          type: "Server Error : changing balance",
        },
      };
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
    logger.error(error.message);
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
