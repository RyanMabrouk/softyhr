"use client";
import React, { useContext } from "react";
import { FilterSelect } from "./_ui/FilterSelect";
import historyTableFilters from "./_context/historyTableFilters";
import { historyTableFiltersContextType } from "./_context/historyTableFilters";
import { leave_data_types } from "./History";
interface FiltersProps {
  data: leave_data_types;
}
export function Filters({ data }: FiltersProps) {
  const { setType, setYear, setToggleView } =
    useContext<historyTableFiltersContextType>(historyTableFilters);
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-4 py-2">
        <FilterSelect
          //initialValue={1}
          setValueInParent={setType}
          options={[
            { label: "All", value: "" },
            ...(data
              ?.map((e: any) => e.name)
              .filter((value, index, array) => array.indexOf(value) === index)
              .map((name) => ({
                label: name,
                value: name,
              })) || []),
          ]}
        />
        <FilterSelect
          setValueInParent={setYear}
          options={[
            { label: "All", value: "" },
            ...(data
              ?.map((e: any) => new Date(e.start_at).getFullYear().toString())
              .filter((value, index, array) => array.indexOf(value) === index)
              .map((date) => ({
                label: date,
                value: date,
              })) || []),
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
  );
}
