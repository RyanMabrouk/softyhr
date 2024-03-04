"use client"
import { useQuery } from "@tanstack/react-query";
import getData from "@/api/getData";
export default function useUserProfile(column?: string) {
  // ------------------get current user--------------------
  const { data: user_profile, isPending } = useQuery({
    queryKey: ["user_profile"],
    queryFn: () =>
      getData("profiles", {
        user: true,
        column,
      }),
  });
  return {
    profiles: {
      data: user_profile,
      error: user_profile?.error,
      isPending,
    },
  };
}
