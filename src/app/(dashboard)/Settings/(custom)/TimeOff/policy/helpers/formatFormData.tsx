import {
  days_of_the_month,
  days_of_the_week,
  months,
} from "../constants/accural_options";
import { FomDataType } from "../types/types";

export function formatFormData({
  formData,
  type,
}: {
  formData: FormData;
  type: "label" | "value";
}): FomDataType {
  return {
    // Step 1 -----------------------------------------
    policy_name: formData?.get("policy_name") as string,
    categories_id: formData?.get("categories_id") as string,
    // Step 2 -----------------------------------------
    accure_value: formData?.get("accure_value") as string,
    accure_refresh: formData?.get("accure_refresh") as
      | "twice_a_month"
      | "yearly"
      | "monthly"
      | "weekly"
      | "quarterly"
      | "twice_a_year",
    accure_refresh_start_weekday:
      days_of_the_week.find(
        (e) =>
          e.value == (formData?.get("accure_refresh_start_weekday") as string),
      )?.[type] ?? "",
    accure_refresh_start_day: (
      formData?.getAll("accure_refresh_start_day") as string[]
    ).map((e) => days_of_the_month.find((d) => d.value == e)?.[type] ?? ""),
    accure_refresh_start_month: (
      formData?.getAll("accure_refresh_start_month") as string[]
    ).map((e) => months.find((m) => m.value == e)?.[type] ?? ""),
    //---------------------------------------------------------------
    waiting_time: formData?.get("waiting_time") as "" | "yes",
    waiting_period: formData?.get("waiting_period") as string,
    waiting_unit: formData?.get("waiting_unit") as "days" | "weeks" | "months",
    //-----------------------------------------------------------
    accure_limit: formData?.get("accure_limit") as "yes" | "",
    accure_limit_waiting_period: formData?.get(
      "accure_limit_waiting_period",
    ) as string,
    //-----------------------------------------------------------
    carryover_limit: formData?.get("carryover_limit") as "" | "yes",
    carryover_limit_type: formData?.get("carryover_limit_type") as
      | "limited"
      | "unlimited",
    carryover_limit_value: formData?.get("carryover_limit_value") as string,
    //-----------------------------------------------------------
    carryover_date: formData?.get("carryover_date") as
      | "1st_january"
      | "hire_date"
      | "other",
    carryover_date_day:
      days_of_the_month.find(
        (d) => d.value == (formData?.get("carryover_date_day") as string),
      )?.[type] ?? "",
    carryover_date_month:
      months.find(
        (m) => m.value == (formData?.get("carryover_date_month") as string),
      )?.[type] ?? "",
    //-----------------------------------------------------------
    carryover_validity: formData?.get("carryover_validity") as "" | "yes",
    carryover_validity_count: formData?.get(
      "carryover_validity_count",
    ) as string,
    carryover_validity_unit: formData?.get("carryover_validity_unit") as
      | "days"
      | "weeks"
      | "months"
      | "years",
    //-----------------------------------------------------------
    accured_time_start: formData?.get("accured_time_start") as "start" | "end",
    first_accural_date: formData?.get("first_accural_date") as
      | "prorated"
      | "full_amount",
  };
}
