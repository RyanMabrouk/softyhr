import submitForm from "@/api/test";
import { v4 as uuidv4 } from "uuid";

export default function formulateData(formdata: FormData, user: any) {
  let NewEducation: Object[] = [];
  submitForm(formdata);
  formdata.getAll("GPA").map((element, index) => {
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
  Object.keys(data)?.map((object) => {
    if (typeof data[object] == "object") {
      Object.keys(data[object])?.map((key) => {
        if (formdata.get(key) || formdata.get(key) == "") {
          console.log(key, formdata.get(key));
          data[object][key] = String(formdata.get(key));
        }
      });
    }
    data["Education"] = NewEducation;
  });
  console.log(data);
  return { ...user?.data, ...data };
}
