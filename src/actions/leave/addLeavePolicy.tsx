"use server";
import getCurrentorg from "@/api/getCurrentOrg";
import postData from "@/api/postData";
import { getLogger } from "@/logging/log-util";
export default async function addLeavePolicy({
  categories_id,
  policy_id,
  user_id,
}: {
  categories_id: number;
  policy_id: string | number;
  user_id: string | string[];
}) {
  console.log("🚀 ~ addLeavePolicy");
  const logger = getLogger("*");
  logger.info("added Leave Policy ", policy_id, " to ", user_id);
  const org = await getCurrentorg();
  const { error } = await postData("leave_balance", {
    org_name: org?.name,
    user_id: user_id,
    policy_id: Number(policy_id),
    balance: 0,
    categories_id: categories_id,
  });
  if (error) {
    logger.error("Server Error : Adding Leave Policy", error.message);
    return {
      error: {
        message: error.message,
        type: "Server Error : Adding Leave Policy",
      },
    };
  }
  return { error: null };
}
