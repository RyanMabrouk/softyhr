"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import deleteData from "@/api/deleteData";
import getSession from "@/api/getSession";

export const GetJobOpening = async (page: number) => {
  const session = await getSession();
  const org_name = session?.user.user_metadata.org_name;
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from("Hiring")
    .select("", { count: "exact" })
    .eq("org_name", org_name)
    .range(page * 6 - 1, 6 + page * 6);
  console.log(data, page);
  if (error) {
    return {
      error,
    };
  } else {
    return {
      data,
    };
  }
};
