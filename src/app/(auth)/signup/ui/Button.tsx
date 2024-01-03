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
      className={`col-span-2 h-14 w-full cursor-pointer rounded-xl bg-color-primary-4 font-bold capitalize text-white transition-all duration-300 ease-linear hover:bg-color-primary-5 disabled:cursor-wait disabled:bg-color-primary-5  disabled:opacity-50 ${className} `}
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
