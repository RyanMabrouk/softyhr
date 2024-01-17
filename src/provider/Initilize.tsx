"use client";
import Loader from "@/app/_ui/Loader/Loader";
import useData from "@/hooks/useData";
import useEmployeeData from "@/hooks/useEmloyeeData";
import { useParams } from "next/navigation";
import React, { ReactNode } from "react";

interface InitializeProps {
  children: ReactNode;
}

function Initialize({ children }: InitializeProps) {
  const { employeeId } = useParams();
  const { employee_profile: data } = useEmployeeData({ employeeId });

  return !data?.data ? <Loader /> : <>{children}</>;
}

export default Initialize;
