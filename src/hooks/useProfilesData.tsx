"use client";
import getData from "@/api/getData";
import { useQuery } from "@tanstack/react-query";

export default function useProfilesData({
  match,
  columns,
}: {
  match?: {
    [key: string]: string | number | boolean | null | string[] | undefined;
  };
  columns: string;
}) {
  // ------------------All Profiles Basic Information--------------------
  const { data: profiles, isPending: isPending } = useQuery({
    queryKey: ["profiles", columns, match],
    queryFn: () =>
      getData("profiles", {
        org: true,
        column: columns,
        match,
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
