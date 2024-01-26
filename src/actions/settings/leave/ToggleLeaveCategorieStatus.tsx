"use server";
import updateData from "@/api/updateData";
export default async function ToggleLeaveCategorieStatus({
  id,
  disabled,
}: {
  id: number;
  disabled: boolean;
}) {
  console.log("🚀 ~ ToggleLeaveCategorieSatus ~");
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
