"use client";
import getData from "@/api/getData";
import { useQuery } from "@tanstack/react-query";
export default function useProfilesData({ columns }: { columns: string }) {
  // ------------------All Profiles Basic Information--------------------
  const { data: profiles, isPending: isPending } = useQuery({
    queryKey: ["profiles", columns],
    queryFn: () =>
      getData("profiles", {
        org: true,
        column: columns,
      }),
  });
  return {
    profiles: {
      data: profiles?.data,
      error: profiles?.error,
      isPending,
    },
  };
}
