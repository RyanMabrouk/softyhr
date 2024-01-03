export default function formulateData(formdata: FormData, user: any) {
  console.log(formdata, user?.data[0]);
  const data = user?.data[0];
  Object.keys(data)?.map((object) => {
    console.log(typeof data[object]);
    if (typeof data[object] == "object") {
      Object.keys(data[object])?.map((key) => {
        console.log(formdata.get('Birth Date'));
        if (formdata.get(key)) {
          console.log(key);
          data[object][key] = String(formdata.get(key));
        }
      });
    }
  });
  return { ...user?.data[0], ...data };
}
