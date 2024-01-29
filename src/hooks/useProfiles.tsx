"use client";
import getData from "@/api/getData";
import { columns } from "@/app/(dashboard)/Hiring/_ui/HiringTable/HiringTable";
import { useQuery } from "@tanstack/react-query";
import useProfilesData from "./useProfilesData";
export default function useProfiles() {
  // ------------------All Profiles Basic Information--------------------
  const { profiles } = useProfilesData({
    columns: 'user_id,role,picture,"Basic Information"',
  });
  return {
    profiles: {
      data: profiles?.data,
      error: profiles?.error,
      isPending: profiles?.isPending,
    },
  };
}
