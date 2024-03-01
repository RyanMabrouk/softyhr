"use client";
import { PostgrestError } from "@supabase/supabase-js";
import useProfilesData from "../useProfilesData";
import useDepartmentData from "../useDepartmentData";
import useAllDepartments from "../useAllDepartments";
export default function useProfilesOrgChart(): {
  profiles: {
    data: any[] | null | undefined;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
} {
  const { profiles: all_profiles_org_chat_info } = useProfilesData({
    columns:
      'user_id,picture,supervisor_id,"Basic Information","Job Information"',
  });
  const {
    Departments: {
      data: Departments,
      isPending: isPendingDepartments,
      error: errorDepartments,
    },
  } = useAllDepartments();
  return {
    profiles: {
      data: all_profiles_org_chat_info?.data?.map((p) => ({
        ...p,
        department:
          Departments?.find(
            (d) => String(d.id) === p?.["Job Information"]?.[0]?.["Department"],
          )?.name ?? "",
      })),
      error: all_profiles_org_chat_info?.error || errorDepartments,
      isPending: all_profiles_org_chat_info?.isPending || isPendingDepartments,
    },
  };
}
