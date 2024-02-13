import useProfilesData from "./useProfilesData";
export default function useProfilesOrgChart() {
  const { profiles: all_profiles_org_chat_info } = useProfilesData({
    columns:
      'user_id,picture,supervisor_id,"Basic Information","Job Information"',
  });
  return {
    profiles: {
      data: all_profiles_org_chat_info?.data,
      error: all_profiles_org_chat_info?.error,
      isPending: all_profiles_org_chat_info?.isPending,
    },
  };
}
