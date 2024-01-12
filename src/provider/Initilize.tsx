"use client";
import Loader from '@/app/_ui/Loader/Loader';
import useData from '@/hooks/useData';
import useEmployeeData from '@/hooks/useEmloyeeData';
import React, { ReactNode } from 'react';

interface InitializeProps {
  children: ReactNode;
  employeeId: string;
}

function Initialize({ children, employeeId }: InitializeProps) {
  const { employee_profile: data } = useEmployeeData({ employeeId });

  return !data?.data ? <Loader /> : <>{children}</>;
}

export default Initialize;
