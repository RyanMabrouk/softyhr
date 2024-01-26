"use server";
import postData from "@/api/postData";

export const addFile = async (payload: any) => {
  const { error } = await postData("files", payload);
  if (error) {
    return {
      error: {
        message: error.message,
        type: "Server Error : Inserting File",
      },
    };
  } else {
    return { error: null };
  }
};
