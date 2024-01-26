"use server";
import getData from "@/api/getData";
import { database_leave_policies_policy_type } from "@/types/database.tables.types";

export async function getPolicyType({ policy_id }: { policy_id: number }) {
  const { data: data, error: error } = await getData("leave_policies", {
    match: { id: policy_id },
    column: "type",
  });
  if (error) {
    return {
      policy_type: null,
      error: {
        message: error.message,
      },
    };
  }
  const policy_type: database_leave_policies_policy_type = data?.[0]?.type;
  return { policy_type: policy_type, error: null };
}
