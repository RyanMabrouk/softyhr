"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/database.types";

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
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(StartPage, EndPage);
  const org_name = session?.user.user_metadata.org_name;
  const user_id = session?.user?.id;
  const data = match
    ? StartPage != undefined && EndPage != undefined
      ? filter != "All"
        ? await supabase
            .from(table)
            .select(column , { count: "exact" })
            .match(match)
            .order("id")
            .eq("org_name", org_name)
            .eq("Job Status", filter)
            .range(StartPage, EndPage)
        : await supabase
            .from(table)
            .select(column , { count: "exact" })
            .match(match)
            .order("id")
            .eq("org_name", org_name)
            .range(StartPage, EndPage)
      : await supabase
          .from(table)
          .select(column , { count: "exact" })
          .match(match)
          .order("id")
          .eq("org_name", org_name)
    : StartPage && EndPage
      ? filter
        ? await supabase
            .from(table)
            .select(column , { count: "exact" })
            .order("id")
            .eq("org_name", org_name)
            .eq("Job Status", filter)
            .range(StartPage, EndPage)
        : await supabase
            .from(table)
            .select(column , { count: "exact" })
            .order("id")
            .eq("org_name", org_name)
            .range(StartPage, EndPage)
      : await supabase
          .from(table)
          .select(column , { count: "exact" })
          .order("id")
          .eq("org_name", org_name);
  console.log(data?.error, data);
  return {
    data: data?.data,
    error: data?.error,
    meta: { totalPages: data?.count },
  };
}
