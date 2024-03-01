"use client";
import Currency from "./Curreny.json";
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

const CurrencyInputPerPeriode = ({
  RowField,
  setTouched,
  defaultValue,
}: InputPropsType) => {
  const { currency, Pay, period } = extractCurrencyValueAndPeriod(
    defaultValue || "",
  );
  const [PayPeriod, setPayPeriod] = useState<string | null>(period || "");
  const [CurrentCurrency, setCurrentCurency] = useState<string | null>(
    currency || "USD",
  );
  const [value, setValue] = useState<string>(String(Pay));

  console.log(RowField);
  useEffect(() => {
    console.log(`${CurrentCurrency} ${value} /${PayPeriod}`);
  }, [CurrentCurrency, PayPeriod]);

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
                  "-mt-0.2 !h-[2rem] !min-w-[4rem] rounded-sm border !border-none border-gray-18 bg-white !pr-[1rem]"
                }
                RowField={{
                  name: "",
                  type: "select",
                  options: formattedData(Currency),
                }}
                renderOptionclassName="!pr-[0px]"
                dropDownDisplay={false}
                defaultValue={CurrentCurrency || "USD"}
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
            value={`${CurrentCurrency} ${value} / ${PayPeriod}`}
            readOnly
            name={RowField?.name}
            hidden
            autoFocus
          />
        </div>
      </div>
      <h1 className="text-sm text-gray-29">Per</h1>
      <SelectInput
        RowField={{
          name: "",
          type: "select",
          options: [
            {
              label: "Day",
              value: "Day",
            },
            {
              label: "Week",
              value: "Week",
            },
            {
              label: "Month",
              value: "Month",
            },
            {
              label: "Quarter",
              value: "Quarter",
            },
            {
              label: "Year",
              value: "Year",
            },
            {
              label: "Pay Period",
              value: "Pay Period",
            },
            {
              label: "Piece",
              value: "Piece",
            },
          ],
        }}
        setSelectedKeys={setPayPeriod}
        defaultValue={PayPeriod}
      />
      {"Year" == PayPeriod && (
        <h1 className="mb-[7px] text-[14px] text-gray-29">0% change</h1>
      )}
    </div>
  );
};

export default memo(CurrencyInputPerPeriode);
