"use server";
import updateData from "@/api/updateData";
import { getLogger } from "@/logging/log-util";
export async function deleteEducation(NewEducation: any, user_id: string) {
  const logger = getLogger("*");
  logger.info("deleteEducation_enter");
  await updateData("profiles", [{ Education: NewEducation }], {
    user_id,
  });
  logger.info("deleteEducation_exit");

}
