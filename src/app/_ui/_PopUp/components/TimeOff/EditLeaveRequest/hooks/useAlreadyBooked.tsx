"use client";
import { database_leave_requests_type } from "@/types/database.tables.types";
import { useContext, useMemo } from "react";
import {
  dateRangeContext,
  dateRangeContextType,
} from "../context/dateRangeContext";
import {
  formatDDMMYYYY,
  getDaysInBetween,
  sameDay,
} from "@/helpers/date.helpers";
import useEmployeeData from "@/hooks/useEmloyeeData";
import { useSearchParams } from "next/navigation";
export function useAlreadyBooked(employeeId: string | string[]) {
  const {
    leave_requests: { data: user_leave_requests },
  }: {
    leave_requests: { data: database_leave_requests_type[] | undefined | null };
  } = useEmployeeData({ employeeId: String(employeeId) });
  const searchParams = useSearchParams();
  const leave_request_id = Number(searchParams.get("leave_request_id"));
  // Leave Requests Data
  const request_data: database_leave_requests_type | undefined =
    user_leave_requests?.find(
      (request: database_leave_requests_type) => request.id == leave_request_id,
    );
  const old_start_at = new Date(request_data?.start_at ?? "");
  const old_end_at = new Date(request_data?.end_at ?? "");
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
  return new_date_range?.some(
    (day) =>
      already_booked_days.includes(formatDDMMYYYY(day)) &&
      ((+day < +old_start_at && !sameDay(day, old_start_at)) ||
        (+day > +old_end_at && !sameDay(day, old_end_at))),
  );
}
