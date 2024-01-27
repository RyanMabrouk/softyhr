"use server";
import updateData from "@/api/updateData";
import { request_type } from "@/app/(dashboard)/people/(employee)/[employeeId]/TimeOff/_ui/Buttons/AcceptRequestBtn";
import { database_leave_request_status_type } from "@/types/database.tables.types";
import updateLeaveBalance from "./updateLeaveBalance";
import { getPolicyType } from "./getPolicyType";
export default async function acceptLeaveRequest({
  request,
  reviewed_by,
}: {
  request: request_type;
  reviewed_by: string;
}) {
  // get the type of the leave policy
  const { error: error0, policy_type: type } = await getPolicyType({
    policy_id: request.policy_id,
  });
  if (error0) {
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
