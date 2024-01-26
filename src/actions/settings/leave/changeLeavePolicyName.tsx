"use server";
import updateData from "@/api/updateData";
export default async function changeLeavePolicyName({
  formData,
  policy_id,
}: {
  formData: FormData;
  policy_id: number;
}) {
  const name = formData.get("name");
  const { error } = await updateData(
    "leave_policies",
    { name: name },
    { id: policy_id },
  );
  if (error) {
    return {
      error: {
        type: "Server Error",
        message: error.message,
      },
    };
  }
  return {
    error: null,
  };
}
