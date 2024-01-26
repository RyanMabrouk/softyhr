"use server";
import updateData from "@/api/updateData";

export async function moveFile(fileId: any, newFolderId: any) {
  const { error } = await updateData(
    "files",
    { folderId: newFolderId },
    { id: +fileId },
  );
  if (error) return error;
}
