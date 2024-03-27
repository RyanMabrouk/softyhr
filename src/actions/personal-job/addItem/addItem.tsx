"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { getLogger } from "@/logging/log-util";
import postData from "@/api/postData";
import updateData from "@/api/updateData";

interface EntryType {
  [key: string]: FormDataEntryValue | string;
}

export const AddItem = async (
  JobData: any,
  section: string,
  RowFieldParentName: string,
  RowFieldName: string,
  NewItem: string,
) => {
  const logger = getLogger("*");
  logger.info("addItem_enter");

  const supabase = createServerActionClient({ cookies });
  const { error } = await updateData(
    "settings",
    {
      [section]: {
        ...JobData,
        [RowFieldParentName]: {
          ...JobData?.[RowFieldParentName],
          [RowFieldName]: {
            options: [
              NewItem,
              ...JobData?.[RowFieldParentName]?.[RowFieldName]?.options,
            ],
            ...JobData?.[RowFieldParentName]?.[RowFieldName],
          },
        },
      },
    },
    {},
  );
  if (error) {
    logger.error(error?.message);
    return { error: { Message: `Error Adding item`, Type: error } };
  }
  logger.info("addItem_exit");
};
