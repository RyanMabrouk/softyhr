"use client";
import React from "react";

export function Button({
  children,
  disabled,
  onClick,
  formAction,
  type = "button",
}: {
  children: string;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  formAction?: (formData: FormData) => void;
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      className="col-span-2 h-14 w-full cursor-pointer rounded-xl bg-color-green-4 font-bold text-white transition-all duration-300 ease-linear hover:bg-color-green-5 disabled:cursor-wait disabled:bg-color-green-5  disabled:opacity-50  "
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
