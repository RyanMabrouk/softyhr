"use client";
import {
  database_leave_policies_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import useData from "./useData";
import useLeaveData from "./useLeaveData";
export default function usePolicy({ policy_id }: { policy_id: number }): {
  policy: database_leave_policies_type | undefined;
  category: databese_leave_categories_type | undefined;
} {
  const {
    leave_policies: { data: leave_policies },
    leave_categories: { data: leave_categories },
  } = useLeaveData();
  const policy = leave_policies?.find(
    (p: database_leave_policies_type) => p.id === Number(policy_id),
  );
  const category = leave_categories?.find(
    (c: databese_leave_categories_type) => c.id === policy?.categories_id,
  );
  return { policy, category };
}
