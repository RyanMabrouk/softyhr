"use server";

import getCurrentorg from "@/api/getCurrentOrg";
import postData from "@/api/postData";
import updateData from "@/api/updateData";
import { database_profile_leave_balance_type } from "@/types/database.tables.types";
export default async function adjustLeavePolicyBalance({
  formData,
  policy_id,
  user_id,
  old_user_leave_balance,
  additionType,
}: {
  formData: FormData;
  policy_id: number;
  user_id: string | string[];
  old_user_leave_balance: database_profile_leave_balance_type;
  additionType: "1" | "-1";
}) {
  const org = await getCurrentorg();
  const added_hours =
    Number(formData.get("added_hours")) * Number(additionType);
  const note = formData.get("note") as string;
  // Get the balace of the user's other policies
  const unchanged_balance = old_user_leave_balance?.filter(
    (e: any) => e.policy_id != policy_id,
  );
  // Get the balance of the changed policy
  const changed_balance = old_user_leave_balance?.find(
    (e: any) => e.policy_id == policy_id,
  );
  const old_balance = changed_balance?.balance;
  // Calculate the new balance of the changed policy
  const new_balance = Number(old_balance) + added_hours;
  // Insert the leave accrued
  const payload = {
    policy_id: policy_id,
    user_id: user_id,
    org_name: org?.name,
    balance: new_balance,
    duration: added_hours,
    note: note,
    start_at: new Date().toDateString(),
  };
  const { error } = await postData("leave_accrued", payload);
  if (error) {
    return {
      error: {
        message: error.message,
        type: "Server Error : Adjusting Leave Accrueds table",
      },
    };
  }
  // Update the balance
  const balance = [
    ...unchanged_balance,
    {
      policy_id: policy_id,
      categories_id: changed_balance?.categories_id,
      balance: new_balance,
    },
  ];
  const { error: error2 } = await updateData(
    "profiles",
    { leave_balance: balance },
    {
      user_id: user_id,
    },
  );
  if (error2) {
    return {
      error: {
        message: error2.message,
        type: "Server Error : Adjusting Leave Balance",
      },
    };
  } else {
    return { error: null };
  }
}
