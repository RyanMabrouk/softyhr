"use server";

import updateData from "@/api/updateData";

export async function updateProfiledata(NewEducation:any, user_id:string) {
  await updateData("profiles", [{ Education: NewEducation }], {
    user_id,
  });
}