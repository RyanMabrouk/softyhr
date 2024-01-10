"use client";
import useData from "@/hooks/useData";
import {
  database_leave_policies_type,
  database_leave_requests_type,
  database_profile_leave_balance_type,
  database_profile_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import { useParams, useSearchParams } from "next/navigation";
import React, { useContext } from "react";
import {
  dateRangeContext,
  dateRangeContextType,
} from "../context/dateRangeContext";
import { DateInput } from "./DateInput";
import { Amount } from "./Amount";
import { CategoriesSelect } from "./CategoriesSelect";
import { WarningIfDatesAlreadyBooked } from "./WarningIfDatesAlreadyBooked";
import { errorContext, errorContextType } from "../context/errorContext";
export function FormInputs() {
  const searchParams = useSearchParams();
  const { setStartDate, setEndDate } =
    useContext<dateRangeContextType>(dateRangeContext);
  const leave_request_id = Number(searchParams.get("leave_request_id"));
  const leave_policy_id = Number(searchParams.get("leave_policy_id"));
  const { employeeId } = useParams();
  const {
    leave_categories: { data: leave_categories, isPending: isPending1 },
    leave_policies: { data: leave_policies, isPending: isPending2 },
    leave_requests: { data: leave_requests, isPending: isPending3 },
    all_profiles: { data: all_profiles, isPending: isPending4 },
  } = useData();
  // User Profile Data
  const current_user_profile = all_profiles?.filter(
    (profile: database_profile_type) => profile.user_id === employeeId,
  );
  // User Leave Balance
  const current_user_leave_balance: database_profile_leave_balance_type[] =
    current_user_profile?.[0]?.leave_balance;
  const current_user_categories_ids = current_user_leave_balance?.map(
    (e: any) => Number(e.categories_id),
  );
  // Leave Request Data
  const request_data: database_leave_requests_type | undefined =
    leave_requests?.find(
      (request: database_leave_requests_type) => request.id == leave_request_id,
    );
  // Current User Leave Policy
  const policy: database_leave_policies_type = leave_policies?.find(
    (policy: database_leave_policies_type) =>
      policy.id === request_data?.policy_id || policy.id === leave_policy_id,
  );
  // Current User Leave Policy Category
  const categorie: databese_leave_categories_type = leave_categories?.find(
    (categorie: databese_leave_categories_type) =>
      policy.categories_id === categorie.id,
  );
  return (
    <div className="flex flex-col gap-2 pb-3">
      <div className="flex flex-row items-center gap-2">
        <DateInput
          label="From"
          name="start_at"
          defaultValue={request_data?.start_at ?? ""}
          setValueInParent={setStartDate}
        />
        <span className="-mb-4 text-3xl font-light leading-4"> - </span>
        <DateInput
          label="To"
          name="end_at"
          defaultValue={request_data?.end_at ?? ""}
          setValueInParent={setEndDate}
        />
        <WarningIfDatesAlreadyBooked />
      </div>
      <CategoriesSelect
        label="Time Off Category"
        name="policy_id"
        defaultValue={{ label: categorie?.name, value: policy?.id }}
        options={leave_categories
          ?.filter(
            (category: databese_leave_categories_type) =>
              current_user_categories_ids?.includes(category.id),
          )
          .map((category: databese_leave_categories_type) => ({
            label:
              category.name.charAt(0).toUpperCase() + category.name.slice(1),
            value: current_user_leave_balance.find(
              (e) => category.id == e.categories_id,
            )?.policy_id,
          }))}
      />
      {
        <Amount
          default_duration={request_data?.duration_used ?? []}
          default_satrt_at={request_data?.start_at ?? ""}
          default_end_at={request_data?.end_at ?? ""}
          track_time_unit={categorie?.track_time_unit ?? "hours"}
        />
      }
      <div className="flex flex-col gap-1">
        <label htmlFor="note" className="text-sm text-gray-21">
          Note
        </label>
        <textarea
          name="note"
          className="focus:shadow-green maw-w-[20rem] rounded-md border  border-gray-18 px-2 py-1 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px] placeholder:text-gray-14 focus:outline-none "
          id="note"
          cols={10}
          rows={5}
          defaultValue={request_data?.note ?? ""}
          draggable
        />
      </div>
    </div>
  );
}
