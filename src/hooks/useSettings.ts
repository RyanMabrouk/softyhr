"use client";
import useData from "@/hooks/useData";
export function useSettings(section: string) {
  const { settings: org_settings } = useData();
  const { data, isPending } = org_settings;
  if (data && data.length > 0)
    return { data: data[0][section], isPending: isPending };
  else
    return {
      data: null,
      isPending: true,
    };
}
