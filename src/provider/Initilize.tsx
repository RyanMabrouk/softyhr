"use client";
import Loader from "@/app/_ui/Loader/Loader";
import useEmployeeData from "@/hooks/useEmloyeeData";
import { useParams } from "next/navigation";
import React, { ReactNode } from "react";

interface InitializeProps {
  children: ReactNode;
}
export default function Initialize({ children }: InitializeProps) {
  const { employeeId } = useParams();
  const {
    employee_profile: { data: user },
  } = useEmployeeData({ employeeId });
  return !user ? <Loader /> : <>{children}</>;
}