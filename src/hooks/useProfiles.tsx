"use client";
import useProfilesData from "./useProfilesData";
export default function useProfiles() {
  // ------------------All Profiles Basic Information--------------------
  const { profiles } = useProfilesData({
    columns: 'user_id,picture,"Basic Information"',
  });
  return {
    profiles: {
      data: profiles?.data,
      error: profiles?.error,
      isPending: profiles?.isPending,
    },
  };
}
