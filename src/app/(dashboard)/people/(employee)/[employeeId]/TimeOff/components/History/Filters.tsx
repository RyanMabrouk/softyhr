"use client";
import React, { useContext } from "react";
import historyTableFilters from "../../context/historyTableFilters";
import { historyTableFiltersContextType } from "../../context/historyTableFilters";
import { leave_data_types } from "./History";
import { capitalizeFirstLetter } from "@/helpers/string.helpers";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import useTranslation from "@/translation/useTranslation";
import { database_leave_request_status_type } from "@/types/database.tables.types";
interface FiltersProps {
  data: leave_data_types;
}
export function Filters({ data }: FiltersProps) {
  const { setType, setYear, setStatus, setToggleView, toggleView } =
    useContext<historyTableFiltersContextType>(historyTableFilters);
  const { lang } = useTranslation();
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-4 py-2">
        <SelectGeneric
          inputLabel={lang?.["Time Off"].Category}
          setValueInParent={setType}
          className=" !w-[17.5rem]"
          options={[
            { label: lang?.["Time Off"].All, value: "" },
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
          inputLabel={lang?.["Time Off"].Year}
          setValueInParent={setYear}
          className=" !w-[8.5rem]"
          options={[
            { label: lang?.["Time Off"].All, value: "" },
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
            inputLabel={lang?.["Time Off"].Status}
            setValueInParent={setStatus}
            options={[
              { label: lang?.["Time Off"].All, value: "" },
              ...(data
                ?.map((e) => e.status)
                .filter(
                  (value, index, array) =>
                    array.indexOf(value) === index && value !== "",
                )
                .map((status) => ({
                  label: capitalizeFirstLetter(
                    lang?.["Time Off"][
                      status as database_leave_request_status_type
                    ] ?? "",
                  ),
                  value: status,
                })) || []),
            ]}
          />
        )}
      </div>
      <SelectGeneric
        setValueInParent={() =>
          setToggleView ? setToggleView((old) => !old) : null
        }
        defaultValue={{
          label: lang?.["Time Off"]["Blance History"],
          value: lang?.["Time Off"]["Blance History"] ?? "",
        }}
        options={[
          {
            label: lang?.["Time Off"]["Blance History"],
            value: lang?.["Time Off"]["Blance History"] ?? "",
          },
          {
            label: lang?.["Time Off"].Requests,
            value: lang?.["Time Off"].Requests ?? "",
          },
        ]}
      />
    </div>
  );
}
