"use client";
import getHiring from "@/api/Hiring/getHiring";
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
    queryKey: ["Hiring", match],
    queryFn: () =>
      getHiring("Hiring", {
        org: true,
      }),
  });
  return { data: status?.data || null, isPending };
}
