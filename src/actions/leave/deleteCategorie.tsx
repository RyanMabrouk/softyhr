"use server";
import deleteData from "@/api/deleteData";
export default async function deleteCategorie({
  user_id,
  categories_id,
}: {
  categories_id: number;
  user_id: string | string[];
}) {
  console.log("🚀 ~ deleteCategorie");
  const { error } = await deleteData("leave_balance", {
    match: { user_id: user_id, categories_id: categories_id },
  });
  if (error) {
    return {
      new_policy_balance: null,
      error: {
        message: error.message,
        type: "Server Error : Deleting leave balance",
      },
    };
  }
  return { error: null };
}
