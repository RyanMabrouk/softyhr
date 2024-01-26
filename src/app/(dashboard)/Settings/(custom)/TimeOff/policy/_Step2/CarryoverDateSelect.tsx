"use client";
import React, { useState } from "react";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import { Label } from "@/app/_ui/InputGeneric";
import { carryover_date_options } from "../constants/accural_options";
export function CarryoverDateSelect() {
  const [value, setValue] = useState<string>("");
  return (
    <div className="flex flex-col justify-center gap-1">
      <Label name="carryover_date">What should the carryover date be?</Label>
      <div className="flex flex-row items-center gap-1.5">
        <SelectGeneric
          required
          className="!text-[0.95rem] !text-gray-27"
          setValueInParent={setValue}
          name="carryover_date"
          defaultValue={carryover_date_options[0]}
          options={carryover_date_options}
        />
        {carryover_date_options?.find((o) => o.value === value)?.extra}
      </div>
    </div>
  );
}
