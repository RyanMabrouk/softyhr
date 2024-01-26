"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./Button";

export function SubmitBtn(props: {
  children: string;
  className?: string;
  disabled?: boolean;
  blocked?: boolean;
  onClick?: () => void;
  formAction?: (formData: FormData) => void;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      disabled={pending || props.disabled}
      formAction={props.formAction}
      type="submit"
    >
      {props.children}
    </Button>
  );
}
