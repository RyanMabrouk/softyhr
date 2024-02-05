"use client";
import {
  database_leave_requests_type,
  database_profile_leave_balance_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import { useParams, useSearchParams } from "next/navigation";
import React, { useContext, useState } from "react";
import {
  dateRangeContext,
  dateRangeContextType,
} from "../context/dateRangeContext";
import { Amount } from "./Amount";
import { SelectGeneric } from "../../../../../SelectGeneric";
import { WarningIfDatesAlreadyBooked } from "./WarningIfDatesAlreadyBooked";
import useEmployeeData from "@/hooks/useEmloyeeData";
import { CalendarRange } from "./CalendarRange";
import useLeaveData from "@/hooks/TimeOff/useLeaveData";
import { TextFeildGeneric } from "../../../../../TextFeildGeneric";
import useData from "@/hooks/useData";
import usePolicy from "@/hooks/usePolicy";
import TotalDurationContextProvider from "../context/TotalDurationContext";
import { WarningIfUserDoesntHaveEnoughBalance } from "./WarningIfUserDoesntHaveEnoughBalance";
export function FormInputs() {
  const searchParams = useSearchParams();
  const { setStartDate, setEndDate } =
    useContext<dateRangeContextType>(dateRangeContext);
  const leave_request_id: number | undefined = Number(
    searchParams.get("leave_request_id"),
  );
  const leave_policy_id: number | undefined = Number(
    searchParams.get("leave_policy_id"),
  );
  const {
    user_profile: { data: user_profile },
  } = useData();
  const employeeId = useParams().employeeId ?? user_profile?.user_id;
  const {
    leave_categories: { data: leave_categories },
  } = useLeaveData();
  const {
    leave_requests: { data: leave_requests },
    leave_balance: { data: current_user_leave_balance },
  } = useEmployeeData({ employeeId: employeeId });
  // User Leave Balance
  const current_user_categories_ids = current_user_leave_balance?.map(
    (e: database_profile_leave_balance_type) => Number(e.categories_id),
  );
  // Leave Request Data
  const request_data: database_leave_requests_type | undefined =
    leave_requests?.find(
      (request: database_leave_requests_type) => request.id == leave_request_id,
    );
  const policy_id = request_data?.policy_id ?? leave_policy_id;
  // Selected Policy
  const [selectedPolicy, setSelectedPolicy] = useState<string | undefined>(
    String(policy_id),
  );
  // default policy and Category
  const { policy, category } = usePolicy({
    policy_id: Number(selectedPolicy) ?? policy_id,
  });
  return (
    <div className="flex flex-col gap-2 pb-3">
      <div className="flex flex-row gap-4">
        <CalendarRange
          label="Pick a date"
          startDateName="start_at"
          endDateName="end_at"
          defaultValue={
            request_data?.start_at && request_data?.end_at
              ? {
                  from: new Date(request_data?.start_at),
                  to: new Date(request_data?.end_at),
                }
              : undefined
          }
          setStartValueInParent={setStartDate}
          setEndValueInParent={setEndDate}
          required
        />
        <WarningIfDatesAlreadyBooked />
      </div>
      <SelectGeneric
        label="Time Off Category"
        required
        name="policy_id"
        setValueInParent={setSelectedPolicy}
        defaultValue={
          policy && { label: category?.name, value: String(policy?.id) }
        }
        options={leave_categories
          ?.filter((category: databese_leave_categories_type) =>
            current_user_categories_ids?.includes(category.id),
          )
          .map((category: databese_leave_categories_type) => ({
            label:
              category.name.charAt(0).toUpperCase() + category.name.slice(1),
            value: current_user_leave_balance?.find(
              (e: database_profile_leave_balance_type) =>
                category.id == e.categories_id,
            )?.policy_id,
          }))}
      />
      <TotalDurationContextProvider>
        <div className="flex flex-row items-center gap-4">
          <Amount
            default_duration={request_data?.duration_used ?? []}
            default_satrt_at={request_data?.start_at ?? ""}
            default_end_at={request_data?.end_at ?? ""}
            track_time_unit={category?.track_time_unit ?? "hours"}
          />
          <WarningIfUserDoesntHaveEnoughBalance
            employeeId={employeeId as string}
            policy_id={selectedPolicy}
          />
        </div>
      </TotalDurationContextProvider>
      <TextFeildGeneric
        name="note"
        label="Note"
        required={false}
        defaultValue={request_data?.note ?? ""}
      />
    </div>
  );
}
