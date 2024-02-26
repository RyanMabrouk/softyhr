"use client";
import React, { useContext } from "react";
import StepContext, {
  StepContextContextType,
} from "../../../TimeOff/policy/context/StepContext";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import ErrorContext, {
  ErrorContextContextType,
} from "../../../TimeOff/policy/context/errorContext";
import { z } from "zod";

export function NextStepBtn() {
  const invalid_type_error = "Invalid type provided for this field";
  const required_error = "This field cannot be blank";
  const step1_schema = z.object({
    role_name: z
      .string({ invalid_type_error, required_error })
      .min(3, { message: "Must be 3 or more characters long" }),
  });
  const step2_schema = z.object({});
  const { step, setStep } = useContext<StepContextContextType>(StepContext);
  const { setError } = useContext<ErrorContextContextType>(ErrorContext);
  function validateStep1(formData: FormData) {
    const data = Object.fromEntries(formData);
    const result = step1_schema.safeParse(data);
    if (result.success) {
      setError && setError(null);
      return true;
    } else {
      setError && setError(result.error.flatten().fieldErrors);
      return false;
    }
  }
  function validateStep2(formData: FormData) {
    const data = Object.fromEntries(formData);
    const result = step2_schema.safeParse(data);
    if (result.success) {
      setError && setError(null);
      return true;
    } else {
      setError && setError(result.error.flatten().fieldErrors);
      return false;
    }
  }
  if (step === 3) return;
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
