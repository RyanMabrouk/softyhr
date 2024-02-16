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
        Age: "",
        NIN: "",
        SIN: "",
        SSN: "XXX-XX-XXXX",
        Gender: "",
        Status: "Active",
        Employee: "",
        Allergies: "Peanuts",
        "Last name": last_name,
        "Birth Date": "",
        Birthplace: "",
        "First name": first_name,
        "Shirt Size": "",
        "Shirt size": "",
        Citizenship: "",
        "Jacket Size": "",
        "Middle name": " ",
        "National ID": "",
        Nationality: "",
        "T-Shirt Size": "",
        "Marital Status": "",
        "Preferred name": "",
        "Tax File Number": "",
        "Secondary Language": "",
        "Dietary Restrictions": "",
      },
      Contact: {
        "Work Phone": "",
        Ext: "",
        "Mobile Phone": tel,
        "Home Phone": "",
        "Work Email": email,
        "Home Email": "",
      },
      "Job Information": [
        {
          Location: "",
          Division: "",
          Department: "",
          "Job Title": job,
        },
      ],
    },
  ]);
  if (error)
    return {
      error,
    };
  else {
    const { error: permissions_error } = await postData("permissions", {
      user_id: user_id,
      role_id: role_id,
      org_name: company,
      files_ids: [],
    });
    return {
      error: permissions_error,
    };
  }
}
