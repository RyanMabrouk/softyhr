import { Database } from "./database.types";

// Leave Categories
export type databese_leave_categories_type =
  Database["public"]["Tables"]["leave_categories"]["Row"];
export type databese_leave_categories_track_time_unit_type = "days" | "hours";
// Leave Requests
export type database_leave_requests_type =
  Database["public"]["Tables"]["leave_requests"]["Row"];
export type database_leave_requests_insert_type =
  Database["public"]["Tables"]["leave_requests"]["Insert"];
export type database_leave_request_status_type =
  | "pending"
  | "approved"
  | "rejected"
  | "canceled";
export type database_profile_leave_balance_type = {
  categories_id: number | string;
  policy_id: number | string;
  balance: number;
}[];
export type database_leave_request_duration_used_type = {
  date: string;
  duration: number | string;
};
// Leave Accrued
export type database_leave_accrued_type =
  Database["public"]["Tables"]["leave_accrued"]["Row"];
export type database_leave_accrued_insert_type =
  Database["public"]["Tables"]["leave_accrued"]["Insert"];
// Leave Policies
export type database_leave_policies_type =
  Database["public"]["Tables"]["leave_policies"]["Row"];
// Profile Types
export type database_profile_type =
  Database["public"]["Tables"]["profiles"]["Row"];
