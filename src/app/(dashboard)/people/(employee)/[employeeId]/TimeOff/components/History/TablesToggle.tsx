"use client";
import React, { useContext } from "react";
import historyTableFilters from "../../context/historyTableFilters";
import { historyTableFiltersContextType } from "../../context/historyTableFilters";
import { databese_leave_categories_type } from "@/types/database.tables.types";
import { RequestsTable } from "./RequestsTable";
import { BalanceTable } from "./BalanceTable";
import { leave_data } from "./History";

export function TablesToggle({
  leave_requests_data,
  leave_accrued_data,
  leave_categories,
}: {
  leave_requests_data: leave_data[];
  leave_accrued_data: leave_data[];
  leave_categories: databese_leave_categories_type[] | undefined | null;
}) {
  const { type, toggleView } =
    useContext<historyTableFiltersContextType>(historyTableFilters);
  // active filter category
  const active_track_time_unit = leave_categories?.find(
    (e) => e.name === type,
  )?.track_time_unit;
  return (
    <>
      {toggleView ? (
        <RequestsTable data={leave_requests_data} />
      ) : (
        <BalanceTable
          data={[...leave_requests_data, ...leave_accrued_data]}
          active_track_time_unit={active_track_time_unit}
        />
      )}
    </>
  );
}
