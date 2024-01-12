"use client";
import React, { Fragment, useContext, useState } from "react";
import { FaHistory } from "react-icons/fa";
import { HistoryTable } from "./HistoryTable";
import historyTableFilters from "./_context/historyTableFilters";
import { historyTableFiltersContextType } from "./_context/historyTableFilters"; // Import the type of the context
import { UnderlinedLink } from "./_ui/UnderlinedLink";
import { formatDDMMYYYY } from "@/helpers/date.helpers";
import useData from "@/hooks/useData";
import { Filters } from "./Filters";
import {
  database_leave_accrued_type,
  database_leave_policies_type,
  database_leave_request_status_type,
  database_leave_requests_type,
  database_profile_type,
  databese_leave_categories_track_time_unit_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import { formatTotalHoursToTimeUnit } from "@/helpers/leave.helpers";
import { useParams } from "next/navigation";
import { EditLeaveRequestBtn } from "./_ui/Buttons/EditLeaveRequestBtn";
import { DeleteLeaveRequestBtn } from "./_ui/Buttons/DeleteLeaveRequestBtn";
import Link from "next/link";
import { Span } from "next/dist/trace";
interface leave_data {
  user_id: string;
  reviewed_by: string | "";
  reviewed_at: string | "";
  status: database_leave_request_status_type | "";
  created_at: Date;
  name: string;
  id: number;
  end_at: Date | "";
  start_at: Date;
  description: string;
  duration_used: number | "";
  duration_accrued: number | "";
  Balance: number | "";
  reviewed_comment: string | "";
  track_time_unit: databese_leave_categories_track_time_unit_type;
}
export type leave_data_types = leave_data[] | undefined;

export function History() {
  const { year, type, status, toggleView } =
    useContext<historyTableFiltersContextType>(historyTableFilters);
  const { employeeId } = useParams();
  const [toggleSort, setToggleSort] = useState(false);
  const {
    leave_requests: { data: leave_requests, isPending: isPending2 },
    leave_policies: { data: leave_policies, isPending: isPending3 },
    leave_accrued: { data: leave_accrued, isPending: isPending4 },
    leave_categories: { data: leave_categories, isPending: isPending5 },
    all_profiles: { data: all_profiles, isPending: isPending6 },
    user_profile: { data: user_profile, isPending: isPending7 },
  } = useData();
  const isPending =
    isPending2 ||
    isPending3 ||
    isPending4 ||
    isPending5 ||
    isPending6 ||
    isPending7;
  //--------------------------------------------------
  const current_user_profile = all_profiles?.find(
    (profile: database_profile_type) => employeeId == profile.user_id,
  );
  // format leave requests data
  const leave_requests_data: leave_data_types = leave_requests
    ?.filter(
      (e: database_leave_requests_type) =>
        e.user_id === employeeId && e.status !== "pending",
    )
    .map((e: database_leave_requests_type) => {
      const categorie: databese_leave_categories_type = leave_categories?.find(
        (categorie: databese_leave_categories_type) =>
          categorie.id ==
          leave_policies?.find(
            (p: database_leave_policies_type) => p.id == e.policy_id,
          )?.categories_id,
      );
      const reviewed_by_info = all_profiles?.find(
        (profile: database_profile_type) => profile.user_id === e.reviewed_by,
      )?.["Basic Information"];
      return {
        reviewed_comment: e.reviewed_comment,
        user_id: e.user_id,
        reviewed_by: reviewed_by_info
          ? reviewed_by_info?.["First name"] +
            " " +
            reviewed_by_info?.["Last name"]
          : "",
        reviewed_at: e.reviewed_at,
        status: e.status,
        created_at: new Date(e.created_at),
        name: categorie?.name,
        id: e.id,
        end_at: new Date(e.end_at),
        start_at: new Date(e.start_at),
        description: e.note,
        duration_used: e.duration_used?.reduce(
          (acc: number, e: any) => acc + Number(e.duration),
          0,
        ),
        duration_accrued: "",
        Balance: e.balance,
        track_time_unit: categorie?.track_time_unit,
      };
    });
  // format leave accrued data
  const leave_accrued_data: leave_data_types = leave_accrued
    ?.filter((e: database_leave_accrued_type) => e.user_id === employeeId)
    .map((e: database_leave_accrued_type) => {
      const categorie: databese_leave_categories_type = leave_categories?.find(
        (categorie: databese_leave_categories_type) =>
          categorie.id ==
          leave_policies?.find(
            (p: database_leave_policies_type) => p.id == e.policy_id,
          )?.categories_id,
      );
      return {
        status: "",
        created_at: new Date(e.created_at),
        name: categorie?.name,
        start_at: new Date(e.start_at),
        end_at: "",
        id: e.id,
        description: e.note,
        duration_used: "",
        duration_accrued: Number(e.duration),
        Balance: e.balance,
        track_time_unit: categorie?.track_time_unit,
      };
    });
  const DateHeader = () => (
    <span
      className="cursor-pointer"
      onClick={() => setToggleSort((old) => !old)}
    >
      Date
    </span>
  );
  return (
    <section className="mt-8 flex flex-col justify-center gap-1">
      <div className="mb-2 flex flex-row items-center gap-2">
        <FaHistory className="h-5 w-5" />
        <h1 className="font-bold">History</h1>
      </div>
      {!isPending ? (
        <>
          {leave_accrued_data && leave_requests_data && (
            <Filters data={[...leave_requests_data, ...leave_accrued_data]} />
          )}
          {toggleView ? (
            <HistoryTable
              layout="grid-cols-[20%_17.5%_15%_35%_auto]"
              Headers={[
                <DateHeader key={"header"} />,
                "Description",
                "Submitted",
                "Status",
                "(-)",
              ]}
              data={leave_requests_data
                ?.filter(
                  (e) =>
                    (year
                      ? year === new Date(e.start_at).getFullYear().toString()
                      : true) &&
                    (type ? type === e.name : true) &&
                    (status ? status === e.status : true),
                )
                .sort((a, b) =>
                  toggleSort
                    ? +new Date(a.start_at) - +new Date(b.start_at)
                    : +new Date(b.start_at) - +new Date(a.start_at),
                )
                .map((e) => ({
                  Date:
                    formatDDMMYYYY(new Date(e.start_at)) +
                    " - " +
                    formatDDMMYYYY(new Date(e.end_at)),
                  Description: (
                    <div className="flex flex-col capitalize">
                      <span>{e.name}</span>
                      <Link
                        href={{
                          pathname: `/people/${employeeId}/TimeOff`,
                          query: {
                            popup: "VIEW_LEAVE_REQUEST_COMMENT",
                            leave_request_id: e.id,
                          },
                        }}
                      >
                        <UnderlinedLink>
                          See Comments ({e.reviewed_comment ? 1 : 0})
                        </UnderlinedLink>
                      </Link>
                    </div>
                  ),
                  Submitted: formatDDMMYYYY(new Date(e.created_at)),
                  Status: (
                    <div className="flex w-fit flex-row gap-2 capitalize">
                      <UnderlinedLink>{e.status}</UnderlinedLink>
                      {e.reviewed_at && (
                        <span className="w-fit capitalize">
                          {`( was reviewed by ${
                            e.reviewed_by
                          } on ${formatDDMMYYYY(new Date(e.reviewed_at))} )`}
                        </span>
                      )}
                    </div>
                  ),
                  "(-)": e.duration_used
                    ? formatTotalHoursToTimeUnit(
                        e.duration_used,
                        e.track_time_unit,
                      )
                    : "",
                }))}
            />
          ) : (
            leave_accrued_data &&
            leave_requests_data && (
              <HistoryTable
                layout="grid-cols-[12%_auto_15%_12%_15%_8%]"
                Headers={[
                  <DateHeader key={"header"} />,
                  "Description",
                  "Used (-)",
                  "Accrued (+)",
                  "Balance",
                  " ",
                ]}
                data={[...leave_requests_data, ...leave_accrued_data]
                  ?.filter(
                    (e) =>
                      (year
                        ? year === new Date(e.start_at).getFullYear().toString()
                        : true) &&
                      (type ? type === e.name : true) &&
                      (e.status === "approved" || e.status === ""),
                  )
                  .sort((a, b) =>
                    toggleSort
                      ? +new Date(a.start_at) - +new Date(b.start_at)
                      : +new Date(b.start_at) - +new Date(a.start_at),
                  )
                  .map((e) => ({
                    Date: formatDDMMYYYY(new Date(e.start_at)),
                    Description: (
                      <>
                        <span className="capitalize">{e.name}</span>
                        {e.description && (
                          <>
                            <span> - </span>
                            <span className="caption-top text-sm leading-6 text-gray-21">
                              {e.description}
                            </span>
                          </>
                        )}
                      </>
                    ),
                    "Used (-)": e.duration_used
                      ? formatTotalHoursToTimeUnit(
                          e.duration_used,
                          e.track_time_unit,
                        )
                      : "",
                    "Accrued (+)": e.duration_accrued
                      ? formatTotalHoursToTimeUnit(
                          e.duration_accrued,
                          e.track_time_unit,
                        )
                      : "",
                    Balance: e.Balance,
                    " ": !e.duration_accrued &&
                      current_user_profile?.role === "admin" && (
                        <div className=" flex h-[4.25rem] w-full  flex-row  items-start justify-center gap-1 px-4 pt-3 text-center align-top text-gray-27  ">
                          <DeleteLeaveRequestBtn
                            className="hidden h-7 w-7 cursor-pointer rounded-md border border-transparent px-0.5 text-gray-25 transition-all ease-linear hover:border hover:border-black hover:bg-white group-hover:block"
                            leave_request_id={e.id}
                          />
                          <EditLeaveRequestBtn
                            className=" hidden h-7 w-7 cursor-pointer  rounded-md border border-transparent px-0.5 text-gray-25 transition-all ease-linear hover:border hover:border-black hover:bg-white group-hover:block"
                            leave_request_id={e.id}
                          />
                        </div>
                      ),
                  }))}
              />
            )
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
}
