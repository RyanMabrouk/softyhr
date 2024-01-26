"use server";
import deleteData from "@/api/deleteData";

export default async function deleteFolder(request_id: any) {
  const { error } = await deleteData("folders", {
    match: { id: request_id },
  });
  if (error) {
    return {
      error: {
        message: error.message,
        type: "Server Error : Failed to Delete the Folder",
      },
    };
  }
  return { error: null };
}
