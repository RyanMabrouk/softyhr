"use client";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { useAcceptLeaveRequest } from "../../hooks/useAcceptLeaveRequest";
import { request_type } from "../../types/types";
import useTranslation from "@/translation/useTranslation";
export function AcceptRequestBtn({ request }: { request: request_type }) {
  const { accept } = useAcceptLeaveRequest({
    request: request,
  });
  const { lang } = useTranslation();
  return (
    <div
      className="tooltip"
      data-tip={lang?.["Time Off"]["Accept"]}
      role="button"
      onClick={() => accept()}
    >
      <FaCheck className="peer hidden h-7 w-7 cursor-pointer rounded-md border border-transparent p-0.5 text-gray-21 transition-all ease-linear hover:border hover:border-black hover:bg-white group-hover:block" />
    </div>
  );
}
