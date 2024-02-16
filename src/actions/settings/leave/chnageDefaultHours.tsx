"use server";
import { UpdateSettings } from "@/api/Settings/updateSettings";
import { getLogger } from "@/logging/log-util";
export default async function chnageDefaultHours({
  formData,
}: {
  formData: FormData;
}) {
  const logger = getLogger("settings");
  logger.info("chnageDefaultHours");
  const hours = formData.getAll("hours");
  const { error } = await UpdateSettings({ default_hours_per_day: hours });
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
