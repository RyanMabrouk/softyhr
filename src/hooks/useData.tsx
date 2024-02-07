"use client";
import getData from "@/api/getData";
import { useQuery } from "@tanstack/react-query";
// you can use this hook to get the current url
import { useUrl } from "nextjs-current-url";
//--------------------------------------------
export default function useData() {
  //--------------------Settings--------------------
  const { data: settings, isPending } = useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      getData("settings", {
        org: true,
      }),
  });

  //------------------- User Profile--------------------
  const { data: user_profile, isPending: isPending6 } = useQuery({
    queryKey: ["profiles", "user"],
    queryFn: () =>
      getData("profiles", {
        user: true,
      }),
  });
  return {
    settings: {
      data: settings?.data,
      error: settings?.error,
      isPending: isPending,
    },
    user_profile: {
      data: user_profile?.data?.[0],
      error: user_profile?.error,
      isPending: isPending6,
    },
  };
}
