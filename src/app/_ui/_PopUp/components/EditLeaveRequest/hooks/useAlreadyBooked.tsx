"use client";
import useData from "@/hooks/useData";
import { database_leave_requests_type } from "@/types/database.tables.types";
import { useContext, useMemo } from "react";
import {
  dateRangeContext,
  dateRangeContextType,
} from "../context/dateRangeContext";
import { formatDDMMYYYY, getDaysInBetween } from "@/helpers/date.helpers";

export function useAlreadyBooked(employeeId: string | string[]) {
  const {
    leave_requests: { data: leave_requests },
  } = useData();
  // User Leave Requests
  const user_leave_requests: database_leave_requests_type[] =
    leave_requests?.filter(
      (e: database_leave_requests_type) => e.user_id === employeeId,
    );
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
