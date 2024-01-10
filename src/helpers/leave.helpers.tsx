import icons from "@/app/(dashboard)/people/[employeeId]/TimeOff/_ui/icons";
import {
  databese_leave_categories_track_time_unit_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import { formatYYYYMMDD, sameDay } from "./date.helpers";
// generate Leave Categorie Icon
export function generateLeaveCategorieIcon({
  categorie,
  className,
}: {
  categorie: databese_leave_categories_type;
  className: string;
}) {
  const icons_classname = className + " " + "text-fabric-700";
  const icon =
    categorie && icons[categorie.icon]
      ? icons[categorie.icon](icons_classname)
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
    return total_hours + " " + time_unit;
  }
  const total_time =
    time_unit === "days" ? (total_hours / 24).toFixed(2) : total_hours;
  return remove_time_unit ? `${total_time}` : `${total_time} ${time_unit}`;
}
// array Of Working Days
export function arrayOfWorkingDays(startDate: Date, endDate: Date) {
  const dates = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate || sameDay(currentDate, endDate)) {
    const day = currentDate.getDay();
    if (day !== 0 && day !== 6) {
      dates.push({
        date: formatYYYYMMDD(currentDate),
        duration: 8,
      });
    } else {
      dates.push({
        date: formatYYYYMMDD(currentDate),
        duration: 0,
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}
