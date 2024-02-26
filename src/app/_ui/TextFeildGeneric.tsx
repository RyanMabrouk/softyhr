import React, { ChangeEventHandler, TextareaHTMLAttributes } from "react";
import { Label } from "@/app/_ui/InputGeneric";
import { twMerge } from "tailwind-merge";
type TextFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  setValueInParent?: any;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};
export function TextFeildGeneric({
  name,
  label,
  required,
  error,
  setValueInParent,
  onChange,
  className,
  ...props
}: TextFieldProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      <Label required={required} error={error ? true : false} name={name}>
        {label}
      </Label>
      <div className="relative flex w-full flex-row items-center justify-start gap-1.5">
        <textarea
          {...props}
          name={name}
          id={name}
          className={twMerge(
            ` maw-w-[20rem] w-full rounded-md border  px-2  py-1 shadow-sm outline-none transition-all ease-linear placeholder:text-gray-32 focus:outline-none ${error ? "focus:shadow-red !border-color9-500" : "focus:shadow-green border-gray-18"}`,
            className,
          )}
          cols={10}
          rows={5}
          onChange={(e) => setValueInParent && setValueInParent(e.target.value)}
          required={required}
          draggable
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
