"use server";
import postData from "@/api/postData";
import getCurrentorg from "@/api/getCurrentOrg";
import { getLogger } from "@/logging/log-util";

export const addFolder = async (name: any) => {
  const logger = getLogger("files");
  logger.info("addFolder");
  const org = await getCurrentorg();
  const payload = {
    name: name,
    org_name: org?.name,
  };

  const { error, data } = await postData("folders", payload);
  if (error) {
    return {
      error: {
        message: error.message,
        type: "Server Error : Inserting Folder",
      },
    };
  } else {
    return { data, error: null };
  }
};
