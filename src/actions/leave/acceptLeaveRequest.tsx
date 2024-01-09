"use server";
import getData from "@/api/getData";
import updateData from "@/api/updateData";
import { request_type } from "@/app/(dashboard)/people/[employeeId]/TimeOff/_ui/AcceptRequestBtn";
import {
  database_leave_request_duration_used_type,
  database_leave_request_status_type,
} from "@/types/database.tables.types";
import { Json } from "@/types/database.types";
export default async function acceptLeaveRequest({
  request,
  reviewed_by,
  old_user_leave_balance,
}: {
  request: request_type;
  reviewed_by: string;
  old_user_leave_balance: Json[] | any;
}) {
  console.log(
    "🚀 ~ file: acceptLeaveRequest.tsx:16 ~ old_user_leave_balance:",
    old_user_leave_balance,
  );
  console.log("acceptLeaveRequest");
  if (!old_user_leave_balance) {
    return {
      error: {
        message: "You don't have a balance for this policy",
        type: "Server Error : No balance for the policy",
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
    // get the category of the policy
    const { data: categories_id, error: categories_error } = await getData(
      "leave_policies",
      {
        match: { id: request.policy_id },
        column: "categories_id",
      },
    );
    if (categories_error) {
      return {
        error: {
          message: categories_error.message,
          type: "Server Error : category invalid",
        },
      };
    }
    // Get the balace of the user's other policies
    const unchanged_balance = old_user_leave_balance?.filter(
      (e: any) => e.policy_id != request.policy_id,
    );
    // Get the balance of the changed policy
    const old_balance: number = old_user_leave_balance?.find(
      (e: any) => Number(e.policy_id) == request.policy_id,
    )?.balance;
    // Calculate the total duration used
    const total_duration = request.duration_used.reduce(
      (acc: number, e: any) => acc + Number(e.duration),
      0,
    );
    console.log(
      "🚀 ~ file: acceptLeaveRequest.tsx:76 ~ total_duration:",
      total_duration,
    );
    // Calculate the new balance of the changed policy
    const new_balance = old_balance - total_duration;
    // Update the balance
    const balance = [
      ...unchanged_balance,
      {
        policy_id: request.policy_id,
        categories_id: categories_id[0].categories_id,
        balance: new_balance,
      },
    ];
    console.log("🚀 ~ file: acceptLeaveRequest.tsx:83 ~ balance:", balance);
    const { error: error2 } = await updateData(
      "profiles",
      { leave_balance: balance },
      {
        user_id: request.user_id,
      },
    );
    if (error2) {
      return {
        error: {
          message: error2.message,
          type: "Server Error : Adjusting Leave Request Balance",
        },
      };
    } else {
      return { error: null };
    }
  }
}
