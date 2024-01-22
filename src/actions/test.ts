"use server";

export const test = (formdata: FormData) => {
  formdata.forEach(function (value: FormDataEntryValue, key: string) {
    console.log(typeof formdata.get(key))
  });
  console.log(formdata);
};
