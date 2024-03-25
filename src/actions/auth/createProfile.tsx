"use server";
import postData from "@/api/postData";
export async function createProfile({
  user_id,
  company,
  first_name,
  last_name,
  email,
  tel,
  job,
  supervisor_id = null,
  role_id,
  Division = "",
  Department = "",
  Location = "",
  custom_fields,
}: {
  user_id: string;
  company: string;
  first_name: string;
  last_name: string;
  email: string;
  tel: string;
  job: string;
  role_id: number | undefined;
  supervisor_id?: string | null;
  Division?: string;
  Department?: string;
  Location?: string;
  custom_fields?: {
    Job: { [key: string]: string | number };
    "Basic Information": { [key: string]: string | number };
    Contact: { [key: string]: string | number };
    "Job Information": { [key: string]: string | number }[];
    [key: string]:
      | { [key: string]: string | number }
      | { [key: string]: string | number }[]
      | string
      | number;
  };
}) {
  if (!role_id)
    return {
      error: {
        message: "Failed to get role data. Please try again later.",
        type: "Server Error",
      },
    };
  const payload = [
    {
      ...custom_fields,
      user_id: user_id,
      org_name: company,
      supervisor_id: supervisor_id,
      accrual_start_date: new Date(),
      Job: {
        ...custom_fields?.["Job"],
        "Hire Date":
          custom_fields?.["Job"]?.["Hire Date"] === ""
            ? new Date()
            : custom_fields?.["Job"]?.["Hire Date"],
      },
      "Basic Information": {
        ...custom_fields?.["Basic Information"],
        "Last name": last_name,
        "First name": first_name,
      },
      Contact: {
        ...custom_fields?.["Contact"],
        "Mobile Phone": tel,
        "Work Email": email,
      },
      "Job Information": [
        {
          ...custom_fields?.["Job Information"][0],
          Location: Location,
          Division: Division,
          Department: Department,
          "Job Title": job,
        },
      ],
    },
  ];
  const { error } = await postData("profiles", payload);
  if (error)
    return {
      error,
    };
  else {
    const { error: permissions_error } = await postData("users_permissions", {
      user_id: user_id,
      role_id: role_id,
      org_name: company,
      files_ids: [],
    });
    if (permissions_error) {
      return {
        error: permissions_error,
      };
    }
    return {
      error: null,
    };
  }
}
