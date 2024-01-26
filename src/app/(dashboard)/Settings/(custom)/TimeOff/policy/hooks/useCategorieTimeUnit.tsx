"use client";
import useLeaveData from "@/hooks/useLeaveData";
import {
  databese_leave_categories_track_time_unit_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";

export function useCategorieTimeUnit({
  categories_id,
}: {
  categories_id: number;
}) {
  const {
    leave_categories: { data: leaveCategories },
  } = useLeaveData();
  const track_time_unit: databese_leave_categories_track_time_unit_type =
    leaveCategories?.find(
      (c: databese_leave_categories_type) => c.id === Number(categories_id),
    )?.track_time_unit;
  return track_time_unit;
}
