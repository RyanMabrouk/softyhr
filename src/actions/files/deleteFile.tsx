"use server";
import deleteData from "@/api/deleteData";

export default async function deleteFile(request_id: any) {
  const { error } = await deleteData("files", {
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
