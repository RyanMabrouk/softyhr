"use server";
import getData from "@/api/getData";
import updateData from "@/api/updateData";
import { database_profile_leave_balance_type } from "@/types/database.tables.types";
export default async function addLeavePolicy({
  categories_id,
  policy_id,
  user_id,
}: {
  categories_id: number;
  policy_id: string;
  user_id: string | string[];
}) {
  console.log("🚀 ~ policy_id:", policy_id);
  console.log("🚀 ~ categories_id:", categories_id);
  console.log("addLeavePolicy");
  console.log("user_id", user_id);
  const { data: data, error } = await getData("profiles", {
    column: "leave_balance",
    match: { user_id: user_id },
  });
  const old_leave_balance: database_profile_leave_balance_type[] =
    data?.[0].leave_balance;
  if (error) {
    return {
      new_policy_balance: null,
      error: {
        message: error.message,
        type: "Server Error : Getting Old Leave Balance",
      },
    };
  }
  const new_balance: database_profile_leave_balance_type[] = [
    ...old_leave_balance,
    {
      policy_id: Number(policy_id),
      balance: 0,
      categories_id: categories_id,
    },
  ];
  const { error: balanceError } = await updateData(
    "profiles",
    { leave_balance: new_balance },
    { user_id: user_id },
  );
  if (balanceError) {
    return {
      new_policy_balance: null,
      error: {
        message: error.message,
        type: "Server Error : Updating Leave Balance",
      },
    };
  }
  return { error: null };
}
