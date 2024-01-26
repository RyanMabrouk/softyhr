"use server";
import updateData from "@/api/updateData";

export async function renameFile(fileId: any, newName: string) {
  const { error } = await updateData(
    "files",
    { name: newName },
    { id: +fileId },
  );
  if (error) return error;
}
