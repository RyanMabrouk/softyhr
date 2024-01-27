"use client";
import React from "react";
import { UnderlinedLink } from "../../../../../../../_ui/UnderlinedLink";
import { useParams, usePathname } from "next/navigation";
import useEmployeeData from "@/hooks/useEmloyeeData";
import { formatDDMMYYYY } from "@/helpers/date.helpers";
import Link from "next/link";

export function ChangeAccrualStartBtn() {
  const { employeeId } = useParams();
  const pathname = usePathname();
  const {
    employee_profile: { data: user },
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
        {formatDDMMYYYY(new Date(user?.accrual_start_date))}
      </UnderlinedLink>
    </Link>
  );
}
