"use server";
import postData from "@/api/postData";
import { getLogger } from "@/logging/log-util";
export const addFile = async (payload: any) => {
  const logger = getLogger("files");
  logger.info("addFile");
  const { error, data } = await postData("files", payload);
  if (error) {
    return {
      error: {
        message: error.message,
        type: "Server Error : Inserting File",
      },
    };
  } else {
    return { data, error: null };
  }
};
