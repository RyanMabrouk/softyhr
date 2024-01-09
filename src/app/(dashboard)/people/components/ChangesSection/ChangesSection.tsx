"use client";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { useFormStatus } from "react-dom";
import BrandLogo from "./images/BrandLogo.png";

interface ChangesSectionPropsType {
  touched: boolean;
  setTouched: (arg: boolean) => void;
}

function ChangesSection({ touched, setTouched }: ChangesSectionPropsType) {
  const { pending } = useFormStatus();
  const queryClient = useQueryClient();
  return (
    <div className="fixed bottom-0 left-0 flex h-[5rem] w-full items-center justify-end  gap-[2rem] border-t border-gray-19 bg-gray-14 px-10 delay-200 ease-in-out  ">
      <div className="flex w-4/5 items-center justify-between">
        <div className="-mt-4 flex items-center justify-center gap-[2rem]">
          <button
            disabled={pending}
            className={
              "text-bold rounded bg-color-primary-8 p-2 px-5 text-white duration-300 ease-in-out hover:!bg-color-primary-3 " +
              (pending ? "  animate-pulse " : "")
            }
            type="submit"
          >
            {pending ? (
              <div className="flex items-center justify-center gap-[0.3rem]">
                <span className="box-border inline-block h-5 w-5 animate-[spin_1s_linear_infinite] rounded-[50%] border-[3px] border-solid border-white border-b-transparent"></span>
                saving...
              </div>
            ) : (
              "save changes"
            )}
          </button>
          <button
          type="reset"
            className="cursor-pointer text-cyan-600 hover:underline"
            onClick={() => {
              setTouched(false);
              queryClient.invalidateQueries({ queryKey: ["user_profile"] });
            }}
          >
            Cancel
          </button>
        </div>
        <Image
          height={250}
          width={250}
          src={BrandLogo}
          className="mt-8 cursor-pointer"
          alt="softyHR"
        />
      </div>
    </div>
  );
}

export default ChangesSection;
