"use client";
import React, { useContext } from "react";
import { formatDateToDayMonDD, formatYYYYMMDD } from "@/helpers/date.helpers";
import {
  arrayOfWorkingDays,
  formatTotalHoursToTimeUnit,
} from "@/helpers/leave.helpers";
import {
  dateRangeContext,
  dateRangeContextType,
} from "../context/dateRangeContext";
import { removeDuplicateObjectsFromArray } from "@/helpers/array.helpers";
import { default_duration_type } from "../EditLeaveRequest";
import { databese_leave_categories_track_time_unit_type } from "@/types/database.tables.types";
import { Json } from "@/types/database.types";
import { errorContext, errorContextType } from "../context/errorContext";
export function Amount({
  default_duration,
  track_time_unit,
  default_satrt_at,
  default_end_at,
}: {
  /* Json supabse type is diffrent from JSON ts type so its brokren (supabse bug/limit) :/ so i used "any" in default_duration */
  default_duration: Json[] | any;
  track_time_unit: databese_leave_categories_track_time_unit_type | string;
  default_satrt_at: string | "";
  default_end_at: string | "";
}) {
  const { setFormError, formError } =
    useContext<errorContextType>(errorContext);
  const { startDate, endDate } =
    useContext<dateRangeContextType>(dateRangeContext);
  const oldRange = default_duration?.map(
    (d: default_duration_type) =>
      ({
        date: formatYYYYMMDD(new Date(d.date)),
        duration: d.duration,
      }) ?? [],
  );
  const activeDateStart = startDate
    ? startDate
    : default_satrt_at
      ? new Date(default_satrt_at)
      : "";
  const activeDateEnd = endDate
    ? endDate
    : default_satrt_at
      ? new Date(default_end_at)
      : "";
  const user_new_range =
    activeDateStart && activeDateEnd
      ? arrayOfWorkingDays(activeDateStart, activeDateEnd)
      : [];
  const user_new_days = user_new_range?.map((e) =>
    formatYYYYMMDD(new Date(e.date)),
  );
  const active_duration = removeDuplicateObjectsFromArray(
    [
      ...(oldRange?.filter((e: any) =>
        user_new_days.length > 0
          ? user_new_days.includes(formatYYYYMMDD(new Date(e.date)))
          : true,
      ) ?? []),
      ...(user_new_range ?? []),
    ],
    "date",
  );
  const total_duration = active_duration?.reduce(
    (acc, duration) => acc + Number(duration.duration),
    0,
  );
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={"Amount" + "_id"}
        className="relative w-fit text-sm text-gray-21"
      >
        {"Amount"}
        <span className="absolute -right-2 top-0 text-sm">*</span>
      </label>
      <div className="flex w-fit flex-col items-center rounded-md border border-gray-18 text-gray-27">
        <div className="focus:shadow-green max-h-[12.5rem] w-fit max-w-[20rem] overflow-y-scroll  pt-2 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px] placeholder:text-gray-14 focus:outline-none ">
          {active_duration?.length > 0 &&
            active_duration
              ?.sort((a, b) => +new Date(a.date) - +new Date(b.date))
              .map((duration: default_duration_type, i) => (
                <div
                  key={duration.date + " " + i}
                  className="mr-auto flex w-full flex-col justify-center gap-0.5 px-2 pb-2"
                >
                  <div className="flex flex-row items-center justify-evenly gap-8 px-4 py-1">
                    <span>{formatDateToDayMonDD(new Date(duration.date))}</span>
                    <div className="ml-auto flex flex-row items-center gap-2 pr-8">
                      <input
                        type="number"
                        name={"duration_date"}
                        defaultValue={duration.duration}
                        onChange={(e) => {
                          if (
                            Number(e.target.value) > 24 ||
                            Number(e.target.value) < 0
                          )
                            setFormError &&
                              setFormError((old) =>
                                old
                                  ? {
                                      ...old,
                                      ["duration_date" + i]:
                                        "Duration must be between 0 and 24 hours",
                                    }
                                  : {
                                      ["duration_date" + i]:
                                        "Duration must be between 0 and 24 hours",
                                    },
                              );
                        }}
                        className={`flex h-8 w-12 items-center justify-center border p-2 px-3 text-gray-27 focus:outline-none ${
                          formError?.["duration_date" + i]
                            ? "border-color9-500"
                            : "focus:shadow-green border-gray-18"
                        }`}
                        placeholder={"0"}
                        required
                      />
                      <span>Hours</span>
                    </div>
                  </div>{" "}
                  {formError?.["duration_date" + i] && (
                    <span className="px-4 text-color9-500">
                      {formError?.["duration_date" + i]}
                    </span>
                  )}
                </div>
              ))}
        </div>
        <div className="flex w-full flex-row items-center gap-1  bg-gray-14 px-4 py-3 text-lg font-normal">
          Total:{" "}
          <span className=" capitalize">
            {formatTotalHoursToTimeUnit(total_duration, track_time_unit)}
          </span>
        </div>
      </div>
    </div>
  );
}
