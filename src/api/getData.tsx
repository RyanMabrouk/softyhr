"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/database.types";
import { getLogger } from "@/logging/log-util";
import { PostgrestError } from "@supabase/supabase-js";
type getDataParams = {
  user?: boolean;
  org?: boolean;
  match?: {
    [key: string]: string | number | boolean | null | string[] | undefined;
  };
  column?: string;
  sort?: {
    column: string;
    ascending: boolean;
  };
  filter?: {
    column: string;
    operator: string;
    value: string | number;
  };
  pagination?: {
    items_per_page: number;
    page: number;
  };
};
export default async function getData(
  table: string,
  {
    user = undefined,
    org = undefined,
    match = undefined,
    column = "*",
    sort = undefined,
    filter = undefined,
    pagination = undefined,
  }: getDataParams = {
    user: false,
    org: false,
    column: "*",
  },
): Promise<{ data: any[] | null; error: PostgrestError | null }> {
  const logger = getLogger("*");
  const supabase = createServerComponentClient<Database>({ cookies });
  let query = supabase.from(table).select(column);
  if (match) {
    query = query.match(match);
  }
  if (user) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user_id = session?.user?.id;
    if (!user_id) {
      logger.error("no user_id found in user_metadata");
      return {
        data: null,
        error: {
          message: "User not found",
          details: "User not found",
          hint: "User not found",
          code: "400",
        },
      };
    }
    query = query.eq("user_id", user_id);
  }
  if (org) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const org_name = session?.user.user_metadata.org_name;
    if (!org_name) {
      logger.error("no org_name found in user_metadata");
      return {
        data: null,
        error: {
          message: "Org not found",
          details: "Org not found",
          hint: "Org not found",
          code: "400",
        },
      };
    }
    query = query.eq("org_name", org_name);
  }
  if (filter) {
    query = query.filter(filter.column, filter.operator, filter.value);
  }
  if (sort) {
    query = query.order(sort.column, { ascending: sort.ascending });
  }
  if (pagination) {
    const start =
      pagination.page === 1
        ? 0
        : (pagination.page - 1) * pagination.items_per_page;
    const end =
      pagination.page === 1
        ? pagination.items_per_page - 1
        : start + pagination.items_per_page - 1;
    query = query.range(start, end);
  }
  const { data, error } = await query;
  if (error) {
    logger.error(error?.message);
  }
  return { data: data, error: error };
}
