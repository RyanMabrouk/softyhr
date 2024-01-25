"use client";
import React, { useContext, useState } from "react";
import { InputGeneric } from "@/app/_ui/InputGeneric";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import { accural_refresh_options } from "../constants/accural_options";
import ErrorContext, { ErrorContextContextType } from "../context/errorContext";
import { useSearchParams } from "next/navigation";
import { useCategorieTimeUnit } from "../hooks/useCategorieTimeUnit";
import { FaCalculator } from "react-icons/fa6";
export function AccuralFrequencyInputs() {
  const default_option = accural_refresh_options[3];
  const [accuralOptions, setAccuralOptions] = useState(default_option.value);
  const [accureValue, setAccureValue] = useState("0");
  const { error } = useContext<ErrorContextContextType>(ErrorContext);
  const categories_id = useSearchParams().get("categories_id");
  const track_time_unit = useCategorieTimeUnit({
    categories_id: Number(categories_id),
  });
  switch (accuralOptions) {
    case "daily":
      var accurances_per_year = 365 * Number(accureValue);
      break;
    case "yearly":
      var accurances_per_year = 1 * Number(accureValue);
      break;
    case "monthly":
      var accurances_per_year = 12 * Number(accureValue);
      break;
    case "weekly":
      var accurances_per_year = 52 * Number(accureValue);
      break;
    case "quarterly":
      var accurances_per_year = 4 * Number(accureValue);
      break;
    case "twice_a_year":
      var accurances_per_year = 2 * Number(accureValue);
      break;
    case "twice_a_month":
      var accurances_per_year = 24 * Number(accureValue);
      break;
    default:
      var accurances_per_year = 0;
      break;
  }
  return (
    <div className="flex flex-row items-start gap-2 text-[0.95rem] text-gray-25 [&>span]:pt-1">
      <span>Employees accrue</span>
      <InputGeneric
        error={error?.accure_value?.[0]}
        setValueInParent={setAccureValue}
        type="number"
        name="accure_value"
        className="!max-w-16"
      />
      <span>{track_time_unit}</span>
      <SelectGeneric
        className="!max-w-[10rem]"
        name="accure_refresh"
        defaultValue={default_option}
        setValueInParent={setAccuralOptions}
        options={accural_refresh_options}
        required
      />
      {accuralOptions &&
        accural_refresh_options.find((e) => e.value === accuralOptions)?.extra}
      <div className="ml-3 flex flex-row items-center gap-1 pt-1.5">
        <FaCalculator className="h-4 w-4" />
        {accurances_per_year && (
          <span className="">
            This comes out to {accurances_per_year.toFixed(2)} {track_time_unit}{" "}
            per year
          </span>
        )}
      </div>
    </div>
  );
}
