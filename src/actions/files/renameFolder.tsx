"use server";
import updateData from "@/api/updateData";

export async function renameFolder(foldId: any, newName: string) {
  const { error } = await updateData(
    "folders",
    { name: newName },
    { id: +foldId },
  );
  if (error) return error;
}
