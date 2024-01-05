"use client";
import React, { useContext } from "react";
import { FaHistory } from "react-icons/fa";
import { HistoryTable } from "./HistoryTable";
import { DeleteEditBtns } from "./DeleteEditBtns";
import { FilterSelect } from "./_ui/FilterSelect";
import historyTableFilters from "./_context/historyTableFilters";
import { historyTableFiltersContextType } from "./_context/historyTableFilters"; // Import the type of the context
import { UnderlinedLink } from "./_ui/UnderlinedLink";
import { formatDDMMYYYY } from "@/helpers/date";
import useData from "@/hooks/useData";

export function History() {
  const { year, type, setType, setYear, toggleView, setToggleView } =
    useContext<historyTableFiltersContextType>(historyTableFilters);
  const test = useData();
  const data = [
    {
      reviewed_by: "",
      reviewed_at: "",
      status: "Pending",
      created_at: new Date().toISOString(),
      name: "Annual Vacation",
      id: 1,
      end_at: new Date("2022-05-25").toISOString(),
      start_at: "2022-01-10",
      description: "Taking kids on a beach vacation.",
      duration_used: "",
      duration_accrued: "10",
      Balance: "20",
    },
    {
      reviewed_by: "",
      reviewed_at: "",
      status: "Pending",
      created_at: new Date().toISOString(),
      name: "Annual Vacation",
      id: 2,
      end_at: new Date("2022-05-25").toISOString(),
      start_at: "2022-01-15",
      description:
        "Taking kids on a beach vacation.Taking kids on a beach vacation.Taking kids on a beach vacation.Taking kids on a beachvacation.",
      duration_used: "10",
      duration_accrued: "",
      Balance: "10",
    },
    {
      reviewed_by: "Rayen Mabrouk",
      reviewed_at: new Date().toISOString(),
      status: "Approved",
      created_at: new Date().toISOString(),
      id: 3,
      name: "Sick Leave",
      end_at: new Date("2022-05-25").toISOString(),
      start_at: "2022-05-20",
      description: "Taking kids on a beach vacation.",
      duration_used: "2",
      duration_accrued: "",
      Balance: "8",
    },
    {
      reviewed_by: "",
      reviewed_at: "",
      status: "Pending",
      created_at: new Date().toISOString(),
      id: 4,
      name: "Family Vacation",
      end_at: new Date("2022-05-25").toISOString(),
      start_at: "2022-09-10",
      duration_used: "7",
      duration_accrued: "",
      Balance: "1",
    },
    {
      reviewed_by: "",
      reviewed_at: "",
      status: "Pending",
      created_at: new Date().toISOString(),
      id: 5,
      name: "Personal Day",
      end_at: new Date("2022-05-25").toISOString(),
      start_at: "2022-12-25",
      duration_used: "3",
      duration_accrued: "",
      Balance: "6",
    },
    {
      reviewed_by: "Rayen Mabrouk",
      reviewed_at: new Date().toISOString(),
      status: "Approved",
      created_at: new Date().toISOString(),
      id: 5,
      name: "Personal Day",
      end_at: new Date("2022-05-25").toISOString(),
      start_at: "2023-03-10",
      duration_used: "1",
      duration_accrued: "",
      Balance: "5",
    },
    {
      reviewed_by: "Rayen Mabrouk",
      reviewed_at: new Date().toISOString(),
      status: "Approved",
      created_at: new Date().toISOString(),
      id: 6,
      name: "Summer Vacation",
      end_at: new Date("2022-05-25").toISOString(),
      start_at: "2023-07-01",
      duration_used: "10",
      duration_accrued: "",
      Balance: "-5",
    },
    {
      reviewed_by: "Rayen Mabrouk",
      reviewed_at: new Date().toISOString(),
      status: "Canceled",
      created_at: new Date().toISOString(),
      id: 7,
      name: "Study Leave",
      end_at: new Date("2022-05-25").toISOString(),
      start_at: "2023-09-15",
      duration_used: "5",
      duration_accrued: "",
      Balance: "-10",
    },
    {
      reviewed_by: "",
      reviewed_at: "",
      status: "Pending",
      created_at: new Date().toISOString(),
      id: 8,
      name: "National Holiday",
      end_at: new Date("2022-05-25").toISOString(),
      start_at: "2023-11-20",
      duration_used: "0",
      duration_accrued: "",
      Balance: "-10",
    },
    {
      reviewed_by: "",
      reviewed_at: "",
      status: "Pending",
      created_at: new Date().toISOString(),
      id: 9,
      name: "Winter Break",
      end_at: new Date("2022-05-25").toISOString(),
      start_at: "2024-02-05",
      duration_used: "8",
      duration_accrued: "",
      Balance: "-18",
    },
    {
      reviewed_by: "",
      reviewed_at: "",
      status: "Pending",
      created_at: new Date().toISOString(),
      name: "Vacation Trip",
      id: 10,
      end_at: new Date("2022-05-25").toISOString(),
      start_at: "2024-06-30",
      duration_used: "12",
      duration_accrued: "",
      Balance: "-30",
    },
  ];
  return (
    <section className="mt-8 flex flex-col justify-center gap-1">
      <div className="mb-2 flex flex-row items-center gap-2">
        <FaHistory className="h-5 w-5" />
        <h1 className="font-bold">History</h1>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4 py-2">
          <FilterSelect
            initialValue={1}
            setValueInParent={setType}
            options={[
              { label: "All", value: "" },
              ...data
                ?.map((e) => e.name)
                .filter((value, index, array) => array.indexOf(value) === index)
                .map((name) => ({
                  label: name,
                  value: name,
                })),
            ]}
          />
          <FilterSelect
            setValueInParent={setYear}
            options={[
              { label: "All", value: "" },
              ...data
                ?.map((e) => new Date(e.start_at).getFullYear().toString())
                .filter((value, index, array) => array.indexOf(value) === index)
                .map((date) => ({
                  label: date,
                  value: date,
                })),
            ]}
          />
        </div>
        <FilterSelect
          setValueInParent={(newVal) =>
            setToggleView ? setToggleView((old) => !old) : null
          }
          options={[
            { label: "Earned/Used", value: "Earned/Used" },
            {
              label: "Requests",
              value: "Requests",
            },
          ]}
        />
      </div>
      {toggleView ? (
        <HistoryTable
          layout="grid-cols-[20%_20%_20%_auto_8%]"
          Headers={["Date", "Description", "Submitted", "Status", "(-)"]}
          data={data
            ?.filter((e) =>
              year
                ? year == new Date(e.start_at).getFullYear().toString()
                : true,
            )
            .filter((e) => (type ? type == e.name : true))
            .map((e) => ({
              Date:
                formatDDMMYYYY(new Date(e.start_at)) +
                " - " +
                formatDDMMYYYY(new Date(e.end_at)),
              Discription: (
                <div className="flex flex-col">
                  <span>{e.name}</span>
                  <UnderlinedLink>See Comments (1)</UnderlinedLink>
                </div>
              ),
              Submitted: formatDDMMYYYY(new Date(e.created_at)),
              Status: (
                <div className="flex flex-row gap-1">
                  <UnderlinedLink>{e.status}</UnderlinedLink>
                  {e.reviewed_at && (
                    <span>
                      ({e.reviewed_by} {formatDDMMYYYY(new Date(e.reviewed_at))}
                      )
                    </span>
                  )}
                </div>
              ),
              "(-)": e.duration_used && e.duration_used + " hours",
            }))}
        />
      ) : (
        <HistoryTable
          layout="grid-cols-[12%_auto_12%_12%_12%_8%]"
          Headers={[
            "Date",
            "Description",
            "Used (-)",
            "Accrued (+)",
            "Balance",
            " ",
          ]}
          data={data
            ?.filter((e) =>
              year
                ? year == new Date(e.start_at).getFullYear().toString()
                : true,
            )
            .filter((e) => (type ? type == e.name : true))
            .map((e) => ({
              Date: formatDDMMYYYY(new Date(e.start_at)),
              Description: (
                <>
                  <span>{e.name}</span>
                  {e.description && (
                    <>
                      <span> - </span>
                      <span className="text-sm leading-6 text-gray-21">
                        {e.description}
                      </span>
                    </>
                  )}
                </>
              ),
              "Used (-)": e.duration_used && e.duration_used + " hours",
              "Accrued (+)":
                e.duration_accrued && e.duration_accrued + " hours",
              Balance: e.Balance,
              " ": new Date(e.start_at) > new Date() && (
                <DeleteEditBtns key={e.id + "edit/del"} />
              ),
            }))}
        />
      )}
    </section>
  );
}
