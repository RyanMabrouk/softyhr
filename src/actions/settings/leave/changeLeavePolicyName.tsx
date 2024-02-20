"use server";
import updateData from "@/api/updateData";
import { getLogger } from "@/logging/log-util";
export default async function changeLeavePolicyName({
  formData,
  policy_id,
}: {
  formData: FormData;
  policy_id: number;
}) {
  const logger = getLogger("settings");
  logger.info("changeLeavePolicyName");
  const name = formData.get("name");
  const { error } = await updateData(
    "leave_policies",
    { name: name },
    { id: policy_id },
  );
  if (error) {
    logger.error(error.message);
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
