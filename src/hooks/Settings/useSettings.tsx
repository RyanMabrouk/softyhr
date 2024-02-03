"use client";
import getData from "@/api/getData";
import useData from "@/hooks/useData";
import { useQuery } from "@tanstack/react-query";
export function   useSettings(section: string) {
  const { data: settings, isPending } = useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      getData("settings", {
        org: true,
      }),
  });
  if (settings?.data && settings?.data.length > 0)
    return { data: settings?.data[0][section], isPending: isPending };
  else
    return {
      data: null,
      isPending: false,
    };
}
