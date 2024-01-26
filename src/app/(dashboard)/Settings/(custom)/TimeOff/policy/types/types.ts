export type FomDataType = {
  // Step 1
  categories_id: string;
  policy_name: string;
  // Step 2
  accure_value: string;
  accure_refresh:
    | "daily"
    | "twice_a_month"
    | "yearly"
    | "monthly"
    | "weekly"
    | "quarterly"
    | "twice_a_year";
  accure_refresh_start_weekday: string | undefined;
  accure_refresh_start_day: string[] | undefined;
  accure_refresh_start_month: string[] | undefined;
  //------------------
  accure_limit: "yes" | "";
  accure_limit_waiting_period: string;
  //------------------
  carryover_date: "1st_january" | "hire_date" | "other";
  carryover_date_day: string;
  carryover_date_month: string;
  //------------------
  carryover_limit: "" | "yes";
  carryover_limit_type: "limited" | "unlimited";
  carryover_limit_value: string;
  //------------------
  carryover_validity: "" | "yes";
  carryover_validity_count: string;
  carryover_validity_unit: "days" | "weeks" | "months" | "years";
  //------------------
  waiting_time: "" | "yes";
  waiting_period: string;
  waiting_unit: "days" | "weeks" | "months" | "years";
  //------------------
  first_accural_date: "prorated" | "full_amount";
  accured_time_start: "start" | "end";
} | null;
