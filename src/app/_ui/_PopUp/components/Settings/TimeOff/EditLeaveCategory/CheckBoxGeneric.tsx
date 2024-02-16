import React, { ReactNode } from "react";
import Checkbox from "@mui/material/Checkbox";

export function CheckBoxGeneric({
  children,
  name,
  defaultValue,
  required,
}: {
  children: ReactNode;
  name: string;
  defaultValue?: boolean;
  required?: boolean;
}) {
  return (
    <div className="col-span-2 -ml-2 flex h-6 flex-row items-center text-left text-[0.95rem] font-normal leading-[18px] text-gray-27 ">
      <Checkbox
        name={name}
        className="peer -mr-1.5 border border-gray-21"
        sx={{
          strokeWidth: "1px",
          color: "#222",
          "&.Mui-checked": {
            color: "#527a00",
          },
        }}
        checked={defaultValue}
        required={required}
      />
      <p className="peer-checked:font-bold">{children}</p>
    </div>
  );
}
