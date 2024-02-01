"use client";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { useFormStatus } from "react-dom";
import BrandLogo from "./images/BrandLogo.png";
import { useRouter } from "next/navigation";

interface ChangesSectionPropsType {
  touched?: boolean;
  setTouched?: (arg: boolean) => void;
  SubmitTxt?: string | undefined;
  PendingSubmitTxt?: string | undefined;
}

function ChangesSection({
  setTouched,
  PendingSubmitTxt,
  SubmitTxt,
}: ChangesSectionPropsType) {
  const { pending } = useFormStatus();
  const queryClient = useQueryClient();
  const router = useRouter();
  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-[5rem] w-full items-center justify-end  gap-[2rem] overflow-hidden border-t border-gray-19 bg-gray-14 px-10 delay-200 ease-in-out  ">
      <div className="flex w-4/5 items-center justify-between">
        <div className="-mt-4 flex items-center justify-center gap-[2rem]">
          <button
            disabled={pending}
            className={
              " rounded-md bg-fabric-700 px-2 py-2 font-semibold  text-white  transition-all ease-linear hover:!bg-fabric-600" +
              (pending ? "  animate-pulse " : "")
            }
            type="submit"
          >
            {pending ? (
              <div className="flex items-center justify-center gap-[0.3rem]">
                <span className="box-border inline-block h-5 w-5 animate-[spin_1s_linear_infinite] rounded-[50%] border-[3px] border-solid border-white border-b-transparent"></span>
                {PendingSubmitTxt || "Saving..."}
              </div>
            ) : (
              SubmitTxt || "Save changes"
            )}
          </button>
          <button
            type="reset"
            className="cursor-pointer text-cyan-600 hover:underline"
            onClick={() => {
              queryClient.invalidateQueries({ queryKey: ["profiles"] });
              setTouched && setTouched(false);
              router.refresh();
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
