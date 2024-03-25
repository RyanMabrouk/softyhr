"use client";
import getData from "@/api/getData";
import { statusType } from "@/app/(dashboard)/Settings/(settings)/Jobs/types/status.types";
import { useQuery } from "@tanstack/react-query";
export default function useCandidateStatus(match?: {
  [key: string]: string | number | boolean | null | string[] | undefined;
}): {
  data: statusType[] | null;
  isPending: boolean;
} {
  const { data: status, isPending } = useQuery({
    queryKey: ["candidate_statuses", match],
    queryFn: () =>
      getData("candidate_statuses", {
        org: true,
        sort: {
          column: "created_at",
          ascending: true,
        },
        match,
      }),
  });
  return { data: status?.data || null, isPending };
}
