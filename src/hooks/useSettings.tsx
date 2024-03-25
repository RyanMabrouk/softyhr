"use client";
import useData from "./useData";
export function useSettings(section: string) {
  const {
    settings: { data: settings, isPending },
  } = useData();
  if (settings && settings?.length > 0)
    return { data: settings?.[0][section], isPending: isPending };
  else
    return {
      data: null,
      isPending: false,
    };
}
