"use server";
import deleteData from "@/api/deleteData";
export default async function deleteNotifications({ id }: { id: number }) {
  const { error } = await deleteData("notifications", {
    match: { id: id },
  });
  if (error) {
    return {
      error: {
        description: error.message,
        message: "Error deleting notification",
      },
    };
  }
  return { error: null };
}
