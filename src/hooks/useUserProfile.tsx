"use client";
import useData from "./useData";
export default function useUserProfile(column?: string) {
  // ------------------get current user--------------------
  const { user_profile } = useData();
  return {
    profiles: {
      data: user_profile.data,
      error: user_profile?.error,
      isPending: user_profile?.isPending,
    },
  };
}
