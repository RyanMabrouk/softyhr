"use client";
import React from "react";
import { useParams, usePathname } from "next/navigation";
import useEmployeeData from "@/hooks/useEmloyeeData";
import { formatDDMMYYYY } from "@/helpers/date.helpers";
import Link from "next/link";
import { UnderlinedLink } from "@/app/_ui/UnderlinedLink";
import { database_profile_type } from "@/types/database.tables.types";
export function ChangeAccrualStartBtn() {
  const { employeeId } = useParams();
  const pathname = usePathname();
  const {
    employee_profile: { data: user, isPending: isPending },
  }: {
    employee_profile: { data: database_profile_type; isPending: boolean };
  } = useEmployeeData({
    employeeId: employeeId as string,
  });
  return (
    <Link
      href={{
        pathname: pathname,
        query: { popup: "CHANGE_ACCURAL_START_DATE" },
      }}
    >
      <UnderlinedLink>
        {formatDDMMYYYY(new Date(user?.accrual_start_date ?? ""))}
      </UnderlinedLink>
    </Link>
  );
}
