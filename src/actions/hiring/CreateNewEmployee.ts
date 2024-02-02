"use server";
import { cookies, headers } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import getCurrentorg from "@/api/getCurrentOrg";
import { Profile_Type } from "@/types/database.tables.types";
import { createClient } from "@supabase/supabase-js";
import { addFolder } from "../files/addFolder";

export const CreateNewEmployee = async (
  NewEmployeData: Profile_Type,
  email: string,
) => {
  const supbaseAdmin = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  );
  try {
    const org = await getCurrentorg();
    const { data: user, error: register_error } =
      await supbaseAdmin.auth.admin.createUser({
        email: email,
        password: "passwordTest",
        email_confirm: true,
        user_metadata: { org_name: org?.name },
      });
    console.log(register_error, user);
    if (register_error) {
      return {
        registred: false,
        Error: register_error?.message,
        Message: register_error?.message,
      };
    }

    const { data: profile, error: profile_error } = await supbaseAdmin
      .from("profiles")
      .insert([
        {
          ...NewEmployeData,
          org_name: org?.name,
          user_id: user?.user?.id,
          role: "employee",
          role_id: 2,
          files_ids: [],
        },
      ])
      .select();
      console.log(NewEmployeData);
    const  { error  } = await addFolder(
      NewEmployeData?.["Basic Information"]?.["First name"] +
        " " +
        NewEmployeData?.["Basic Information"]?.["Last name"],
    );
    if (profile_error || error) {
      return {
        Submitted: false,
        Error: profile_error,
        Message: "Error Creating User Profile",
      };
    } else {
      return {
        Submitted: true,
        Error: null,
        Message: `${NewEmployeData?.["Basic Information"]?.["First name"]} Added to employees list`,
      };
    }
  } catch (error) {
    return {
      Submitted: false,
      Error: null,
      Message: "Something Went Wrong",
    };
  }
};
