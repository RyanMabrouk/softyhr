"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { Database } from "@/types/database.types";
import { getLogger } from "@/logging/log-util";
import { createClient } from "@supabase/supabase-js";
import getCurrentorg from "../getCurrentOrg";
import { getValidSubdomain } from "../getValidSubdomain";
import getSession from "../getSession";
import { table_type } from "@/types/database.tables.types";

interface GetCandidateParamsType {
  user?: boolean;
  org?: boolean;
  match?: {
    [key: string]: string | number | boolean | null | string[] | undefined;
  };
  column?: string;
  StartPage?: number;
  EndPage?: number;
  filter?: string;
}

interface metaType {
  totalPages: number | null;
}

export default async function getHiringGuest(
  table: table_type,
  {
    match = undefined,
    column = "*",
    StartPage,
    filter = "*",
    EndPage,
  }: GetCandidateParamsType,
): Promise<{ data: any; error: any; meta: any }> {
  const logger = getLogger("Hiring");
  logger.info("getHiringGuest_enter");
  const session = await getSession();
  session && delete match?.["Job Status"];
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  );
  const host = headers().get("host")?.split(".");
  const subdomain = host?.[0] === "www" ? host?.[1] : host?.[0];
  const org_name =
    getValidSubdomain(subdomain) || session?.user.user_metadata.org_name;
  logger.info(org_name);
  const data = match
    ? StartPage != undefined && EndPage != undefined
      ? filter != "All"
        ? await supabase
            .from(table)
            .select(column, { count: "exact" })
            .match(match)
            .order("id")
            .eq("org_name", org_name)
            .eq("Job Status", filter)
            .range(StartPage, EndPage)
        : await supabase
            .from(table)
            .select(column, { count: "exact" })
            .match(match)
            .order("id")
            .eq("org_name", org_name)
            .range(StartPage, EndPage)
      : await supabase
          .from(table)
          .select(column, { count: "exact" })
          .match(match)
          .order("id")
          .eq("org_name", org_name)
    : StartPage && EndPage
      ? filter
        ? await supabase
            .from(table)
            .select(column, { count: "exact" })
            .order("id")
            .eq("org_name", org_name)
            .eq("Job Status", filter)
            .range(StartPage, EndPage)
        : await supabase
            .from(table)
            .select(column, { count: "exact" })
            .order("id")
            .eq("org_name", org_name)
            .range(StartPage, EndPage)
      : await supabase
          .from(table)
          .select(column, { count: "exact" })
          .order("id")
          .eq("org_name", org_name);

  logger.info("getHiringGuest_exit");
  if (data?.error) {
    logger.error(data?.error?.message);
  }
  return {
    data: data?.data,
    error: data?.error,
    meta: { totalPages: data?.count },
  };
}
