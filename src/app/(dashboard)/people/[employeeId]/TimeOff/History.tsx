"use client";
import React, { useContext } from "react";
import { FaHistory } from "react-icons/fa";
import { HistoryTable } from "./HistoryTable";
import { DeleteEditBtns } from "./_ui/DeleteEditBtns";
import historyTableFilters from "./_context/historyTableFilters";
import { historyTableFiltersContextType } from "./_context/historyTableFilters"; // Import the type of the context
import { UnderlinedLink } from "./_ui/UnderlinedLink";
import { formatDDMMYYYY } from "@/helpers/date";
import useData from "@/hooks/useData";
import { Filters } from "./Filters";
import {
  database_leave_accrued_type,
  database_leave_policies_type,
  database_leave_requests_type,
  database_profile_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import { formatTotalHoursToTimeUnit } from "@/helpers/leave.helpers";
interface leave_data {
  reviewed_by: string | "";
  reviewed_at: string | "";
  status: "pending" | "approved" | "rejected" | "canceled" | "";
  created_at: Date;
  name: string;
  id: number;
  end_at: Date | "";
  start_at: Date;
  description: string;
  duration_used: number | "";
  duration_accrued: number | "";
  Balance: number | "";
  track_time_unit: "hours" | "days";
}
export type leave_data_types = leave_data[] | undefined;
export function History() {
  const { year, type, toggleView } =
    useContext<historyTableFiltersContextType>(historyTableFilters);
  const {
    leave_requests: { data: leave_requests, isPending: isPending2 },
    leave_policies: { data: leave_policies, isPending: isPending3 },
    leave_accrued: { data: leave_accrued, isPending: isPending4 },
    leave_categories: { data: leave_categories, isPending: isPending5 },
    all_profiles: { data: all_profiles, isPending: isPending6 },
  } = useData();
  const isPending =
    isPending2 || isPending3 || isPending4 || isPending5 || isPending6;
  //--------------------------------------------------
  //NOT CORRECT TYPE ANY HERE PLEASE FIX
  const leave_requests_data: leave_data_types = leave_requests?.map(
    (e: database_leave_requests_type) => {
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
    },
  );
  //NOT CORRECT TYP HERE PLEASE FIX
  const leave_accrued_data: leave_data_types = leave_accrued?.map(
    (e: database_leave_accrued_type) => {
      const categorie: databese_leave_categories_type = leave_categories?.find(
        (categorie: databese_leave_categories_type) =>
          categorie.id ==
          leave_policies?.find(
            (p: database_leave_policies_type) => p.id == e.policy_id,
          )?.categories_id,
      );
      return {
        reviewed_by: "",
        reviewed_at: "",
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
    },
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
              layout="grid-cols-[20%_20%_20%_auto_8%]"
              Headers={["Date", "Description", "Submitted", "Status", "(-)"]}
              data={leave_requests_data
                ?.filter((e) =>
                  year
                    ? year === new Date(e.start_at).getFullYear().toString()
                    : true,
                )
                .filter((e) => (type ? type === e.name : true))
                .map((e) => ({
                  Date:
                    formatDDMMYYYY(new Date(e.start_at)) +
                    " - " +
                    formatDDMMYYYY(new Date(e.end_at)),
                  Description: (
                    <div className="flex flex-col capitalize">
                      <span>{e.name}</span>
                      <UnderlinedLink>See Comments (1)</UnderlinedLink>
                    </div>
                  ),
                  Submitted: formatDDMMYYYY(new Date(e.created_at)),
                  Status: (
                    <div className="flex flex-row gap-1 capitalize">
                      <UnderlinedLink>{e.status}</UnderlinedLink>
                      {e.reviewed_at && (
                        <span className="capitalize">
                          ({e.reviewed_by}{" "}
                          {formatDDMMYYYY(new Date(e.reviewed_at))})
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
                layout="grid-cols-[12%_auto_12%_12%_12%_8%]"
                Headers={[
                  "Date",
                  "Description",
                  "Used (-)",
                  "Accrued (+)",
                  "Balance",
                  " ",
                ]}
                data={[...leave_requests_data, ...leave_accrued_data]
                  ?.filter((e) =>
                    year
                      ? year === new Date(e.start_at).getFullYear().toString()
                      : true,
                  )
                  .filter((e) => (type ? type === e.name : true))
                  .map((e) => ({
                    Date: formatDDMMYYYY(new Date(e.start_at)),
                    Description: (
                      <>
                        <span className="capitalize">{e.name}</span>
                        {e.description && (
                          <>
                            <span> - </span>
                            <span className="text-sm leading-6 text-gray-21">
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
                    " ": new Date(e.start_at) > new Date() && (
                      <DeleteEditBtns
                        key={e.id + "edit/del"}
                        leave_request_id={e.id}
                      />
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
