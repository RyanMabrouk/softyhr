"use client";
import React, { useContext } from "react";
import { HistoryTable } from "./HistoryTable";
import historyTableFilters from "../../context/historyTableFilters";
import { historyTableFiltersContextType } from "../../context/historyTableFilters";
import { UnderlinedLink } from "../../../../../../../_ui/UnderlinedLink";
import { formatDDMMYYYY } from "@/helpers/date.helpers";
import { formatTotalHoursToTimeUnit } from "@/helpers/TimeOff/leave.helpers";
import { useParams } from "next/navigation";
import Link from "next/link";
import toggleDateSortContext, {
  toggleDateSortContextType,
} from "../../context/toggleDateSortContext";
import useTranslation from "@/hooks/useTranslation";
import { leave_data_types } from "./History";
import { DateHeader } from "./DateHeader";

export function RequestsTable({ data }: { data: leave_data_types }) {
  const { toggleSort } = useContext<toggleDateSortContextType>(
    toggleDateSortContext,
  );
  const { year, type, status, toggleView } =
    useContext<historyTableFiltersContextType>(historyTableFilters);
  const { lang } = useTranslation();
  const { employeeId } = useParams();
  return (
    <HistoryTable
      layout="grid-cols-[20%_17.5%_15%_35%_auto] max-1880:grid-cols-[15%_20%_15%_35%_auto]"
      Headers={[
        <DateHeader key={"header"} />,
        "Description",
        lang?.["Time Off"].Submitted,
        lang?.["Time Off"].Status,
        "(-)",
      ]}
      data={data
        ?.filter(
          (e) =>
            (year
              ? year === new Date(e.start_at).getFullYear().toString()
              : true) &&
            (type ? type === e.name : true) &&
            (status ? status === e.status : true),
        )
        .sort((a, b) =>
          toggleSort
            ? +new Date(a.start_at) - +new Date(b.start_at)
            : +new Date(b.start_at) - +new Date(a.start_at),
        )
        .map((e) => ({
          Date:
            formatDDMMYYYY(new Date(e.start_at)) +
            " - " +
            formatDDMMYYYY(new Date(e.end_at)),
          Description: (
            <div className="flex flex-col capitalize">
              <span className="line-clamp-1">{e.name}</span>
              <Link
                href={{
                  pathname: `/people/${employeeId}/TimeOff`,
                  query: {
                    popup: "VIEW_LEAVE_REQUEST_COMMENT",
                    leave_request_id: e.id,
                  },
                }}
              >
                <UnderlinedLink>
                  {lang?.["Time Off"]["See Comments"]} (
                  {e.reviewed_comment ? 1 : 0})
                </UnderlinedLink>
              </Link>
            </div>
          ),
          [lang?.["Time Off"].Submitted ?? " "]: formatDDMMYYYY(
            new Date(e.created_at),
          ),
          [lang?.["Time Off"].Status ?? " "]: (
            <div className="flex w-fit flex-row gap-3 capitalize">
              <UnderlinedLink>{e.status}</UnderlinedLink>
              {e.reviewed_at && (
                <span className="w-fit capitalize">
                  {`( was reviewed by ${e.reviewed_by} on ${formatDDMMYYYY(new Date(e.reviewed_at))} )`}
                </span>
              )}
            </div>
          ),
          "(-)": e.duration_used
            ? formatTotalHoursToTimeUnit(e.duration_used, e.track_time_unit, {
                translated_unit: lang?.["Time Off"]?.[e.track_time_unit],
              })
            : "",
        }))}
    />
  );
}
