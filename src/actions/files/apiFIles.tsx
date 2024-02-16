"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { PAGE_SIZE } from "@/constants/filesConstants";
import { getLogger } from "@/logging/log-util";
export async function getFiles({ sortBy, ids, page }: any) {
  const logger = getLogger("files");
  logger.info("getFiles");
  const supabase = createServerActionClient({ cookies });
  let query = supabase
    .from("files")
    .select("*", { count: "exact" })
    .in("id", ids);
  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  //Pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;
  if (error) {
    logger.error(error);
    throw new Error("Files could not be loaded");
  }
  return { data, count };
}
