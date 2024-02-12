"use server";
import getCurrentorg from "@/api/getCurrentOrg";
import postData from "@/api/postData";
import updateLeaveBalance from "./updateLeaveBalance";
import { getLogger } from "@/logging/log-util";
export default async function adjustLeavePolicyBalance({
  formData,
  policy_id,
  user_id,
  additionType,
}: {
  formData: FormData;
  policy_id: number;
  user_id: string | string[];
  additionType: "1" | "-1";
}) {
  const logger = getLogger("*");
  logger.info("adjusting Leave Policy Balance for ", user_id);
  const org = await getCurrentorg();
  const added_hours =
    Number(formData.get("added_hours")) * Number(additionType);
  const note = formData.get("note") as string;
  // Update the balance
  const { new_policy_balance, error: balanceError } = await updateLeaveBalance({
    policy_id: policy_id,
    user_id: user_id,
    total_added_duration: added_hours,
  });
  if (balanceError) {
    logger.error(
      "Server Error : Adjusting Leave Balance",
      balanceError.message,
    );
    return {
      error: {
        message: balanceError.message,
        type: "Server Error : Adjusting Leave Balance",
      },
    };
  }
  const payload = {
    policy_id: policy_id,
    user_id: user_id,
    org_name: org?.name,
    balance: new_policy_balance,
    duration: added_hours,
    note: note,
    start_at: new Date().toDateString(),
  };
  const { error } = await postData("leave_accrued", payload);
  if (error) {
    logger.error(
      "Server Error : Adjusting Leave Accrueds table",
      error.message,
    );
    return {
      error: {
        message: error.message,
        type: "Server Error : Adjusting Leave Accrueds table",
      },
    };
  } else {
    return { error: null };
  }
}
