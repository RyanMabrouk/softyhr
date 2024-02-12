"use server";
import deleteData from "@/api/deleteData";
import { getLogger } from "@/logging/log-util";
export default async function deleteCategorie({
  user_id,
  categories_id,
}: {
  categories_id: number;
  user_id: string | string[];
}) {
  const logger = getLogger("*");
  logger.info("deleting Categorie");
  const { error } = await deleteData("leave_balance", {
    match: { user_id: user_id, categories_id: categories_id },
  });
  if (error) {
    logger.error(error.message);
    return {
      new_policy_balance: null,
      error: {
        message: error.message,
        type: "Server Error : Deleting leave balance",
      },
    };
  }
  return { error: null };
}
