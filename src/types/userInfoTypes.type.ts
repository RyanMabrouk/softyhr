import { ReactNode } from "react";

export interface changementRequest 
  { label: string, action: (arg: string) => ReactNode }

export interface Settings 
  { label: string, action: (arg: string) => ReactNode }

