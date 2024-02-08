"use client";
import { useEffect } from "react";
import useProfilesData from "./useProfilesData";
import { useQuery } from "@tanstack/react-query";
import getSession from "@/api/getSession";
import getData from "@/api/getData";
export default function useUserProfile() {
  // ------------------get current user--------------------
  const { data: user_profile, isPending } = useQuery({
    queryKey: ["user_profile"],
    queryFn: () =>
      getData("profiles", {
        user: true,
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
