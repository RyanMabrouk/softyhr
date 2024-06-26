"use client";
import React, { useContext, useEffect, useState } from "react";
import { formatDateToDayMonDD, formatYYYYMMDD } from "@/helpers/date.helpers";
import {
  formatTotalHoursToTimeUnit,
  useArrayOfWorkingDays,
} from "@/helpers/TimeOff/leave.helpers";
import {
  dateRangeContext,
  dateRangeContextType,
} from "../context/dateRangeContext";
import { removeDuplicateObjectsFromArray } from "@/helpers/array.helpers";
import { default_duration_type } from "../EditLeaveRequest";
import { databese_leave_categories_track_time_unit_type } from "@/types/database.tables.types";
import { Json } from "@/types/database.types";
import { errorContext, errorContextType } from "../context/errorContext";
import { useTotalDurationContext } from "../context/TotalDurationContext";
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
  //keep old range
  const [oldRange, setOldRange] = useState<default_duration_type[] | []>(
    default_duration?.map(
      (d: default_duration_type) =>
        ({
          date: formatYYYYMMDD(new Date(d.date)),
          duration: d.duration,
        }) ?? [],
    ),
  );
  // Get the active range
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
  // Get the new range
  const user_new_range = useArrayOfWorkingDays(activeDateStart, activeDateEnd);
  // Get the new range days
  const user_new_days = user_new_range?.map((e) =>
    formatYYYYMMDD(new Date(e.date)),
  );
  // calculate the active duration
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
  // calculate the total duration
  const { totalDuration, setTotalDuration } = useTotalDurationContext();
  useEffect(() => {
    setTotalDuration &&
      setTotalDuration(
        active_duration?.reduce(
          (acc, duration) => acc + Number(duration.duration),
          0,
        ),
      );
  }, [active_duration, formError, setTotalDuration]);
  if (totalDuration === null) return;
  return (
    <div
      className={`flex flex-col gap-1 ${active_duration?.length > 0 ? "" : "opacity-50"}`}
    >
      <label
        htmlFor={"Amount" + "_id"}
        className="relative w-fit text-sm text-gray-21"
      >
        {"Amount"}
        <span className="absolute -right-2 top-0 text-sm">*</span>
      </label>
      <div
        className={`flex w-fit flex-col items-center rounded-md  text-gray-27 ${active_duration?.length > 0 ? "border border-gray-18" : ""}`}
      >
        <div
          className={`focus:shadow-green max-h-[12.5rem] w-fit max-w-[20rem]   pt-2 shadow-sm placeholder:text-gray-14 focus:outline-none ${active_duration?.length > 0 ? "overflow-y-scroll" : ""}`}
        >
          {active_duration?.length > 0 ? (
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
                        id={duration.date}
                        defaultValue={duration.duration}
                        className={`flex h-8 w-12 items-center justify-center border p-2 px-3 text-gray-27 transition-all ease-linear focus:outline-none ${
                          formError?.["duration_date" + i]
                            ? "border-color9-500"
                            : "focus:shadow-green border-gray-18"
                        }`}
                        placeholder={"0"}
                        required
                        onChange={(e) => {
                          setOldRange((old) => [
                            { date: e.target.id, duration: e.target.value },
                            ...old,
                          ]);
                          if (
                            Number(e.target.value) > 16 ||
                            Number(e.target.value) < 0
                          ) {
                            setFormError &&
                              setFormError((old) =>
                                old
                                  ? {
                                      ...old,
                                      ["duration_date" + i]:
                                        "Duration must be between 0 and 16 hours",
                                    }
                                  : {
                                      ["duration_date" + i]:
                                        "Duration must be between 0 and 16 hours",
                                    },
                              );
                          } else {
                            setFormError &&
                              setFormError((old) =>
                                old
                                  ? { ...old, ["duration_date" + i]: "" }
                                  : {
                                      ["duration_date" + i]: "",
                                    },
                              );
                          }
                        }}
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
              ))
          ) : (
            <div className="-mt-2 ml-auto flex flex-row items-center gap-2 pr-8">
              <input
                disabled
                type="number"
                name={"duration_date"}
                className={`focus:shadow-green flex h-8 w-12 items-center justify-center rounded-sm border border-gray-18 p-2 px-3 text-gray-27 transition-all ease-linear focus:outline-none `}
              />
              <span className="text-[0.90rem]">Hours</span>
            </div>
          )}
        </div>
        {active_duration?.length > 0 && (
          <div className="flex w-full flex-row items-center gap-1  rounded-b-md bg-gray-14 px-4 py-3 text-lg  font-normal">
            Total:{" "}
            <span className=" capitalize">
              {formatTotalHoursToTimeUnit(totalDuration ?? 0, track_time_unit)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
