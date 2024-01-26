"use client";
import React from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
export function InputGeneric({
  name,
  label,
  className,
  defaultValue,
  placeholder,
  required,
  type = "text",
  setValueInParent,
  shadow,
  error,
}: {
  name: string;
  label?: string;
  className?: string;
  type?: "text" | "number";
  defaultValue?: string | "";
  placeholder?: string;
  required?: boolean;
  shadow?: "red";
  error?: string | undefined;
  setValueInParent?: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <Label error={error ? true : false} required={required} name={name}>
          {label}
        </Label>
      )}
      <div className="relative flex w-fit flex-row items-center justify-center gap-1.5">
        <input
          step=".01"
          type={type}
          className={`w-full max-w-[10rem] rounded-md border border-gray-18 px-2 py-1 shadow-sm placeholder:text-gray-16 focus:outline-none ${shadow === "red" || error ? "focus:shadow-red !border-color9-500" : "focus:shadow-green"} ${className}`}
          name={name}
          id={name + "_id"}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={(e) => {
            setValueInParent && setValueInParent(e.target.value);
          }}
          required={required}
        />
        {error && (
          <span className="absolute -bottom-[1.375rem] left-0 w-max text-sm text-color9-500">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
export function Label({
  children,
  required,
  name,
  error,
}: {
  children: React.ReactNode;
  required?: boolean;
  name: string;
  error?: boolean;
}) {
  return (
    <div className={`flex flex-row items-center gap-1`}>
      {error && <BsExclamationCircleFill className="text-sm text-color9-500" />}
      <label
        htmlFor={name + "_id"}
        className={`relative w-fit text-sm text-gray-21 ${error && "!text-color9-500"}`}
      >
        {children}
        {required && <span className="absolute -right-2 top-0 text-sm">*</span>}
      </label>
    </div>
  );
}
