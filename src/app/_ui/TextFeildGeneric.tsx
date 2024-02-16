import React, { ChangeEventHandler, TextareaHTMLAttributes } from "react";
import { Label } from "@/app/_ui/InputGeneric";
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
  ...props
}: TextFieldProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      <Label required={required} error={error ? true : false} name={name}>
        {label}
      </Label>
      <textarea
        {...props}
        name={name}
        id={name}
        className="focus:shadow-green maw-w-[20rem] w-full rounded-md border border-gray-18 px-2  py-1 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px] outline-none transition-all ease-linear placeholder:text-gray-32 focus:outline-none "
        cols={10}
        rows={5}
        onChange={(e) => setValueInParent && setValueInParent(e.target.value)}
        required={required}
        draggable
      />
    </div>
  );
}
