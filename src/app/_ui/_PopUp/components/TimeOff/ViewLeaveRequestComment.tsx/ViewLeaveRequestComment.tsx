import { Button } from "@/app/_ui/Button";
import useData from "@/hooks/useData";
import {
  database_leave_policies_type,
  database_leave_request_duration_used_type,
  database_leave_requests_type,
  database_profile_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import default_avatar from "/public/default_avatar.jpeg";
import default_user_avatar from "/public/default_avatar.png";
import { formatTotalHoursToTimeUnit } from "@/helpers/leave.helpers";
import { formatDateToMonDDYYYY } from "@/helpers/date.helpers";
import useEmployeeData from "@/hooks/useEmloyeeData";
import PopUpSkeleton from "../../../PopUpSkeleton";
import useLeaveData from "@/hooks/useLeaveData";
import useProfilesData from "@/hooks/useProfilesData";
function ViewLeaveRequestComment() {
  const Router = useRouter();
  const { employeeId } = useParams();
  const leave_request_id = useSearchParams().get("leave_request_id");
  const {
    leave_categories: { data: leave_categories },
    leave_policies: { data: leave_policies },
  } = useLeaveData();
  const {
    profiles: { data: all_profiles_basic_info },
  } = useProfilesData({
    columns: 'user_id,role,picture,"Basic Information"',
  });
  const {
    leave_requests: { data: leave_requests },
    employee_profile: { data: employee_profile },
  } = useEmployeeData({ employeeId: employeeId });
  const leave_request_data = leave_requests?.find(
    (request: database_leave_requests_type) =>
      request.id === Number(leave_request_id),
  );
  const leave_category_data = leave_categories?.find(
    (category: databese_leave_categories_type) =>
      leave_policies?.find(
        (policy: database_leave_policies_type) =>
          policy.id === leave_request_data?.policy_id,
      )?.categories_id === category.id,
  );
  const admin_profile = all_profiles_basic_info?.find(
    (profile: database_profile_type) =>
      profile.user_id === leave_request_data?.reviewed_by,
  );
  const admin_full_name: string =
    admin_profile?.["Basic Information"]?.["First name"] +
    " " +
    admin_profile?.["Basic Information"]?.["Last name"];
  const full_name: string =
    employee_profile?.["Basic Information"]?.["First name"] +
    " " +
    employee_profile?.["Basic Information"]?.["Last name"];
  return (
    <>
      <PopUpSkeleton
        className="flex min-w-[35rem] flex-col  items-center px-8 py-4"
        title="Request Comments"
      >
        <div className="mb-6 text-2xl font-semibold capitalize text-gray-27 opacity-95">
          {full_name + " is requesting:"}
        </div>
        <header className="mb-3 flex w-full flex-row items-center gap-2 bg-gray-14 px-4 py-3">
          <Image
            src={employee_profile?.picture || default_avatar}
            className="h-12 w-12 rounded-full"
            alt=""
            width={80}
            height={80}
          />
          <div className="flex flex-col">
            <div className="m-0 block text-[1.2rem] font-normal capitalize leading-[1.733rem] text-black">
              {`${formatDateToMonDDYYYY(
                new Date(leave_request_data?.start_at),
              )} - ${formatDateToMonDDYYYY(
                new Date(leave_request_data?.end_at),
              )}`}
            </div>
            <div className="text-sm leading-6 text-gray-21">
              {`${formatTotalHoursToTimeUnit(
                leave_request_data?.duration_used.reduce(
                  (acc: number, e: database_leave_request_duration_used_type) =>
                    acc + Number(e.duration),
                  0,
                ),
                leave_category_data?.track_time_unit,
              )} of ${leave_category_data?.name}`}
            </div>
          </div>
        </header>
        <div className="flex w-full flex-col items-center justify-start gap-6">
          {leave_request_data?.reviewed_comment && (
            <main className="flex w-full flex-row items-center gap-2 px-4 py-3">
              <Image
                src={admin_profile?.picture || default_user_avatar}
                className="h-8 w-8 rounded-full"
                alt=""
                width={80}
                height={80}
              />
              <div className="flex flex-col gap-2">
                <div className=" -mb-2 text-sm font-normal capitalize leading-[1.733rem] text-gray-30">
                  {`${admin_full_name} ${new Date(
                    leave_request_data?.created_at,
                  ).toLocaleDateString()}`}
                </div>
                <div className=" -mb-4 leading-6 opacity-85">
                  {leave_request_data?.reviewed_comment}
                </div>
              </div>
            </main>
          )}
          <hr className="h-[3px] w-full bg-primary-gradient" />
          <Button
            className="!max-w-[10rem]"
            type="button"
            onClick={() => Router.back()}
          >
            Thanks, I'm done.
          </Button>
        </div>
      </PopUpSkeleton>
    </>
  );
}

export default ViewLeaveRequestComment;
