"use server";
import deleteData from "@/api/deleteData";
import getCurrentorg from "@/api/getCurrentOrg";
export default async function deleteLeavePolicyData({ id }: { id: number }) {
  console.log("🚀 ~ deleteLeaveCategorie ~");
  const org = await getCurrentorg();
  const { error: error1 } = await deleteData("leave_balance", {
    match: { policy_id: id, org_name: org?.name },
  });
  if (error1) {
    return {
      error: {
        message: error1.message,
        type: "Server Error",
      },
    };
  }
  const { error } = await deleteData("leave_policies", { match: { id: id } });
  if (error) {
    return {
      error: {
        message: error.message,
        type: "Server Error",
      },
    };
  }
  return {
    error: null,
  };
}
