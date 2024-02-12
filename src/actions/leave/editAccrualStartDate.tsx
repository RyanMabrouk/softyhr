"use server";

import updateData from "@/api/updateData";
import { getLogger } from "@/logging/log-util";

export default async function editAccrualStartDate({
  formData,
  user_id,
}: {
  formData: FormData;
  user_id: string;
}) {
  const logger = getLogger("*");
  logger.info("editAccrualStartDate");
  const accrual_start_date = formData.get("accrual_start_date") as string;
  const { error } = await updateData(
    "profiles",
    {
      accrual_start_date: accrual_start_date,
    },
    {
      user_id: user_id,
    },
  );
  if (error) {
    logger.error(error.message);
    return {
      error: {
        message: error.message,
        type: "Server error",
      },
    };
  }
  return {
    error: null,
  };
}
