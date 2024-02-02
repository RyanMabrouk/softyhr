"use client";
import React from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonPropsType {
  textSubmitting: string;
  text: string;
  className?: string;
  onClick?: any;
}

function SubmitButton({
  textSubmitting,
  text,
  className,
  onClick,
}: SubmitButtonPropsType) {
  const { pending } = useFormStatus();
  return (
    <div
      className={`mt-4 flex items-center justify-center gap-[1rem] ${className}`}
    >
      <button
        disabled={pending}
        onClick={onClick}
        className={
          "text-bold rounded bg-color-primary-8 p-2 px-5 text-white duration-300 ease-in-out hover:!bg-color-primary-3 "
        }
        type="submit"
      >
        {pending ? (
          <div className="flex items-center justify-center gap-[0.3rem]">
            <span className="box-border inline-block h-5 w-5 animate-[spin_1s_linear_infinite] rounded-[50%] border-[3px] border-solid border-white border-b-transparent"></span>
            {textSubmitting}
          </div>
        ) : (
          text
        )}
      </button>
      <button
        type="reset"
        className="btn_left cursor-pointer text-cyan-600 hover:underline"
      >
        Cancel
      </button>
    </div>
  );
}

export default SubmitButton;
