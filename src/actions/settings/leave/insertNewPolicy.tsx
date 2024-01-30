"use server";
import getCurrentorg from "@/api/getCurrentOrg";
import postData from "@/api/postData";
import { formatFormData } from "@/app/(dashboard)/Settings/(custom)/TimeOff/policy/helpers/formatFormData";
import {
  database_leave_policies_policy_type,
  databese_leave_categories_track_time_unit_type,
} from "@/types/database.tables.types";
export default async function insertNewPolicy({
  formData,
  type,
  track_time_unit,
}: {
  formData: FormData;
  type: database_leave_policies_policy_type;
  track_time_unit: databese_leave_categories_track_time_unit_type;
}) {
  console.log("🚀 ~ insertNewPolicy ");
  const org = await getCurrentorg();
  const policy_settings = formatFormData({
    formData: formData,
    type: "value",
  });
  // accural value in hours default is 8 hours per day
  let accure_value = 0;
  let accrual_days = null;
  switch (type) {
    case "traditional":
      accure_value =
        track_time_unit === "days"
          ? Number(policy_settings.accure_value) * 8
          : Number(policy_settings.accure_value);
      const accure_refresh = policy_settings.accure_refresh;
      // accural days of the next year
      switch (accure_refresh) {
        case "daily":
          accrual_days = [];
          break;
        case "monthly":
          accrual_days = arrayOfSameDayInEveryMonth(
            Number(policy_settings.accure_refresh_start_day),
          );
          break;
        case "quarterly":
          accrual_days = generateArrayOfDay(
            policy_settings.accure_refresh_start_day ?? [],
            policy_settings.accure_refresh_start_month ?? [],
          );
          break;
        case "twice_a_year":
          accrual_days = generateArrayOfDay(
            policy_settings.accure_refresh_start_day ?? [],
            policy_settings.accure_refresh_start_month ?? [],
          );
          break;
        case "twice_a_month":
          accrual_days = arrayOfSameTwoDaysInEveryMonth(
            Number(policy_settings.accure_refresh_start_day?.[0]),
            Number(policy_settings.accure_refresh_start_day?.[1]),
          );
          break;
        case "weekly":
          accrual_days = arrayOfSameWeekDayInEveryMonth(
            policy_settings.accure_refresh_start_weekday ?? "",
          );
          break;
        case "yearly":
          accrual_days = [
            new Date(
              new Date().getFullYear(),
              Number(policy_settings.accure_refresh_start_month?.[0]),
              Number(policy_settings.accure_refresh_start_day?.[0]),
            ),
          ];
          break;
        default:
          accrual_days = [];
          break;
      }
      break;
    case "manual":
      accure_value = 0;
      accrual_days = [];
      break;
    default:
      accure_value = 0;
      break;
  }

  const payload = {
    org_name: org?.name,
    categories_id: Number(formData.get("categories_id") as string),
    name: formData.get("policy_name") as string,
    type: type,
    accrual_days: accrual_days,
    accrual_value_in_hours: accure_value,
  };
  const { error } = await postData("leave_policies", payload);
  if (error) {
    return {
      error: {
        message: error.message,
        type: "Server Error",
      },
    };
  }
  return {
    error: null,
  };
}
function arrayOfSameDayInEveryMonth(start_day: number) {
  const days = [];
  for (let i = 0; i < 12; i++) {
    days.push(new Date(new Date().getFullYear(), i, start_day));
  }
  return days;
}
function arrayOfSameTwoDaysInEveryMonth(start_day: number, end_day: number) {
  const days = [];
  for (let i = 0; i < 12; i++) {
    days.push(new Date(new Date().getFullYear(), i, start_day));
    days.push(new Date(new Date().getFullYear(), i, end_day));
  }
  return days;
}
function arrayOfSameWeekDayInEveryMonth(weekday: string): Date[] {
  const days: Date[] = [];
  const currentYear = new Date().getFullYear();
  for (let month = 0; month < 12; month++) {
    const date = new Date(currentYear, month, 1);
    while (date.getMonth() === month) {
      const current_weekday = date.toLocaleString("en-US", { weekday: "long" });
      if (current_weekday === weekday) {
        days.push(new Date(date));
      }
      date.setDate(date.getDate() + 1);
    }
  }
  return days;
}
function generateArrayOfDay(days: string[], months: string[]): Date[] {
  return days.map(
    (day, i) =>
      new Date(new Date().getFullYear(), Number(months?.[i]), Number(day)),
  );
}
