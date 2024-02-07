"use client";
import useLeaveData from "@/hooks/TimeOff/useLeaveData";
import {
  database_leave_policies_type,
  database_profile_leave_balance_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
type PolicyWithEmployees = database_leave_policies_type & {
  employees: database_profile_leave_balance_type[];
};
type categories_data_type = databese_leave_categories_type & {
  icon: React.ReactNode;
  policies: PolicyWithEmployees[];
  employees: database_profile_leave_balance_type[];
};
export default function useCategoriesData() {
  const {
    leave_categories: { data: leave_categories },
    leave_policies: { data: leave_policies },
    all_users_leave_balance: { data: all_users_leave_balance },
  } = useLeaveData();
  const categories_data: categories_data_type[] = leave_categories?.map(
    (category: databese_leave_categories_type) => {
      const policies_ids = leave_policies
        .filter(
          (p: database_leave_policies_type) => p.categories_id == category.id,
        )
        .map((p: database_leave_policies_type) => p.id);
      return {
        ...category,
        policies: leave_policies
          ?.filter(
            (policy: database_leave_policies_type) =>
              policy.categories_id === category.id,
          )
          .map((policy: database_leave_policies_type) => ({
            ...policy,
            employees: all_users_leave_balance?.filter(
              (b: database_profile_leave_balance_type) =>
                b.policy_id === policy.id,
            ),
          })),
        employees: all_users_leave_balance?.filter(
          (b: database_profile_leave_balance_type) =>
            policies_ids.includes(b.policy_id),
        ),
      };
    },
  );
  return categories_data;
}
