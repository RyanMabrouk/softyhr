"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";

interface GetCandidateParamsType {
  user?: boolean;
  org?: boolean;
  match?: {
    [key: string]: string | number | boolean | null | string[] | undefined;
  };
  column?: string;
  StartPage?: number;
  EndPage?: number;
  filter?: string | null;
}

interface metaType {
  totalPages: number | null;
}

export default async function getHiring(
  table: string,
  {
    match = undefined,
    column = "*",
    StartPage,
    filter = "*",
    EndPage,
  }: GetCandidateParamsType,
): Promise<{ data: any; error: any; meta: any }> {
  const supbaseAdmin = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  );
  const {
    data: { session },
  } = await supbaseAdmin.auth.getSession();
  const org_name = session?.user.user_metadata.org_name;
  const user_id = session?.user?.id;
  const data = match
    ? StartPage != undefined && EndPage != undefined
      ? filter != "All"
        ? await supbaseAdmin
            .from(table)
            .select(column, { count: "exact" })
            .match(match)
            .order("id")
            .eq("org_name", org_name)
            .eq("Job Status", filter)
            .range(StartPage, EndPage)
        : await supbaseAdmin
            .from(table)
            .select(column, { count: "exact" })
            .match(match)
            .order("id")
            .eq("org_name", org_name)
            .range(StartPage, EndPage)
      : await supbaseAdmin
          .from(table)
          .select(column, { count: "exact" })
          .match(match)
          .order("id")
          .eq("org_name", org_name)
    : StartPage && EndPage
      ? filter
        ? await supbaseAdmin
            .from(table)
            .select(column, { count: "exact" })
            .order("id")
            .eq("org_name", org_name)
            .eq("Job Status", filter)
            .range(StartPage, EndPage)
        : await supbaseAdmin
            .from(table)
            .select(column, { count: "exact" })
            .order("id")
            .eq("org_name", org_name)
            .range(StartPage, EndPage)
      : await supbaseAdmin
          .from(table)
          .select(column, { count: "exact" })
          .order("id")
          .eq("org_name", org_name);
  return {
    data: data?.data,
    error: data?.error,
    meta: { totalPages: data?.count },
  };
}
