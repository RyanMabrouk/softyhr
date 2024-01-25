"use server";

import getCurrentorg from "@/api/getCurrentOrg";
import postData from "@/api/postData";
import { database_leave_policies_policy_type } from "@/types/database.tables.types";

export default async function insertNewPolicy({
  formData,
  type,
}: {
  formData: FormData;
  type: database_leave_policies_policy_type;
}) {
  console.log("🚀 ~ insertNewPolicy ");
  console.log("🚀 ~ formData:", formData);
  const org = await getCurrentorg();
  const payload = {
    org_name: org?.name,
    categories_id: Number(formData.get("categories_id") as string),
    name: formData.get("policy_name") as string,
    type: type,
  };
  const { error } = await postData("leave_policies", payload);
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
