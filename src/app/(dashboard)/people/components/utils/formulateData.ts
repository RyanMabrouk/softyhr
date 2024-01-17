import { database_profile_type } from "@/types/database.tables.types";
import { v4 as uuidv4 } from "uuid";

interface userType {
  data: database_profile_type | any;
}

export default function formulateData(formdata: FormData, user: userType) {
  console.log(user);
  let NewEducation: Object[] = [];
  formdata.getAll("GPA").map((element, index: number) => {
    if (
      formdata.getAll("GPA")[index] != "" ||
      formdata.getAll("Degree")[index] != "" ||
      formdata.getAll("End Date")[index] != "" ||
      formdata.getAll("Start Date")[index] != "" ||
      formdata.getAll("College/Institution")[index] != "" ||
      formdata.getAll("Major/Specialization")[index] != ""
    )
      NewEducation.push({
        id: uuidv4(),
        GPA: formdata.getAll("GPA")[index],
        Degree: formdata.getAll("Degree")[index],
        "End Date": formdata.getAll("End Date")[index],
        "Start Date": formdata.getAll("Start Date")[index],
        "College/Institution": formdata.getAll("College/Institution")[index],
        "Major/Specialization": formdata.getAll("Major/Specialization")[index],
      });
  });

  const data = user?.data;
  console.log(data);
  Object?.keys(data)?.map((object: string) => {
    if (typeof data?.[object] == "object" && data?.[object]) {
      Object?.keys(data?.[object])?.map((key) => {
        if (formdata.get(key) || formdata.get(key) == "") {
          data[object][key] = String(formdata.get(key));
        }
      });
    }
    data["Education"] = NewEducation;
  });
  return { ...user?.data, ...data };
}
