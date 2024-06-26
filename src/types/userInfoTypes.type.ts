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
  options?: Object[] | undefined;
  required?: boolean;
  placeHolder?: string | undefined;
  type?: string | undefined;
  Icon?:string | undefined ;
}
export interface insert_RowFieldType {
  name: string;
  options?: Object[] | undefined;
  required?: boolean;
  placeHolder?: string | undefined;
  type: string;
  Icon?: string | undefined;
}

export interface ChampsType {
  Icon: string;
  rang: number;
  champ: string;
  Fields: RowType[];
}

export interface RowType {
  Row: RowFieldType[];
  rang: number;
}

export interface PopupType {
  EDIT_FIELD: () => ReactNode;
}
