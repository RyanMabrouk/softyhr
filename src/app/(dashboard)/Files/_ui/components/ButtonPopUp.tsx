import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import React from "react";
export default function ButtonPopUp({ children, check, onClick }: any) {
  return (
    <SubmitBtn
      blocked={check}
      onClick={onClick}
      className="!max-w-[10rem]"
      //className="bg-color-btn cursor-pointer px-4 py-2 text-white hover:bg-color-primary-6 disabled:cursor-not-allowed disabled:border disabled:border-gray-300 disabled:bg-white disabled:font-semibold disabled:text-stone-400"
    >
      {children}
    </SubmitBtn>
  );
}
