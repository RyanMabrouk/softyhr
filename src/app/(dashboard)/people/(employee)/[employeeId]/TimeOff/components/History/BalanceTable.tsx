"use client";
import React, { useContext } from "react";
import { HistoryTable } from "./HistoryTable";
import historyTableFilters from "../../context/historyTableFilters";
import { historyTableFiltersContextType } from "../../context/historyTableFilters";
import { formatDDMMYYYY } from "@/helpers/date.helpers";
import { formatTotalHoursToTimeUnit } from "@/helpers/TimeOff/leave.helpers";
import { EditLeaveRequestBtn } from "../Buttons/EditLeaveRequestBtn";
import { DeleteLeaveRequestBtn } from "../Buttons/DeleteLeaveRequestBtn";
import toggleDateSortContext, {
  toggleDateSortContextType,
} from "../../context/toggleDateSortContext";
import RoleGuard from "@/app/_ui/RoleGuard";
import useTranslation from "@/translation/useTranslation";
import { leave_data_types } from "./History";
import { DateHeader } from "./DateHeader";
import useLeaveData from "@/hooks/TimeOff/useLeaveData";

export function BalanceTable({ data }: { data: leave_data_types }) {
  const { year, type } =
    useContext<historyTableFiltersContextType>(historyTableFilters);
  const { toggleSort } = useContext<toggleDateSortContextType>(
    toggleDateSortContext,
  );
  const { lang } = useTranslation();
  // active filter category
  const {
    leave_categories: { data: leave_categories, isPending: isPending5 },
  } = useLeaveData();
  const active_track_time_unit = leave_categories?.find(
    (e) => e.name === type,
  )?.track_time_unit;
  // headers
  const used_hours_header = `${active_track_time_unit ? lang?.["Time Off"]?.[active_track_time_unit] + " " : ""}${lang?.["Time Off"].Used} (-)`;
  const accrued_hours_header = `${active_track_time_unit ? lang?.["Time Off"]?.[active_track_time_unit] + " " : ""}${lang?.["Time Off"].Accrued} (+)`;
  return (
    <HistoryTable
      layout="grid-cols-[12%_auto_17%_17%_12%_8%]"
      Headers={[
        <DateHeader key={"header"} />,
        "Description",
        used_hours_header,
        accrued_hours_header,
        lang?.["Time Off"].Balance,
        " ",
      ]}
      data={data
        ?.filter(
          (e) =>
            (year
              ? year === new Date(e.start_at).getFullYear().toString()
              : true) &&
            (type ? type === e.name : true) &&
            (e.status === "approved" || e.status === ""),
        )
        .sort((a, b) =>
          toggleSort
            ? +new Date(a.start_at) - +new Date(b.start_at)
            : +new Date(b.start_at) - +new Date(a.start_at),
        )
        .map((e) => ({
          Date: formatDDMMYYYY(new Date(e.start_at)),
          Description: (
            <>
              <span className="capitalize max-1860:text-sm">{e.name}</span>
              {e.description && (
                <>
                  <span className="max-1860:text-sm"> - </span>
                  <span className="caption-top text-sm leading-6  text-gray-21 max-1860:text-[0.8rem]">
                    {e.description}
                  </span>
                </>
              )}
            </>
          ),
          [used_hours_header]: e.duration_used ? (
            <span
              className={` flex w-full text-center max-1860:text-sm ${active_track_time_unit ? "ml-10" : ""}`}
            >
              {formatTotalHoursToTimeUnit(e.duration_used, e.track_time_unit, {
                remove_time_unit: active_track_time_unit !== undefined,
                translated_unit: lang?.["Time Off"]?.[e.track_time_unit],
              })}
            </span>
          ) : (
            <></>
          ),
          [accrued_hours_header]: e.duration_accrued ? (
            <span
              className={` flex w-full text-center max-1860:text-sm ${active_track_time_unit ? "ml-10" : ""}`}
            >
              {formatTotalHoursToTimeUnit(
                Number(e.duration_accrued),
                e.track_time_unit,
                {
                  remove_time_unit: active_track_time_unit !== undefined,
                  translated_unit: lang?.["Time Off"]?.[e.track_time_unit],
                },
              )}
            </span>
          ) : (
            ""
          ),
          [lang?.["Time Off"].Balance ?? "  "]: (
            <span className="ml-1 flex w-full text-center max-1860:text-sm">
              {formatTotalHoursToTimeUnit(e.Balance, e.track_time_unit, {
                remove_time_unit: active_track_time_unit !== undefined,
                translated_unit: lang?.["Time Off"]?.[e.track_time_unit],
              })}
            </span>
          ),
          " ": !e.duration_accrued && (
            <div className=" flex h-[4.25rem] w-full  flex-row  items-start justify-center gap-1 px-4 pt-3 text-center align-top text-gray-27  ">
              <RoleGuard permissions={["delete:leave_requests"]}>
                <DeleteLeaveRequestBtn
                  className="hidden h-7 w-7 cursor-pointer rounded-md border border-transparent px-0.5 text-gray-25 transition-all ease-linear hover:border hover:border-black hover:bg-white group-hover:block"
                  leave_request_id={e.id}
                />
              </RoleGuard>
              <RoleGuard permissions={["edit:approved_leave_requests"]}>
                <EditLeaveRequestBtn
                  className=" hidden h-7 w-7 cursor-pointer  rounded-md border border-transparent px-0.5 text-gray-25 transition-all ease-linear hover:border hover:border-black hover:bg-white group-hover:block"
                  leave_request_id={e.id}
                />
              </RoleGuard>
            </div>
          ),
        }))}
    />
  );
}
