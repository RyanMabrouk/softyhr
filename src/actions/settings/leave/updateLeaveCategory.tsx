"use server";
import updateData from "@/api/updateData";
export default async function updateLeaveCategory({
  formData,
  id,
}: {
  formData: FormData;
  id: number;
}) {
  const payload = {
    track_time_unit: formData.get("time_unit") as string,
    name: formData.get("category_name") as string,
    icon: formData.get("icon") as string,
    paid: (formData.get("paid_category") as string) === "on",
  };
  const { error } = await updateData("leave_categories", payload, { id: id });
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
