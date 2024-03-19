import React, { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  shadow?: "red";
  error?: string;
  type?: "text" | "number";
  setValueInParent?: React.Dispatch<React.SetStateAction<string>>;
};
export function InputGeneric({
  name,
  label,
  shadow,
  error,
  type = "text",
  setValueInParent,
  ...props
}: InputProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <Label
          error={error ? true : false}
          required={props.required}
          name={name}
        >
          {label}
        </Label>
      )}
      <div className="relative flex w-fit flex-row items-center justify-center gap-1.5">
        <input
          {...props}
          step=".01"
          type={type}
          className={`w-full max-w-[10rem] rounded-md border px-2 py-1 shadow-sm transition-shadow ease-linear placeholder:text-gray-16 focus:outline-none ${shadow === "red" || error ? "focus:shadow-red !border-color9-500" : "focus:shadow-green border-gray-18 "} ${props.className}`}
          name={name}
          id={name + "_id"}
          onChange={(e) => {
            setValueInParent && setValueInParent(e.target.value);
          }}
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
type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
  required?: boolean;
  name: string;
  error?: boolean;
};

export function Label({
  children,
  required,
  name,
  error,
  ...props
}: LabelProps) {
  if (!children) return;
  return (
    <div className={`flex flex-row items-center gap-1`}>
      {error && <BsExclamationCircleFill className="text-sm text-color9-500" />}
      <label
        {...props}
        htmlFor={name + "_id"}
        className={`relative w-fit text-sm text-gray-21 ${error && "!text-color9-500"}`}
      >
        {children}
        {required && <span className="absolute -right-2 top-0 text-sm">*</span>}
      </label>
    </div>
  );
}
