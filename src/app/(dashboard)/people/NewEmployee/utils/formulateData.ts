import { database_profile_type } from "@/types/database.tables.types";

interface userType {
  data: database_profile_type | any;
}

export default function formulateDataNewemployee(formdata: FormData, user: userType) {
  console.log("enter formulateDataNewemployee with", formdata, user);
  const data = user?.data;
  console.log("enter formulateDataNewemployee with", formdata, user);
  Object?.keys(data)?.map((object: string) => {
    console.log(object);
    if (typeof data?.[object] == "object" && data?.[object]) {
      console.log(object);
      Object?.keys(data?.[object])?.map((key) => {
        if (formdata.get(key) || formdata.get(key) == "") {
          data[object][key] = String(formdata.get(key));
        }
      });
    }
  });
  data["Job Information"] = [data["Job Information"]];
  data["Compensation"] = [data["Compensation"]];
  return { ...user?.data, ...data };
}
