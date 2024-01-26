"use client";
import getData from "@/api/getData";
import { useQuery } from "@tanstack/react-query";



export default function useProfiles() {

  // ------------------All Profiles Basic Information--------------------
  const { data: profiles, isPending: isPending } = useQuery({
    queryKey: ["profiles"],
    queryFn: () =>
      getData("profiles", {
        org: true,
        column: 'user_id,role,picture,"Basic Information"',
      }),
  });

  return {
    profiles: {
      data: profiles?.data,
      error: profiles?.error,
      isPending,
    }
  };
}
