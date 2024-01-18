"use server";

export const test = (formdata: FormData) => {
  console.log(formdata);
  const job = formdata.getAll("Job Description");
  console.log(job);
};
