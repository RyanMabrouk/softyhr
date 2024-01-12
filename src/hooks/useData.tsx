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
  //----------------- Leave Policies--------------------
  const { data: leave_policies, isPending: isPending3 } = useQuery({
    queryKey: ["leave_policies"],
    queryFn: () =>
      getData("leave_policies", {
        org: true,
      }),
  });
  //-------------------- Leave Categories--------------------
  const { data: leave_categories, isPending: isPending5 } = useQuery({
    queryKey: ["leave_categories"],
    queryFn: () =>
      getData("leave_categories", {
        org: true,
      }),
  });
  //------------------- User Profile--------------------
  const { data: user_profile, isPending: isPending6 } = useQuery({
    queryKey: ["user_profile"],
    queryFn: () =>
      getData("profiles", {
        user: true,
      }),
  });
  //------------------- Users Basic Information--------------------
  const { data: all_profiles, isPending: isPending7 } = useQuery({
    queryKey: ["profiles", "all"],
    queryFn: () =>
      getData("profiles", {
        org: true,
      }),
  });
  //------------------Hiring--------------------------------------

  const { data: Hiring, isPending: isPending8 } = useQuery({
    queryKey: ["Hiring"],
    queryFn: () =>
      getData("Hiring", {
        org: true,
      }),
  });
  const { data: all_profiles_basic_info, isPending: isPending9 } = useQuery({
    queryKey: [
      "profiles",
      {
        column: 'user_id,role,picture,"Basic Information"',
      },
    ],
    queryFn: () =>
      getData("profiles", {
        org: true,
        column: 'user_id,role,picture,"Basic Information"',
      }),
  });
  //------------------------------------------------------------
  return {
    leave_policies: {
      data: leave_policies?.data,
      error: leave_policies?.error,
      isPending: isPending3,
    },
    leave_categories: {
      data: leave_categories?.data,
      error: leave_categories?.error,
      isPending: isPending5,
    },
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
    all_profiles: {
      data: all_profiles?.data,
      error: all_profiles?.error,
      isPending: isPending7,
    },
    Hiring: {
      data: Hiring?.data,
      error: Hiring?.error,
      isPending: isPending8,
    },
    all_profiles_basic_info: {
      data: all_profiles_basic_info?.data,
      error: all_profiles_basic_info?.error,
      isPending: isPending9,
    },
  };
}
