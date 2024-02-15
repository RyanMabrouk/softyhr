"use client";
import Link from "next/link";
import React from "react";
import { MdPerson } from "react-icons/md";
import { UnderlinedLink } from "@/app/_ui/UnderlinedLink";

export function EmployeeProfileLink({
  user_id,
  children,
}: {
  user_id: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      className="flex flex-row items-center gap-1"
      href={{
        pathname: `/people/${user_id}/personnal`,
      }}
    >
      <MdPerson className="h-5 w-5 text-fabric-700" />
      <UnderlinedLink>{children}</UnderlinedLink>
    </Link>
  );
}
