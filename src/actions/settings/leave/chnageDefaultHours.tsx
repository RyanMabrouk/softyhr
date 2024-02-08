"use server";
import { UpdateSettings } from "@/api/Settings/updateSettings";
export default async function chnageDefaultHours({
  formData,
}: {
  formData: FormData;
}) {
  const hours = formData.getAll("hours");
  const { error } = await UpdateSettings({ default_hours_per_day: hours });
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
