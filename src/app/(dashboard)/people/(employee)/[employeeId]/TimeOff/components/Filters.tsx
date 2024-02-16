"use client";
import React, { useContext } from "react";
import historyTableFilters from "../context/historyTableFilters";
import { historyTableFiltersContextType } from "../context/historyTableFilters";
import { leave_data_types } from "./History";
import { capitalizeFirstLetter } from "@/helpers/string.helpers";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
interface FiltersProps {
  data: leave_data_types;
}
export function Filters({ data }: FiltersProps) {
  const { setType, setYear, setStatus, setToggleView, toggleView } =
    useContext<historyTableFiltersContextType>(historyTableFilters);
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-4 py-2">
        <SelectGeneric
          inputLabel="Category"
          setValueInParent={setType}
          options={[
            { label: "All", value: "" },
            ...(data
              ?.map((e: any) => e.name)
              .filter((value, index, array) => array.indexOf(value) === index)
              .map((name) => ({
                label: capitalizeFirstLetter(name),
                value: name,
              })) || []),
          ]}
        />
        <SelectGeneric
          inputLabel="Year"
          setValueInParent={setYear}
          options={[
            { label: "All", value: "" },
            ...(data
              ?.map((e: any) => new Date(e.start_at).getFullYear().toString())
              .filter((value, index, array) => array.indexOf(value) === index)
              .map((date) => ({
                label: capitalizeFirstLetter(date),
                value: date,
              })) || []),
          ]}
        />
        {toggleView && (
          <SelectGeneric
            inputLabel="Status"
            setValueInParent={setStatus}
            options={[
              { label: "All", value: "" },
              ...(data
                ?.map((e: any) => e.status)
                .filter(
                  (value, index, array) =>
                    array.indexOf(value) === index && value !== "",
                )
                .map((status) => ({
                  label: capitalizeFirstLetter(status),
                  value: status,
                })) || []),
            ]}
          />
        )}
      </div>
      <SelectGeneric
        //inputLabel="View"
        setValueInParent={() =>
          setToggleView ? setToggleView((old) => !old) : null
        }
        defaultValue={{ label: "Earned/Used", value: "Earned/Used" }}
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
