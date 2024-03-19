import React, { ReactNode, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { getTawindColor } from "@/helpers/getTailwindColor";
const color = getTawindColor("fabric-700");
const gray_color = getTawindColor("gray-27");
export function CheckBoxGeneric({
  children,
  name,
  defaultValue = false,
  setValueInParent,
  setInputValueInParent,
  onChange,
  required,
  value,
}: {
  children: ReactNode;
  name: string;
  defaultValue?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (e: string, checked: boolean) => void;
  setInputValueInParent?: (e: string, checked: boolean) => void;
  setValueInParent?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [checked, setChecked] = useState(defaultValue);
  useEffect(() => {
    setChecked(defaultValue);
  }, [setChecked, defaultValue]);
  useEffect(() => {
    if (setValueInParent) {
      setValueInParent(checked);
    }
  }, [checked, setValueInParent]);
  useEffect(() => {
    if (setInputValueInParent) {
      setInputValueInParent(value ?? "", checked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);
  return (
    <div className="col-span-2 -ml-2 flex h-6 flex-row items-center gap-1.5 text-left font-normal leading-[18px] text-gray-27 ">
      <Checkbox
        name={name}
        className="-mb-[1px] -mr-1.5"
        value={value}
        sx={{
          strokeWidth: "1px",
          color: gray_color,
          "&.Mui-checked": {
            color: color,
          },
          "& .MuiSvgIcon-root": { fontSize: "1.35rem" },
        }}
        onChange={(e) => {
          setChecked((old) => !old);
          onChange && onChange(value ?? "", !checked);
        }}
        checked={checked}
        required={required}
      />
      <p
        className={`transition-all ease-linear ${checked ? " font-bold " : ""}`}
      >
        {children}
      </p>
    </div>
  );
}
