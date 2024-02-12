"use server";
import updateData from "@/api/updateData";
import { getLogger } from "@/logging/log-util";
export default async function ToggleLeaveCategorieStatus({
  id,
  disabled,
}: {
  id: number;
  disabled: boolean;
}) {
  const logger = getLogger("settings");
  logger.info("ToggleLeaveCategorieStatus");
  const { error } = await updateData(
    "leave_categories",
    { disabled: disabled },
    { id: id },
  );
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
