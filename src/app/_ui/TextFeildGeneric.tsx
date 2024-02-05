"use client";
import React from "react";
import { Label } from "@/app/_ui/InputGeneric";

export function TextFeildGeneric({
  name,
  label,
  required,
  error,
  setValueInParent,
  defaultValue,
  placeholder,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  setValueInParent?: any;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex w-full flex-col gap-1">
      <Label required={required} error={error ? true : false} name={name}>
        {label}
      </Label>
      <textarea
        name={name}
        id={name}
        className="focus:shadow-green maw-w-[20rem] w-full rounded-md border border-gray-18 px-2  py-1 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px] outline-none transition-all ease-linear placeholder:text-gray-32 focus:outline-none "
        cols={10}
        rows={5}
        onChange={(e) => setValueInParent && setValueInParent(e.target.value)}
        placeholder={placeholder}
        defaultValue={defaultValue}
        draggable
      />
    </div>
  );
}
