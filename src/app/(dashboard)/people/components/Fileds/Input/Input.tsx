"use client";
import { RowFieldType } from "@/types/userInfoTypes.type";
import React, { memo, useState } from "react";

interface InputPropsType {
  RowField: RowFieldType;
  setTouched: (arg: boolean) => void;
  user: any;
  champ: string;
}

const Input = ({ RowField, setTouched, user, champ }: InputPropsType) => {
  //console.log(champ, RowField?.name, user[champ][RowField?.name || ""]);
  const [value, setValue] = useState<string>(
    String(user[champ][RowField?.name || ""]),
  );
  return (
    <div className="flex flex-col items-start justify-center">
      <h1
        className={
          "text-gray text-sm font-light " +
          (RowField?.required ? " after:text-red after:content-['*']" : "")
        }
      >
        {RowField?.name}
      </h1>
      <input
        className="h-[2rem] rounded border border-gray-19 pl-2 font-light outline-none"
        type={RowField?.type || "text"}
        value={value}
        name={RowField?.name}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setTouched(true)}
        placeholder={RowField?.placeHolder || ""}
        //value={value}
        // onChange={handleChange}
        //  setvalue(e.target.value);
        //  setFieldValue(RowField?.name, value);
        //  }}
      />
    </div>
  );
};

export default memo(Input);
