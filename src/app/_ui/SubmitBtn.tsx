"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./Button";

export function SubmitBtn({
  children,
  className,
  disabled,
}: {
  children: string;
  className?: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending || disabled} type="submit" className={className}>
      {children}
    </Button>
  );
}
