"use server";
import updateData from "@/api/updateData";
import { database_leave_request_status_type } from "@/types/database.tables.types";
import updateLeaveBalance from "./updateLeaveBalance";
import { getPolicyType } from "./getPolicyType";
import { request_type } from "@/app/(dashboard)/people/(employee)/[employeeId]/TimeOff/types/types";
import { getLogger } from "@/logging/log-util";
export default async function acceptLeaveRequest({
  request,
  reviewed_by,
}: {
  request: request_type;
  reviewed_by: string;
}) {
  const logger = getLogger("*");
  logger.info(
    "Accepting Leave Request from " + request.user_id + " by " + reviewed_by,
  );
  // get the type of the leave policy
  const { error: error0, policy_type: type } = await getPolicyType({
    policy_id: request.policy_id,
  });
  if (error0) {
    logger.error("Server Error Getting Policy Type :", error0.message);
    return {
      error: {
        message: error0.message,
        type: "Server Error : Getting Policy Type",
      },
    };
  }
  const total_duration = request.duration_used.reduce(
    (acc: number, e: any) => acc + Number(e.duration),
    0,
  );
  const { error: errorBalance } = await updateLeaveBalance({
    user_id: request.user_id,
    policy_id: request.policy_id,
    total_added_duration:
      type === "unlimited" ? total_duration : 0 - total_duration,
  });
  if (errorBalance) {
    logger.error("Error Updating Leave Balance :", errorBalance.message);
    return {
      error: {
        message: errorBalance.message,
        type: "Error Updating Leave Balance",
      },
    };
  }
  const status: database_leave_request_status_type = "approved";
  const { error } = await updateData(
    "leave_requests",
    {
      status: status,
      reviewed_by: reviewed_by,
      reviewed_at: new Date(),
    },
    { id: request.id },
  );
  if (error) {
    logger.error("Error Accepting Leave Request :", error.message);
    const { error: errorBalance2 } = await updateLeaveBalance({
      user_id: request.user_id,
      policy_id: request.policy_id,
      total_added_duration:
        type === "unlimited" ? 0 - total_duration : total_duration,
    });
    if (errorBalance2) {
      return {
        error: {
          message: errorBalance2.message,
          type: "Error resetting leave balance",
        },
      };
    }
    return {
      error: {
        message: error.message,
        type: "Error Accepting Leave Request",
      },
    };
  } else {
    return { error: null };
  }
}
