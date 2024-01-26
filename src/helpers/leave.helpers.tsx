import icons from "@/constants/icons";
import {
  databese_leave_categories_track_time_unit_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import { formatYYYYMMDD, sameDay } from "./date.helpers";
import useData from "@/hooks/useData";
import { useSettings } from "@/hooks/useSettings";
// generate Leave Categorie Icon
export function generateLeaveCategorieIcon({
  categorie,
  className,
  iconName,
}: {
  categorie?: databese_leave_categories_type | undefined;
  className: string;
  iconName?: string;
}) {
  const icons_classname = className + " " + "text-fabric-700";
  const icon =
    categorie && icons[categorie.icon]
      ? icons[categorie.icon](icons_classname)
      : iconName && icons[iconName]
        ? icons[iconName](icons_classname)
        : icons.default(icons_classname);
  return icon;
}
// format Total Hours To Time Unit
export function formatTotalHoursToTimeUnit(
  total_hours: number,
  time_unit: databese_leave_categories_track_time_unit_type | string,
  { remove_time_unit }: { remove_time_unit?: boolean } = {
    remove_time_unit: false,
  },
) {
  if (total_hours === 0) {
    return remove_time_unit ? 0 : `0 ${time_unit}`;
  }
  const total_time =
    time_unit === "days" ? (total_hours / 24).toFixed(2) : total_hours;
  return remove_time_unit ? `${total_time}` : `${total_time} ${time_unit}`;
}
// array Of Working Days
export function useArrayOfWorkingDays(
  startDate: Date | "",
  endDate: Date | "",
) {
  const { data: settings } = useSettings("default_hours_per_day");
  if (!startDate || !endDate) return [];
  const dates = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate || sameDay(currentDate, endDate)) {
    const day = currentDate.getDay();
    if (day !== 0 && day !== 6) {
      dates.push({
        date: formatYYYYMMDD(currentDate),
        duration: settings?.[day],
      });
    } else {
      dates.push({
        date: formatYYYYMMDD(currentDate),
        duration: settings?.[day],
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}
