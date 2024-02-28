"use client";
import { PostgrestError } from "@supabase/supabase-js";
import useProfilesData from "./useProfilesData";
export default function useProfiles(): {
  profiles: {
    data: any[] | undefined | null;
    error: PostgrestError | null | undefined;
    isPending: boolean;
  };
} {
  // ------------------All Profiles Basic Information--------------------
  const { profiles } = useProfilesData({
    columns: 'user_id,picture,"Basic Information",last_signed_in',
  });
  return {
    profiles: {
      data: profiles?.data,
      error: profiles?.error,
      isPending: profiles?.isPending,
    },
  };
}
