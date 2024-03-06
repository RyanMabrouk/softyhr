"use client";
import React, { useContext } from "react";
import historyTableFilters from "../../context/historyTableFilters";
import { historyTableFiltersContextType } from "../../context/historyTableFilters";
import { RequestsTable } from "./RequestsTable";
import { BalanceTable } from "./BalanceTable";
import { leave_data } from "./History";
import useLeaveData from "@/hooks/TimeOff/useLeaveData";

export function TablesToggle({
  leave_requests_data,
  leave_accrued_data,
}: {
  leave_requests_data: leave_data[];
  leave_accrued_data: leave_data[];
}) {
  const { toggleView } =
    useContext<historyTableFiltersContextType>(historyTableFilters);
  return (
    <>
      {toggleView ? (
        <RequestsTable data={leave_requests_data} />
      ) : (
        <BalanceTable data={[...leave_requests_data, ...leave_accrued_data]} />
      )}
    </>
  );
}
