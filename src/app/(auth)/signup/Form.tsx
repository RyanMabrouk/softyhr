"use client";
import React, { useState } from "react";
import countries from "./countries.json";
import { SubmitBtn } from "./ui/SubmitBtn";
import signup from "@/actions/auth/signup";
import { Input } from "./Input";
import { z } from "zod";
import PrivacyPolicy from "./PrivacyPolicy";
import { PasswordInput } from "./PasswordInput";
import { TermsAndConditions } from "./TermsAndConditions";
import useToast from "@/hooks/useToast";
const invalid_type_error = "Invalid type provided for this field";
const required_error = "This field cannot be blank";
const schema = z.object({
  first_name: z
    .string({ invalid_type_error, required_error })
    .min(5, { message: "Must be 5 or more characters long" }),
  last_name: z
    .string({ invalid_type_error, required_error })
    .min(5, { message: "Must be 5 or more characters long" }),
  email: z
    .string({ invalid_type_error, required_error })
    .email({ message: "Invalid email address" }),
  job: z
    .string({ invalid_type_error, required_error })
    .min(2, { message: "Must be 2 or more characters long" }),
  company: z
    .string({ invalid_type_error, required_error })
    .min(2, { message: "Must be 2 or more characters long" })
    .regex(/^[a-zA-Z0-9\-]+$/, {
      message: "Invalid company name",
    }),
  tel: z
    .string({ invalid_type_error, required_error })
    .regex(/^\+?[1-9][0-9]{7,14}$/, {
      message: "Invalid phone number",
    }),
  employee_count: z
    .string({ invalid_type_error, required_error })
    .min(2, { message: "Choose an option" }),
  country: z
    .string({ invalid_type_error, required_error })
    .min(2, { message: "Choose an option" }),
});
const password_schema = z.object({
  password: z
    .string({ invalid_type_error, required_error })
    .min(8, { message: "Must be 8 or more characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "incorrect password format",
    }),
});
export type formerror = {
  [key: string]: string[];
};
export function Form() {
  const [error, setError] = useState<formerror | null>(null);
  const [toggleDisplay, setToggleDisplay] = useState(false);
  const [company, setCompany] = useState<string>("");
  const { toast, toastContainer } = useToast();
  //-----------------form validation-----------------
  function validateForm(formData: FormData) {
    const data = Object.fromEntries(formData);
    const result = schema.safeParse(data);
    if (result.success) return true;
    else {
      console.log(result.error.flatten().fieldErrors);
      setError((old) =>
        old
          ? { ...old, ...result.error.flatten().fieldErrors }
          : result.error.flatten().fieldErrors,
      );
    }
  }
  //---------------password validation----------------
  function validatePassword(password: string) {
    const result = password_schema.safeParse({ password });
    if (result.success) return true;
    else {
      console.log(result.error.flatten().fieldErrors);
      setError((old) =>
        old
          ? { ...old, ...result.error.flatten().fieldErrors }
          : result.error.flatten().fieldErrors,
      );
    }
  }
  return (
    <>
      {toastContainer}
      <form
        action={async (formData) => {
          const valid =
            validateForm(formData) &&
            validatePassword(formData.get("password") as string);
          if (valid) {
            const { error } = await signup(formData);
            if (error) toast.error(error.message, error.type);
            else toast.success("Please verify your email", "sign up success");
          }
        }}
        className="flex h-fit w-full max-w-[32.5rem] flex-col items-center gap-4 rounded-xl bg-white px-4 py-8 transition-all duration-300 ease-linear"
      >
        {toggleDisplay ? (
          <h1 className="flex flex-col items-center justify-center  gap-2 text-center text-2xl font-bold leading-[1.2] text-color-green-4">
            <span>{`${company}.softyhr.com`}</span>
            <span className="text-[1rem] font-normal text-gray-12 ">
              Here is your domain. Everyone on your account will need to use
              this unique domain to create their trial account
            </span>
          </h1>
        ) : (
          <h1 className={`text-3xl font-bold leading-[1.2] text-color-green-4`}>
            Sign up for SoftyHR
          </h1>
        )}
        <div
          className={`grid h-fit w-full grid-cols-2  items-center justify-start gap-[1.125rem] px-5 py-4 ${
            toggleDisplay ? "grid-rows-[20%_20%_auto]" : "grid-rows-6"
          }`}
        >
          <Input
            name="first_name"
            type="text"
            label="First Name"
            error={error?.first_name}
            toggleDisplay={toggleDisplay}
          />
          <Input
            name="last_name"
            type="text"
            label="Last Name"
            error={error?.last_name}
            toggleDisplay={toggleDisplay}
          />
          <Input
            name="email"
            type="email"
            label="Email Adress"
            className=" col-span-2 grow"
            error={error?.email}
            toggleDisplay={toggleDisplay}
          />
          <Input
            name="job"
            type="text"
            label="Job Title"
            className=" col-span-2 grow"
            error={error?.job}
            toggleDisplay={toggleDisplay}
          />
          <Input
            name={"company"}
            type="text"
            label={toggleDisplay ? "SoftyHR Domain" : "Company Name"}
            className=" col-span-2 grow"
            error={error?.company}
            setValueInParent={setCompany}
          />
          <Input
            name="tel"
            type="tel"
            label="Phone Number"
            error={error?.tel}
            toggleDisplay={toggleDisplay}
          />
          <Input
            name="employee_count"
            type="select"
            label="Employee Count"
            options={[
              { name: "1-24", value: "1-24" },
              { name: "25-75", value: "25-75" },
              { name: "76-150", value: "76-150" },
              { name: "151-300", value: "151-300" },
              { name: "301-500", value: "301-500" },
              { name: "501+", value: "501+" },
            ]}
            error={error?.employee_count}
            toggleDisplay={toggleDisplay}
          />
          <Input
            name="country"
            type="select"
            label="Country"
            options={countries}
            className="col-span-2"
            error={error?.country}
            toggleDisplay={toggleDisplay}
          />
          <PrivacyPolicy toggleDisplay={toggleDisplay} />
          {/* Step2 */}
          {toggleDisplay && (
            <>
              <div className="col-span-2 flex w-full flex-1 ">
                <PasswordInput error={error?.password} />
              </div>
              <div className="col-span-2 flex h-fit w-full grow flex-col gap-4 px-6">
                <p className="leading-6text-gray-9 text-center">
                  Password Requirements:
                </p>
                <ul className="list-disc text-sm leading-5 text-gray-9 [&_li]:mb-2 [&_li]:space-x-5">
                  <li>Eight or more characters</li>
                  <li>At least one uppercase letter</li>
                  <li>At least one lowercase letter</li>
                  <li>At least one number</li>
                </ul>
              </div>
              <TermsAndConditions />
            </>
          )}
        </div>
        {/* Step1 */}
        <div className={`-mt-3 w-full px-8 ${toggleDisplay ? "hidden" : ""}`}>
          <button
            className="col-span-2 h-14 w-full  cursor-pointer rounded-xl bg-color-green-4 font-bold text-white transition-all duration-300 ease-linear hover:bg-color-green-5 disabled:cursor-wait disabled:bg-color-green-5  disabled:opacity-50  "
            formAction={(formData: FormData) => {
              const valid = validateForm(formData);
              if (valid) {
                setToggleDisplay((old) => !old);
                setCompany(formData.get("company") as string);
              }
            }}
          >
            Sign Up
          </button>
        </div>
        {/* Step2 */}
        <div className={`w-full ${toggleDisplay ? "" : "hidden"}`}>
          <SubmitBtn>Generate Your Account</SubmitBtn>
        </div>
      </form>
    </>
  );
}
