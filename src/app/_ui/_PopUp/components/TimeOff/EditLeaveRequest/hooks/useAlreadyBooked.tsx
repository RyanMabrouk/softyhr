"use client";
import { database_leave_requests_type } from "@/types/database.tables.types";
import { useContext, useMemo } from "react";
import {
  dateRangeContext,
  dateRangeContextType,
} from "../context/dateRangeContext";
import { formatDDMMYYYY, getDaysInBetween } from "@/helpers/date.helpers";
import useEmployeeData from "@/hooks/useEmloyeeData";

export function useAlreadyBooked(employeeId: string | string[]) {
  const {
    leave_requests: { data: user_leave_requests },
  }: {
    leave_requests: { data: database_leave_requests_type[] };
  } = useEmployeeData({ employeeId: employeeId });
  // already booked days
  const already_booked_days = useMemo(
    () =>
      [
        ...new Set(
          user_leave_requests?.reduce<Date[]>(
            (acc, e: database_leave_requests_type) => [
              ...acc,
              ...getDaysInBetween(new Date(e.start_at), new Date(e.end_at)),
            ],
            [],
          ),
        ),
      ].map((e) => formatDDMMYYYY(e)),
    [user_leave_requests],
  );

  const { startDate, endDate } =
    useContext<dateRangeContextType>(dateRangeContext);

  const new_date_range = useMemo(() => {
    if (!startDate || !endDate) return [];
    return getDaysInBetween(new Date(startDate), new Date(endDate));
  }, [startDate, endDate]);

  return new_date_range?.reduce<boolean>(
    (acc, day) =>
      already_booked_days.includes(formatDDMMYYYY(day)) ? (acc = true) : acc,
    false,
  );
}