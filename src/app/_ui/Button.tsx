import React, { ButtonHTMLAttributes } from "react";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
  blocked?: boolean;
  formAction?: (formData: FormData) => void;
};
export function Button({
  children,
  blocked,
  formAction,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={blocked || props.disabled}
      className={`col-span-2 h-11 w-full min-w-[9rem] space-x-8 rounded-md capitalize shadow-sm transition-all ease-linear hover:shadow-md  ${blocked ? " cursor-not-allowed border bg-white px-2 py-2 font-semibold capitalize text-stone-400 disabled:border-gray-300" : "cursor-pointer bg-fabric-700 font-bold  text-white hover:bg-fabric-600 disabled:cursor-wait disabled:bg-color-primary-5  disabled:opacity-50"} ${props.className} `}
      onClick={props.onClick}
      formAction={formAction}
      {...props}
    >
      {blocked ? (
        children
      ) : props.disabled ? (
        <div className="flex flex-row items-center justify-center gap-2">
          <span className="box-border inline-block h-5 w-5 animate-[spin_1s_linear_infinite] rounded-full border-[3px] border-solid border-white border-b-transparent"></span>
          Processing...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
