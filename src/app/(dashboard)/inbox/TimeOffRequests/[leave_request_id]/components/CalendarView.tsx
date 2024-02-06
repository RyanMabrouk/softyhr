import React from "react";
export function CalendarView({ date }: { date: Date }) {
  return (
    <div className="flex w-12 min-w-[3.5rem] flex-col rounded-sm border-[3px] border-solid border-gray-21 text-center">
      <span className="bg-gray-21 text-sm uppercase text-white">
        {date.toLocaleString("default", { month: "short" })}
      </span>
      <span className="py-0.5 text-xl text-gray-21">{date.getDate()}</span>
    </div>
  );
}
