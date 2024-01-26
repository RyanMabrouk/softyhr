import getData from "@/api/getData";
import { useQuery } from "@tanstack/react-query";

export default function useProfilesOrgChart() {
  const { data: all_profiles_org_chat_info, isPending } = useQuery({
    queryKey: [
      "profiles",
      {
        column:
          'user_id,role,picture,parent_id , "Basic Information" ,"Job Information"',
      },
    ],
    queryFn: () =>
      getData("profiles", {
        org: true,
        column:
          'user_id,role,picture,parent_id,"Basic Information","Job Information"',
      }),
  });
  return {
    profiles: {
      data: all_profiles_org_chat_info?.data,
      error: all_profiles_org_chat_info?.error,
      isPending: isPending,
    },
  };
}
