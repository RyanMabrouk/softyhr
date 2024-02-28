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
  custom_fields?: { [key: string]: { [key: string]: string | number }[] }[];
}) {
  if (!role_id) throw new Error("role_id is not defined");
  const { error } = await postData("profiles", [
    {
      user_id: user_id,
      org_name: company,
      supervisor_id: supervisor_id,
      accrual_start_date: new Date(),
      Hiring: {
        "Hire Date": new Date(),
      },
      "Basic Information": {
        ...custom_fields?.find((e) =>
          Object.keys(e).includes("Job Information"),
        ),
        "Last name": last_name,
        "First name": first_name,
      },
      Contact: {
        ...custom_fields?.find((e) => Object.keys(e).includes("Contact")),
        "Mobile Phone": tel,
        "Work Email": email,
      },
      "Job Information": [
        {
          Location: Location,
          Division: Division,
          Department: Department,
          "Job Title": job,
        },
      ],
      ...custom_fields?.filter(
        (e) =>
          !Object.keys(e).includes("Job Information") &&
          !Object.keys(e).includes("Contact") &&
          !Object.keys(e).includes("Basic Information"),
      ),
    },
  ]);
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
