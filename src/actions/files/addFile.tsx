"use server";
import postData from "@/api/postData";

export const addFile = async (payload: any) => {
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
