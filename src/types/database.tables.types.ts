import { Database, Tables, TablesInsert } from "./database.types";

// Tables names
export type table_type = keyof Database[Extract<
  keyof Database,
  "public"
>]["Tables"];
// Notifications
export type database_notifications_type = Tables<"notifications">;
// Permesssions
export type database_permissions_type = Tables<"users_permissions">;
// Roles
export type database_roles_type = Tables<"roles">;
// leave balance
export type database_profile_leave_balance_type = Tables<"leave_balance">;
// Leave Categories
export type databese_leave_categories_type = Tables<"leave_categories">;
export type databese_leave_categories_track_time_unit_type =
  Tables<"leave_categories">["track_time_unit"];
// Leave Requests
export type database_leave_requests_type = Omit<
  Tables<"leave_requests">,
  "duration_used"
> & {
  duration_used: database_leave_request_duration_used_type[];
};
export type database_leave_request_status_type =
  Tables<"leave_requests">["status"];
export type database_leave_request_duration_used_type = {
  date: string;
  duration: number;
};
// Leave Accrued
export type database_leave_accrued_type = Tables<"leave_accrued">;
// Leave Policies
export type database_leave_policies_policy_type =
  Tables<"leave_policies">["type"];
export type database_leave_policies_type = Tables<"leave_policies">;
// Profile Types
export type database_profile_type = Tables<"profiles">;
export type database_profile_type_insert = TablesInsert<"profiles">;
// files types
export type database_files_type = Tables<"files">;
export type database_folder_type = Tables<"folders">;
//---------organizations_types----------

export type organizations_type = Tables<"organizations">;

//-----------Depatment_types-------------

export type Department_type = Tables<"Department">;

//------------Hiring_types---------------

export type Hiring_type<T extends Profile_Type = Profile_Type> = {
  Application_Details: Application_Details_type | null;
  candidates?: [] | null;
  created_at?: string;
  Questions?: object;
  id?: number;
  "Job Status": string;
  job_information: {
    [key: string]: any;
  } | null;
  job_Boards: {
    [key: string]: string | Object[] | Object | null;
  } | null;
  org_name: string | null;
  profiles?: T;
  Department?: Department_type;
};
export type Application_Details_type = {
  Job_Category?: string;
  Additional_Questions?: object;
  Application_Questions?: object;
} | null;

//----------object_of_strings---------------
export interface ObjectOfStrings {
  [key: string]: string | null;
}

// ------settings_types-----------

export type Settings_type = {
  org_name?: string | null;
  personnal?: sectionType | null;
  Hiring?: sectionType | null;
  job?: sectionType | null;
};

export type Settings_type_insert =
  Database["public"]["Tables"]["settings"]["Insert"];

export type sectionType = {
  Champs: champ_type[];
};

export type champ_type = {
  Icon: string;
  rang: number;
  champ: string;
  Fields: RowType[] | string[] | null;
};

export interface RowFieldType {
  name: string;
  options?: string[] | Object[] | undefined;
  required?: boolean;
  placeHolder?: string | undefined;
  type: string;
  Icon?: string | undefined;
  addItem?: boolean | undefined;
  minWidth?: string | undefined;
  ExtraTxt?: string | undefined;
  accept?: string | undefined;
  allowFutureDates?: boolean | undefined;
  allowPreviousDates?: boolean | undefined;
  endDateName?: string | undefined;
  startDateName?: string | undefined;
  ExtraTxt_org?: string;
}
export type RowType = {
  Row: RowFieldType[];
  rang: number;
};
export type Profile_Type = {
  supervisor_id?: string;
  Addresse?: ObjectOfStrings | null;
  "Basic Information"?: ObjectOfStrings | null;
  Bonus?: Bonus_Type[] | null;
  Commission?: commission_Type[] | null;
  Compensation?: Compensation_Type[] | null;
  Contact?: ObjectOfStrings | null;
  "Driver License"?: Driver_license_Type[] | null;
  Education?: education_Type[] | null;
  "Employment Status"?: EmployeStatus_Type[] | null;
  Hiring?: ObjectOfStrings | null;
  Job?: ObjectOfStrings | null;
  "Job Information"?: job_information_Type[] | null;
  leave_balance?: leave_balance_Type[] | null;
  org_name: string;
  role: string;
  "Social Links"?: ObjectOfStrings | null;
  "Stock Options"?: StockOptions_Type[] | null;
  user_id: string;
  "Visa Information"?: Visa_information_Type[] | null;
  picture?: string | null;
};

export type Bonus_Type = {
  id: string;
  Date?: string;
  Amount?: number;
  Reason?: string;
  Comment?: string;
};

export type commission_Type = {
  id: string;
  Date?: string;
  Amount?: number;
  Comment?: string;
};

export type Compensation_Type = {
  id: string;
  Comment?: string;
  Overtime?: string;
  "Pay Rate"?: number;
  "Pay Type"?: string;
  "Pay Schedule"?: string;
  "Change Reason"?: string;
  "Effective Date"?: string;
};

export type job_information_Type = {
  id: string;
  Division?: string;
  Location?: string;
  "Job Title"?: string;
  Department?: string;
  "Reports To"?: string;
  "Effective Date"?: string;
};

export type EmployeStatus_Type = {
  id: string;
  Comment?: string;
  "Effective Date"?: string;
  "Employment Status"?: string;
};

export type leave_balance_Type = {
  id: string;
  Comment?: string;
  "Effective Date"?: string;
  "Employment Status"?: string;
};

export type StockOptions_Type = {
  id: string;
  Plan?: string;
  Comments?: string;
  "Grant Date"?: string;
  "Option Price"?: number;
  "Vesting Date"?: string;
  "# Options Granted"?: number;
};

export type Visa_information_Type = {
  id: string;
  Date?: string;
  Note?: string;
  Visa?: string;
  Issued?: string;
  Status?: string;
  Expiration?: string;
  "Issuing Country"?: string;
};

export type education_Type = {
  id: string;
  GPA?: string;
  Degree?: string;
  "End Date"?: string;
  "Start Date"?: string;
  "College/Institution"?: string;
  "Major/Specialization"?: string;
};

export type Driver_license_Type = {
  id: string;
  State?: string;
  "License #"?: string;
  Expiration?: string;
  Classification?: string;
  "DMV Violations"?: string;
};
