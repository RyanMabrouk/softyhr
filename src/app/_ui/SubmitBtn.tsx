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
  className,
  disabled,
}: SubmitBtnProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      className={className}
      blocked={blocked}
      disabled={pending || disabled}
      formAction={formAction}
      type="submit"
    >
      {children}
    </Button>
  );
}
