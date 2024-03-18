"use client";
import getData from "@/api/getData";
import { sourcesType } from "@/app/(dashboard)/Settings/(settings)/Jobs/types/status.types";

import { useQuery } from "@tanstack/react-query";
export default function useCandidateSources(match?: {
  [key: string]: string | number | boolean | null | string[] | undefined;
}): {
  data: sourcesType[] | null;
  isPending: boolean;
} {
  const { data: status, isPending } = useQuery({
    queryKey: ["candidate_sources", match],
    queryFn: () =>
      getData("candidate_sources", {
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
