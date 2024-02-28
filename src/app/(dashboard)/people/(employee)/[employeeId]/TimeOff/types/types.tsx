import { database_leave_request_duration_used_type } from "@/types/database.tables.types";
export type request_type = {
  id: number;
  policy_id: number;
  user_id: string;
  duration_used: database_leave_request_duration_used_type[];
};
