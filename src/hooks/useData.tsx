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
    queryKey: ["user_profile"],
    queryFn: () =>
      getData("profiles", {
        user: true,
      }),
  });

  // ------------------All Profiles Basic Information--------------------
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
  //------------------Folders--------------------------------------
  const { data: folders, isPending: isPending1 } = useQuery({
    queryKey: ["folders"],
    queryFn: () =>
      getData("folders", {
        org: true,
      }),
  });

  //------------------Files--------------------------------------
  const { data: files, isPending: isPending10 } = useQuery({
    queryKey: ["files"],
    queryFn: () =>
      getData("files", {
        org: true,
      }),
  });
  //------------------------------------------------------------
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
    folders: {
      data: folders?.data,
      error: folders?.error,
      isPending: isPending1,
    },
    files: {
      data: files?.data,
      error: files?.error,
      isPending: isPending10,
    },
    all_profiles_basic_info: {
      data: all_profiles_basic_info?.data,
      error: all_profiles_basic_info?.error,
      isPending: isPending9,
    },
  };
}
