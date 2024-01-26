"use server";
import getCurrentorg from "@/api/getCurrentOrg";
import postData from "@/api/postData";
export default async function addLeavePolicy({
  categories_id,
  policy_id,
  user_id,
}: {
  categories_id: number;
  policy_id: string | number;
  user_id: string | string[];
}) {
  console.log("addLeavePolicy");
  const org = await getCurrentorg();
  const { error } = await postData("leave_balance", {
    org_name: org?.name,
    user_id: user_id,
    policy_id: Number(policy_id),
    balance: 0,
    categories_id: categories_id,
  });
  if (error) {
    return {
      error: {
        message: error.message,
        type: "Server Error : Adding Leave Policy",
      },
    };
  }
  return { error: null };
}
