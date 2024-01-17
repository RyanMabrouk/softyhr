"use server";

import getData from "@/api/getData";
import updateData from "@/api/updateData";
import { database_profile_leave_balance_type } from "@/types/database.tables.types";

export default async function deleteCategorie({
  user_id,
  categories_id,
}: {
  categories_id: number;
  user_id: string | string[];
}) {
  console.log("🚀 ~ deleteCategorie");
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
  // get the unchanged leave balance
  const unchanged_leave_balance = old_leave_balance?.filter(
    (e) => !(e.categories_id == categories_id),
  );
  const { error: balanceError } = await updateData(
    "profiles",
    { leave_balance: unchanged_leave_balance },
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
