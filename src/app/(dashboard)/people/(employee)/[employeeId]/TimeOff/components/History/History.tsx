"use client";
import React from "react";
import { FaHistory } from "react-icons/fa";
import { Filters } from "../Filters";
import {
  database_leave_accrued_type,
  database_leave_policies_type,
  database_leave_request_status_type,
  database_leave_requests_type,
  database_profile_type,
  databese_leave_categories_track_time_unit_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import { useParams } from "next/navigation";
import useEmployeeData from "@/hooks/useEmloyeeData";
import useLeaveData from "@/hooks/TimeOff/useLeaveData";
import useProfiles from "@/hooks/useProfiles";
import useTranslation from "@/translation/useTranslation";
import { TablesToggle } from "./TablesToggle";
export interface leave_data {
  user_id: string;
  reviewed_by?: string | "";
  reviewed_at?: string | "";
  status: database_leave_request_status_type | "";
  created_at: Date;
  name: string;
  id: number;
  end_at: Date | "";
  start_at: Date;
  description: string;
  duration_used: number | "";
  duration_accrued?: number | string;
  Balance: number;
  reviewed_comment?: string | "";
  track_time_unit: databese_leave_categories_track_time_unit_type;
}
export type leave_data_types = leave_data[] | undefined;
export function History() {
  const { lang } = useTranslation();
  const { employeeId } = useParams();
  const {
    leave_policies: { data: leave_policies, isPending: isPending3 },
    leave_categories: { data: leave_categories, isPending: isPending5 },
  } = useLeaveData();
  const {
    profiles: { data: all_profiles_basic_info, isPending: isPending6 },
  } = useProfiles();
  const {
    leave_accrued: { data: leave_accrued, isPending: isPending4 },
    leave_requests: { data: leave_requests, isPending: isPending2 },
  } = useEmployeeData({ employeeId: employeeId as string });
  const isPending =
    isPending2 || isPending3 || isPending4 || isPending5 || isPending6;
  // format leave requests data
  const leave_requests_data: leave_data_types =
    leave_requests
      ?.filter((e: database_leave_requests_type) => e.status !== "pending")
      .map((e: database_leave_requests_type) => {
        const policy = leave_policies?.find(
          (p: database_leave_policies_type) => p.id == e.policy_id,
        );
        const categorie = leave_categories?.find(
          (categorie: databese_leave_categories_type) =>
            categorie.id == policy?.categories_id,
        );
        const reviewed_by_info = all_profiles_basic_info?.find(
          (profile: database_profile_type) => profile.user_id === e.reviewed_by,
        )?.["Basic Information"];
        return {
          reviewed_comment: e.reviewed_comment ?? "",
          user_id: e.user_id,
          reviewed_by: reviewed_by_info
            ? reviewed_by_info?.["First name"] +
              " " +
              reviewed_by_info?.["Last name"]
            : "",
          reviewed_at: e.reviewed_at as string,
          status: e.status as database_leave_request_status_type,
          created_at: new Date(e.created_at),
          name: categorie?.name ?? "",
          id: e.id,
          end_at: new Date(e.end_at),
          start_at: new Date(e.start_at),
          description: e.note ?? "",
          duration_used: e.duration_used?.reduce(
            (acc: number, e: any) => acc + Number(e.duration),
            0,
          ),
          duration_accrued: "",
          Balance: e.balance,
          track_time_unit:
            categorie?.track_time_unit as databese_leave_categories_track_time_unit_type,
        };
      }) ?? [];
  // format leave accrued data
  const leave_accrued_data: leave_data_types =
    leave_accrued?.map((e: database_leave_accrued_type) => {
      const categorie = leave_categories?.find(
        (categorie: databese_leave_categories_type) =>
          categorie.id ==
          leave_policies?.find(
            (p: database_leave_policies_type) => p.id == e.policy_id,
          )?.categories_id,
      );
      return {
        status: "",
        user_id: e.user_id,
        created_at: new Date(e.created_at),
        name: categorie?.name ?? "",
        start_at: new Date(e.start_at),
        end_at: "",
        id: e.id,
        description: e.note ?? "",
        duration_used: "",
        duration_accrued: Number(e.duration),
        Balance: e.balance,
        track_time_unit: categorie?.track_time_unit ?? "hours",
      };
    }) ?? [];

  return (
    <section className="mt-8 flex flex-col justify-center gap-1">
      <div className="mb-2 flex flex-row items-center gap-2">
        <FaHistory className="h-5 w-5" />
        <h1 className="font-bold">{lang?.["Time Off"].History}</h1>
      </div>
      {!isPending ? (
        <>
          <Filters data={[...leave_requests_data, ...leave_accrued_data]} />
          <TablesToggle
            leave_requests_data={leave_requests_data}
            leave_accrued_data={leave_accrued_data}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
}
