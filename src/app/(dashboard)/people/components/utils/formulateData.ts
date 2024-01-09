import { v4 as uuidv4 } from "uuid";

export default function formulateData(formdata: FormData, user: any) {
  let NewEducation: Object[] = [];
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
    console.log(typeof data[object]);
    if (typeof data[object] == "object") {
      Object.keys(data[object])?.map((key) => {
        console.log(formdata.get("Birth Date"));
        if (formdata.get(key)) {
          console.log(key);
          data[object][key] = String(formdata.get(key));
        }
      });
    }
    data["Education"] = NewEducation;
  });
  return { ...user?.data, ...data };
}
