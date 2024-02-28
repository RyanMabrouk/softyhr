import React from "react";
import {
  firstDayOfMonth,
  getDaysInBetween,
  getSaturday,
  getSunday,
  sameDay,
} from "@/helpers/date.helpers";
import { lastDayOfMonth } from "date-fns";
export function Calendar({
  start_at,
  end_at,
}: {
  start_at: Date;
  end_at: Date;
}) {
  const days_of_the_week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendar_start_day =
    firstDayOfMonth(start_at).getDay() == 0
      ? firstDayOfMonth(start_at)
      : getSunday(firstDayOfMonth(start_at));
  const calendar_end_day =
    lastDayOfMonth(end_at).getDay() == 6
      ? lastDayOfMonth(end_at)
      : getSaturday(lastDayOfMonth(end_at));
  return (
    <div className="border-gray-38 flex w-[20rem] flex-col rounded-md border">
      <header className="bg-gray-37 px-6 py-1 text-center text-gray-30">{`${start_at.toLocaleString("default", { month: "long" })} ${start_at.getFullYear()} - ${end_at.toLocaleString("default", { month: "long" })} ${end_at.getFullYear()}`}</header>
      <section className=" grid border-collapse grid-cols-7 grid-rows-[auto]">
        {days_of_the_week.map((e, i) => (
          <span
            key={"day_of_the_week" + i}
            className="text-gray-39 bg-gray-40 border-collapse px-1 pb-1 pt-1 text-center text-[0.75rem]"
          >
            {e}
          </span>
        ))}
        {getDaysInBetween(calendar_start_day, calendar_end_day).map((date) => (
          <span
            key={date.toLocaleDateString()}
            className={`border-gray-38 flex h-9 max-h-9 border-collapse items-center justify-center border bg-clip-padding px-1.5 py-1.5 text-center text-[0.8rem] text-gray-30  ${date.getMonth() !== start_at.getMonth() && date.getMonth() !== end_at.getMonth() ? "bg-gray-40 text-opacity-50" : ""}`}
          >
            <span
              className={`z-20 ${sameDay(date, start_at) || sameDay(date, end_at) ? "flex aspect-square w-8 items-center justify-center rounded-full border-2 border-fabric-700 text-center" : ""}`}
            >
              {date.getDate()}
            </span>
          </span>
        ))}
      </section>
    </div>
  );
}
