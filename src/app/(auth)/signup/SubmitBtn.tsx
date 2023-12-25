"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/Button";

export function SubmitBtn({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className={className}>
      {children}
    </Button>
  );
}