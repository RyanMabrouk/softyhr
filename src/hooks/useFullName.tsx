"use client";
import getData from "@/api/getData";
import { useQuery } from "@tanstack/react-query";
export default function useFullName(userId?: any) {
  const { data: profile, isPending: isPendingFullName } = useQuery({
    queryKey: [userId],
    queryFn: () =>
      getData("profiles", {
        org: true,
        column: 'user_id,"Basic Information"',
        match: { user_id: userId },
      }),
  });
  const FullName = `${profile?.data?.[0]?.["Basic Information"]?.["First name"]} ${profile?.data?.[0]?.["Basic Information"]?.["Last name"]}`;
  return {FullName, isPendingFullName};
}
