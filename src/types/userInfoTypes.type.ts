import { ReactNode } from "react";

export interface changementRequest {
  label: string;
  action: (arg: string) => ReactNode;
}

export interface Settings {
  label: string;
  action: (arg: string) => ReactNode;
}

export interface RowFieldType {
  name: string;
  options: string[] | undefined;
  required: boolean;
  type: "select" | "text" | "radio";
}

export interface ChampsType {
  Icon: string;
  rang: number;
  champ: string;
  Fields: RowFieldType[];
}

export interface RowType {
  Row: RowFieldType[];
  rang: number;
}

export interface PopupType {
  EDIT_FIELD: () => ReactNode;
};