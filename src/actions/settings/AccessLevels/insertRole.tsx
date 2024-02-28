"use server";
import getCurrentorg from "@/api/getCurrentOrg";
import postData from "@/api/postData";
import { getLogger } from "@/logging/log-util";
export default async function insertRole({ formData }: { formData: FormData }) {
  const logger = getLogger("settings");
  logger.info("insertRole_enter");
  const role_name = formData.get("role_name");
  const role_description = formData.get("role_description");
  const permissions = formData.getAll("permessions");
  const org = await getCurrentorg();
  const { error } = await postData("roles", {
    name: role_name,
    description: role_description,
    permissions: permissions,
    org_name: org?.name,
  });
  if (error) {
    logger.error(error);
    logger.info("insertRole_exit");
    return {
      error: {
        message: error.message,
        type: "Server Error ",
      },
    };
  }
  logger.info("insertRole_exit");
  return {
    error: null,
  };
}
