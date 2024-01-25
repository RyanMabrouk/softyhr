"use client";
import React, { useContext } from "react";
import StepContext, { StepContextContextType } from "../context/StepContext";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import ErrorContext, { ErrorContextContextType } from "../context/errorContext";
import { z } from "zod";
import { database_leave_policies_policy_type } from "@/types/database.tables.types";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import createNewPathname from "@/helpers/createNewPathname";
import FormDataContext, {
  FormDataContextContextType,
} from "../context/formDataContext";
const invalid_type_error = "Invalid type provided for this field";
const required_error = "This field cannot be blank";
const step1_schema = z.object({
  policy_name: z
    .string({ invalid_type_error, required_error })
    .min(3, { message: "Must be 3 or more characters long" }),
  categories_id: z
    .string({ invalid_type_error, required_error })
    .min(1, { message: "Must choose a category" }),
});
const step2_schema = z.object({
  accure_value: z.coerce
    .number()
    .gte(1, { message: "Must be a at least 1" }),
  waiting_period: z.coerce
    .number()
    .gte(1, { message: "Must be a at least 1" })
    .optional(),
  carryover_limit_value: z.coerce
    .number()
    .gte(1, { message: "Must be a at least 1" })
    .optional(),
  carryover_validity_count: z.coerce
    .number()
    .gte(1, { message: "Must be a at least 1" })
    .optional(),
  accure_limit_waiting_period: z.coerce
    .number()
    .gte(1, { message: "Must be a at least 1" })
    .optional(),
});
export function NextStepBtn() {
  const { step, setStep } = useContext<StepContextContextType>(StepContext);
  const { setError } = useContext<ErrorContextContextType>(ErrorContext);
  const { setFormData } =
    useContext<FormDataContextContextType>(FormDataContext);
  const Router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const type: database_leave_policies_policy_type = searchParams.get(
    "type",
  ) as database_leave_policies_policy_type;
  function validateStep1(formData: FormData) {
    const data = Object.fromEntries(formData);
    const result = step1_schema.safeParse(data);
    if (result.success) {
      setError && setError(null);
      Router.push(
        createNewPathname({
          currentPathname: pathname,
          currentSearchParams: searchParams,
          name: "categories_id",
          value: formData.get("categories_id") as string,
        }),
      );
      return true;
    } else {
      setError && setError(result.error.flatten().fieldErrors);
      return false;
    }
  }
  function validateStep2(formData: FormData) {
    const data = Object.fromEntries(formData);
    setFormData && setFormData(formData);
    const result = step2_schema.safeParse(data);
    if (result.success) {
      setError && setError(null);
      return true;
    } else {
      setError && setError(result.error.flatten().fieldErrors);
      return false;
    }
  }
  if (step === 3 || type !== "traditional") return;
  return (
    <SubmitBtn
      className="!h-10 !w-20"
      formAction={(formData) => {
        if (step === 1) {
          if (validateStep1(formData)) {
            setStep && setStep((old) => old + 1);
          }
        } else {
          if (validateStep2(formData)) {
            setStep && setStep((old) => old + 1);
          }
        }
      }}
    >
      Next Step
    </SubmitBtn>
  );
}
