"use client";
import React, { useContext } from "react";
import StepContext, { StepContextContextType } from "../context/StepContext";
import { RiMapPinTimeFill } from "react-icons/ri";
import FormDataContext, {
  FormDataContextContextType,
} from "../context/formDataContext";
import { useSearchParams } from "next/navigation";
import { useCategorieTimeUnit } from "../hooks/useCategorieTimeUnit";
import { FomDataType } from "../types/types";
import { formatFormData } from "../helpers/formatFormData";
export function Setp3() {
  const { step } = useContext<StepContextContextType>(StepContext);
  const { formData } = useContext<FormDataContextContextType>(FormDataContext);
  const categories_id = useSearchParams().get("categories_id");
  const track_time_unit = useCategorieTimeUnit({
    categories_id: Number(categories_id),
  });
  const policy_settings: FomDataType | null = formData
    ? formatFormData({ formData, type: "label" })
    : null;
  return (
    <div
      className={`mt-10 flex flex-col gap-4 pb-40 ${step === 3 ? "flex" : "hidden"}`}
    >
      <p className="text-2xl">
        All set? Let’s make sure everything looks right.
      </p>
      <p className="text-gray-34">
        We love surprises, but not when it comes to time off.
      </p>
      <main className="flex flex-col gap-0.5 [&>div]:px-12">
        <header className="mb-4 flex flex-row items-center gap-2">
          <RiMapPinTimeFill className="h-10 w-10 rounded-lg bg-fabric-700 px-2 py-2 text-white" />
          <p className="text-lg text-fabric-700">{`${
            policy_settings?.waiting_time
              ? `Starting ${policy_settings?.waiting_period} ${policy_settings?.waiting_unit} after hire date`
              : `Starting on hire date`
          }`}</p>
        </header>
        <div className="flex flex-row gap-1">
          <div>{`Employees accrue 
      ${policy_settings?.accure_value} ${track_time_unit}
       of time off `}</div>
          <strong>
            {policy_settings?.accure_refresh.replaceAll("_", " ")}
          </strong>
          <div>{`${
            policy_settings?.accure_refresh_start_weekday
              ? `on ${policy_settings?.accure_refresh_start_weekday}.`
              : policy_settings?.accure_refresh_start_month &&
                  policy_settings?.accure_refresh_start_month?.length > 0
                ? `on ${policy_settings?.accure_refresh_start_day?.reduce((acc, e: string, i, arr) => acc + `${e} of ${policy_settings?.accure_refresh_start_month?.[i]} ${i !== arr.length - 1 ? (arr.length === 2 || i === arr.length - 2 ? " and " : " ,") : "."}`, "")}`
                : `on ${policy_settings?.accure_refresh_start_day?.reduce((acc, e: string, i, arr) => acc + `${e} ${i !== arr.length - 1 ? " and " : " ."}`, "")}`
          }`}</div>
        </div>
        {policy_settings?.accure_limit && (
          <div>{`They will stop accruing time after they hit a balance of ${policy_settings?.accure_limit_waiting_period} ${track_time_unit}.`}</div>
        )}
        {policy_settings?.carryover_limit ? (
          <div>{`${
            policy_settings?.carryover_limit_type === "limited"
              ? `They can carry over up to ${policy_settings?.carryover_limit_value} ${track_time_unit} of time off${
                  policy_settings?.carryover_validity
                    ? ` ,wich will expire in ${policy_settings?.carryover_validity_count} ${policy_settings?.carryover_validity_unit} of ${
                        policy_settings?.carryover_date === "1st_january"
                          ? `January 1st.`
                          : policy_settings?.carryover_date === "hire_date"
                            ? `their hire anniversary.`
                            : policy_settings?.carryover_date === "other"
                              ? `the next ${policy_settings?.carryover_date_day} of ${policy_settings?.carryover_date_month}.`
                              : ""
                      }`
                    : `.`
                }`
              : `There is no limit to the number of hours they can carry over${
                  policy_settings?.carryover_validity
                    ? ` ,wich will expire in ${policy_settings?.carryover_validity_count} ${policy_settings?.carryover_validity_unit} of ${
                        policy_settings?.carryover_date === "1st_january"
                          ? `January 1st.`
                          : policy_settings?.carryover_date === "hire_date"
                            ? `their hire anniversary.`
                            : policy_settings?.carryover_date === "other"
                              ? `the next ${policy_settings?.carryover_date_day} of ${policy_settings?.carryover_date_month}.`
                              : ""
                      }`
                    : `.`
                }`
          }`}</div>
        ) : (
          !policy_settings?.carryover_validity && (
            <div>
              {policy_settings?.carryover_date === "1st_january"
                ? `Unused time off will expire on January 1st of each year.`
                : policy_settings?.carryover_date === "hire_date"
                  ? `Unused time off will expire on the employee's hire anniversary.`
                  : `Unused time off will expire on the ${policy_settings?.carryover_date_day} of ${policy_settings?.carryover_date_month}.`}
            </div>
          )
        )}
      </main>
    </div>
  );
}
