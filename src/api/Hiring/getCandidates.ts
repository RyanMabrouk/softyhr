"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/database.types";
import { getLogger } from "@/logging/log-util";
import Search from "antd/es/transfer/search";

interface GetCandidateParamsType {
  match?: {
    [key: string]: string | number | boolean | null | string[] | undefined;
  };
  column?: string;
  StartPage?: number;
  EndPage?: number;
  filter?: string | null;
  search?: string;
  genericFilter?: any;
  range?: any;
}

interface metaType {
  totalPages: number | null;
}

export default async function getCandidate(
  table: string,
  {
    match = undefined,
    column = "*",
    StartPage,
    filter = "*",
    EndPage,
    search = "",
    genericFilter = "",
    range = "",
  }: GetCandidateParamsType,
): Promise<{ data: any; error: any; meta: any }> {
  const logger = getLogger("Hiring");
  logger.info("getCandidate_enter");

  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const org_name = session?.user.user_metadata.org_name;
  let query = supabase.from(table).select(column, { count: "exact" });

  if (search) {
    query = query.or(search);
  }

  genericFilter.map((filter: any) => {
    return query.or(filter.FilterQuery, {
      referencedTable: filter.TableName,
    });
  });

  if (range.ratings.min !== 0) {
    query = query.gte("Ratings", range.ratings.min);
  }
  if (range.ratings.max !== 5) {
    query = query.lte("Ratings", range.ratings.max);
  }

  if (range.dates.min !== "") {
    query = query.gte("created_at", range.dates.min);
  }
  if (range.dates.max !== "") {
    query = query.lte("created_at", range.dates.max);
  }

  query.order("id");
  query.eq("org_name", org_name);
  match
    ? StartPage != undefined && EndPage != undefined
      ? filter != "All"
        ? query.eq("status", filter).range(StartPage, EndPage)
        : query.range(StartPage, EndPage)
      : null
    : StartPage && EndPage
      ? filter
        ? query.eq("status", filter).range(StartPage, EndPage)
        : query.range(StartPage, EndPage)
      : null;

  const data = await query;
  logger.info("getCandidate_exit");
  if (data?.error) {
    logger.error(data?.error?.message);
  }
  return {
    data: data?.data,
    error: data?.error,
    meta: { totalPages: data?.count },
  };
}
