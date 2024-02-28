import { formatDateToMonDDYYYY } from "@/helpers/date.helpers";
import useProfiles from "@/hooks/useProfiles";
import {
  database_leave_request_status_type,
  database_leave_requests_type,
  database_profile_type,
} from "@/types/database.tables.types";
export default function useFormattedLeaves({
  leave_requests,
}: {
  leave_requests: database_leave_requests_type[] | null | undefined;
}) {
  const {
    profiles: { data: profiles, isPending },
  } = useProfiles();
  const formatted_Leavs = leave_requests?.map((e) => {
    const user = profiles?.find(
      (p: database_profile_type) => p.user_id === e.user_id,
    );
    const name =
      user?.["Basic Information"]?.["First name"] +
      " " +
      user?.["Basic Information"]?.["Last name"];
    return {
      ...e,
      status: e.status as database_leave_request_status_type,
      name: name,
      picture: user?.picture,
      date: formatDateToMonDDYYYY(new Date(e.created_at)),
    };
  });
  return { data: formatted_Leavs, isPending };
}
