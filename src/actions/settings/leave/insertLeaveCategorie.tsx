"use server";

import getCurrentorg from "@/api/getCurrentOrg";
import postData from "@/api/postData";
import { getLogger } from "@/logging/log-util";

export default async function insertLeaveCategorie({
  formData,
}: {
  formData: FormData;
}) {
  const logger = getLogger("settings");
  logger.info("insertLeaveCategorie");
  const org = await getCurrentorg();
  const payload = {
    org_name: org?.name,
    track_time_unit: formData.get("time_unit") as string,
    name: formData.get("category_name") as string,
    icon: formData.get("icon") as string,
    paid: (formData.get("paid_category") as string) === "on",
  };
  const { error } = await postData("leave_categories", payload);
  if (error) {
    return {
      error: {
        message: error.message,
        type: "Server Error",
      },
    };
  }
  return {
    error: null,
  };
}
