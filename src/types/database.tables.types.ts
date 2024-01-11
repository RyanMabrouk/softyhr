import { profile } from "console";
import { Database } from "./database.types";

export type databese_leave_categories_type =
  Database["public"]["Tables"]["leave_categories"]["Row"];

export type database_leave_requests_type =
  Database["public"]["Tables"]["leave_requests"]["Row"];

export type database_leave_accrued_type =
  Database["public"]["Tables"]["leave_accrued"]["Row"];

export type database_leave_policies_type =
  Database["public"]["Tables"]["leave_policies"]["Row"];

export type database_profile_type =
  Database["public"]["Tables"]["profiles"]["Row"];

export type database_profile_type_insert =
  Database["public"]["Tables"]["profiles"]["Insert"];

//---------organizations_types----------

export type organizations_type =
  Database["public"]["Tables"]["organizations"]["Row"];

//------------Hiring_types---------------

export type Hiring_type = Database["public"]["Tables"]["Hiring"]["Row"];

export type Application_Details_type = {
  Job_Category?: string;
  Additional_Questions?: string;
  Application_Questions?: [];
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
  options: Object[] | undefined;
  required: boolean;
  placeHolder: string | undefined;
  type: "select" | "text" | "radio";
  Icon?: string | undefined;
}
export type RowType = {
  Row: RowFieldType[];
  rang: number;
};
export type Profile_Type = {
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