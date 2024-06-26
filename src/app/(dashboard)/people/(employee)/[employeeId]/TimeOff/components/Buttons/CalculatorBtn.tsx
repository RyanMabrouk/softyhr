"use client";
import React from "react";
import { FaCalculator } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useTranslation from "@/translation/useTranslation";

export function CalculatorBtn({ id }: { id: number }) {
  const pathname = usePathname();
  const { lang } = useTranslation();
  return (
    <Link
      href={{
        pathname: pathname,
        query: { popup: "CALCULATE_LEAVE_BALANCE", policy_id: id },
      }}
      className="tooltip tooltip-bottom "
      data-tip={lang?.["Time Off"]["Calculate Balance"]}
    >
      <FaCalculator className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-black bg-white px-2 text-center " />
    </Link>
  );
}
