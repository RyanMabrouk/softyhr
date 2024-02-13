"use server";
import postData from "@/api/postData";
import getData from "@/api/getData";
import { PostgrestError } from "@supabase/supabase-js";
import { database_roles_type } from "@/types/database.tables.types";

export async function createOrg({
  company,
  employee_count,
  country,
}: {
  company: string;
  employee_count: string;
  country: string;
}): Promise<{
  error: PostgrestError | null;
  roles: database_roles_type[] | undefined | null;
}> {
  const { error } = await postData("organizations", [
    {
      name: company,
      employee_count: employee_count,
      country: country,
    },
  ]);
  if (error) return { error, roles: undefined };
  else {
    const { data } = await getData("roles", {
      match: {
        org_name: company,
      },
    });
    return {
      roles: data,
      error,
    };
  }
}
