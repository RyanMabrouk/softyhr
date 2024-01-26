"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import deleteData from "@/api/deleteData";

export const deleteJobOpening = async (id: Number) => {
  const supabase = createServerActionClient({ cookies });
  console.log(id);
  const { error } = await supabase.from("Hiring").delete().eq("id", id);
  console.log(error);
  if (error) {
    return {
      Error: error,
      Msg: "Error Deleting job opening",
    };
  } else {
    return {
      Error: null,
      Msg: "job opening Deleted successfully",
    };
  }
};
