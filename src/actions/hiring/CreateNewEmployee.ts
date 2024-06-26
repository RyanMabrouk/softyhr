"use server";
import getCurrentorg from "@/api/getCurrentOrg";
import { Profile_Type } from "@/types/database.tables.types";
import { createClient } from "@supabase/supabase-js";
import { getLogger } from "@/logging/log-util";
import { createProfile } from "../auth/createProfile";

export const CreateNewEmployee = async ({
  NewEmployeData,
  email,
  role_id,
}: {
  NewEmployeData: Profile_Type;
  email: string;
  role_id: string;
}) => {
  const logger = getLogger("*");
  logger.info("CreateNewEmployee_enter");
  const supbaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
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
    if (register_error) {
      logger.error(register_error.message);
      return {
        registred: false,
        Error: register_error,
        Message: register_error.message,
      };
    }

    const { error: profile_error } = await createProfile({
      user_id: user?.user?.id,
      company: org?.name || "",
      first_name: NewEmployeData?.["Basic Information"]?.["First name"] || "",
      last_name: NewEmployeData?.["Basic Information"]?.["Last name"] || "",
      email: email,
      tel: NewEmployeData?.["Contact"]?.["Mobile Phone"] || "",
      job: NewEmployeData?.["Job Information"]?.[0]?.["Job Title"] || "",
      role_id: Number(role_id),
      supervisor_id: NewEmployeData?.supervisor_id || null,
      Division: NewEmployeData?.["Job Information"]?.[0]?.Division || "",
      Department: NewEmployeData?.["Job Information"]?.[0]?.Department || "",
      Location: NewEmployeData?.["Job Information"]?.[0]?.Location || "",
      custom_fields: NewEmployeData as any,
    });
    if (profile_error) {
      logger.error(profile_error.message);
      return {
        Submitted: false,
        Error: profile_error,
        Message: profile_error.message,
      };
    }
    logger.info("CreateNewEmployee_exit");
    return {
      Submitted: true,
      Error: null,
      Message: `${NewEmployeData?.["Basic Information"]?.["First name"]} ${NewEmployeData?.["Basic Information"]?.["Last name"]} Added to employees list`,
    };
  } catch (error) {
    logger.error(error);
    return {
      Submitted: false,
      Error: null,
      Message: "Something Went Wrong",
    };
  }
};
