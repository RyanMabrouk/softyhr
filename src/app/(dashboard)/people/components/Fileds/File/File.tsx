import { RowFieldType } from "@/types/database.tables.types";
import React from "react";

interface InputFilePropsType {
  RowField: RowFieldType;
  defaultValue?: string;
}

function InputFile({ RowField, defaultValue }: InputFilePropsType) {
  return (
    <div className="flex flex-col items-start justify-center gap-[0.5rem]">
      <label
        className={
          "text-[14px] text-gray-29 " +
          (RowField?.required ? " after:text-red after:content-['*']" : "")
        }
      >
        {RowField?.name} file
      </label>
      <input
        required={RowField?.required}
        className="block w-full cursor-pointer text-sm
        text-slate-500 duration-200 ease-in-out file:mr-4 
        file:rounded-md file:border-0 file:px-4
        file:py-2 file:text-sm
        file:font-semibold file:text-color-primary-8"
        type="file"
        name={RowField?.name}
      />
    </div>
  );
}

export default InputFile;
