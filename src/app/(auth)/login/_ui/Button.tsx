"use client";
import React from "react";
export function Button({
  children,
  disabled,
  className,
  onClick,
  formAction,
  type = "button",
}: {
  children: string;
  disabled?: boolean;
  className?: string;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  formAction?: (formData: FormData) => void;
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`col-span-2 h-11 w-full min-w-[8rem] cursor-pointer rounded-md bg-fabric-700 px-[auto] font-bold capitalize  text-white transition-all duration-300 ease-linear hover:bg-fabric-600 disabled:cursor-wait disabled:bg-color-primary-5  disabled:opacity-50 ${className} `}
      onClick={onClick}
      formAction={formAction}
    >
      {disabled ? (
        <div className="flex flex-row items-center justify-center gap-2">
          <span className="box-border inline-block h-5 w-5 animate-[spin_1s_linear_infinite] rounded-[50%] border-[3px] border-solid border-white border-b-transparent"></span>
          Processing...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
