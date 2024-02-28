"use client";
import Currency from "../CurrencyInputPerPeriode/Curreny.json";
import React, { memo, useEffect, useState } from "react";
import SelectInput from "../select/Select";
import {
  extractCurrencyValueAndPeriod,
  formattedData,
} from "./helpers/Curreny.helpers";
import { RowFieldType } from "@/types/userInfoTypes.type";

interface InputPropsType {
  RowField: RowFieldType;
  setTouched?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  defaultValue?: string;
}

const CurrencyInput = ({
  RowField,
  setTouched,
  defaultValue,
}: InputPropsType) => {
  const { currency, Pay } = extractCurrencyValueAndPeriod(
    defaultValue || "",
  );
  const [CurrentCurrency, setCurrentCurency] = useState<string | null>(
    currency || "USD",
  );
  const [value, setValue] = useState<string>(String(Pay));

  console.log(RowField);
  useEffect(() => {
    console.log(`${CurrentCurrency} ${value}`);
  }, [CurrentCurrency]);

  return (
    <div className="flex items-end justify-center gap-[1rem]">
      <div className="flex flex-col items-start justify-center">
        <label
          className={
            "text-[14px] text-gray-29 " +
            (RowField?.required
              ? " after:text-color-primary-8 after:content-['*']"
              : "")
          }
        >
          {RowField?.name}
        </label>
        <div className="group relative flex  flex-row-reverse items-center justify-start overflow-hidden rounded-sm border border-gray-19">
          <div className="absolute top-0  h-[1.8rem] w-[4rem]">
            <div className="absolute -right-[1rem] top-0 overflow-hidden border-l  text-[1rem]">
              <SelectInput
                className={
                  "-mt-0.2 !h-[2rem] !min-w-[4rem] rounded-sm border !border-none border-gray-18 bg-gray-14 !pr-[1rem]"
                }
                RowField={{
                  name: "",
                  type: "select",
                  options: formattedData(Currency),
                }}
                dropDownDisplay={false}
                defaultValue={CurrentCurrency}
                setSelectedKeys={setCurrentCurency}
              />
            </div>
          </div>
          <input
            className={
              "focus:focus-within:shadow-green h-[2rem] overflow-hidden px-2 text-[0.95rem] font-normal outline-none  " +
              (RowField?.Icon ? "pl-8 " : "")
            }
            type="Number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => {
              if (setTouched) setTouched(true);
            }}
            placeholder={RowField?.placeHolder || ""}
            required={RowField?.required}
          />
          <input
            required={RowField?.required}
            type="text"
            className="absolute bottom-0 left-10 h-[1px] w-[1px] opacity-0"
            value={`${CurrentCurrency} ${value}`}
            readOnly
            name={RowField?.name}
            hidden
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default memo(CurrencyInput);
