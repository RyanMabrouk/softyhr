"use client";
import { RowFieldType } from "@/types/userInfoTypes.type";
import React, { memo, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface InputPropsType {
  RowField: RowFieldType;
  setTouched:(arg: boolean)=> void;
}

const Input = ({ RowField, setTouched }:InputPropsType) => {
  //const [value, setvalue] = useState<string>("");

  //console.log(values, RowField);
  
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
        className="h-[2rem] rounded border border-gray-19 pl-2 font-normal outline-none"
        type={RowField?.type || "text"}
        name={RowField?.name}
        onFocus={() => setTouched(true)}
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
