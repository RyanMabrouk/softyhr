"use server";

import updateData from "@/api/updateData";

export async function deleteEducation(NewEducation:any, user_id:string) {
  await updateData("profiles", [{ Education: NewEducation }], {
    user_id,
  });
}