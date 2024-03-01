"use server";
import { getLogger } from "@/logging/log-util";
import { UploadToBucket } from "../../api/UploadToBucket";
export async function UploadImage(
  formdata: any,
  FileName: string,
  Bucketname: string,
  NameFormdata?: string,
) {
  const logger = getLogger("*");
  logger.info("UploadImage_enter");
  const file = formdata.get(NameFormdata || "file");
  const { error } = await UploadToBucket({
    file,
    fileName: FileName,
    BucketName: Bucketname,
  });
  if (error) {
    logger.error(error.message);
    return {
      uploaded: false,
      Message: "Something went wrong when uploading file",
      Type: error?.message,
    };
  }
  logger.info("UploadImage_exit");
  return { uploaded: true, Message: "file uploaded successfully" };
}
