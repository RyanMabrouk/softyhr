"use server";
import { cookies, headers } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Hiring_type } from "@/types/database.tables.types";

export const CreateJobOpening = async (NewJob: Hiring_type) => {
  const supabase = createServerActionClient({ cookies });

  const { data, error } = await supabase
    .from("Hiring")
    .insert([NewJob])
    .select();
  if (error) {
    return {
      Error: error,
      Msg: "Error creating job opening",
    };
  } else {
    return {
    Error:null,
    Msg: "job opening created successfully",
    };
  }
};
