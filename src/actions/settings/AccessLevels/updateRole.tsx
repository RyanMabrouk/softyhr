"use server";
import getCurrentorg from "@/api/getCurrentOrg";
import updateData from "@/api/updateData";
import { getLogger } from "@/logging/log-util";
export default async function updateRole({
  formData,
  role_id,
}: {
  formData: FormData;
  role_id: string;
}) {
  const logger = getLogger("settings");
  logger.info("updateRole_enter");
  const role_name = formData.get("role_name");
  const role_description = formData.get("role_description");
  const permissions = formData.getAll("permessions");
  const org = await getCurrentorg();
  const { error } = await updateData(
    "roles",
    {
      name: role_name,
      description: role_description,
      permissions: permissions,
      org_name: org?.name,
    },
    {
      id: role_id,
    },
  );
  if (error) {
    logger.error(error);
    logger.info("updateRole_exit");
    return {
      error: {
        message: error.message,
        type: "Server Error ",
      },
    };
  }
  logger.info("updateRole_exit");
  return {
    error: null,
  };
}
