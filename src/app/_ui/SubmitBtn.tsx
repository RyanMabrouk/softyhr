"use client";
import React, { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./Button";
type SubmitBtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
  blocked?: boolean;
  formAction?: (formData: FormData) => void;
};
export function SubmitBtn({
  children,
  blocked,
  formAction,
  ...props
}: SubmitBtnProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      disabled={pending || props.disabled}
      formAction={formAction}
      type="submit"
    >
      {children}
    </Button>
  );
}
