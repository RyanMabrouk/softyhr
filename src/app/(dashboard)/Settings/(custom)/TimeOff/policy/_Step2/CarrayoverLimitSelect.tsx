"use client";
import React, { useContext, useEffect, useState } from "react";
import { InputGeneric, Label } from "@/app/_ui/InputGeneric";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import ErrorContext, { ErrorContextContextType } from "../context/errorContext";
import { useCategorieTimeUnit } from "../hooks/useCategorieTimeUnit";
import { useSearchParams } from "next/navigation";
export function CarrayoverLimitSelect() {
  const [value, setValue] = useState("limited");
  const { error } = useContext<ErrorContextContextType>(ErrorContext);
  const categories_id = useSearchParams().get("categories_id");
  const track_time_unit = useCategorieTimeUnit({
    categories_id: Number(categories_id),
  });
  return (
    <div className="mb-2 ml-6 mt-3 flex flex-col gap-1 ">
      <Label name="carryover_days_limit">
        How much time can be carried over?
      </Label>
      <div className="flex flex-row items-start gap-1.5 [&>span]:pt-1">
        <SelectGeneric
          className="!max-w-[10rem]"
          name="carryover_limit_type"
          setValueInParent={setValue}
          required
          defaultValue={{
            label: "Up to..",
            value: "limited",
          }}
          options={[
            { label: "Up to..", value: "limited" },
            { label: "Unlimited", value: "unlimited" },
          ]}
        />
        {value === "limited" && (
          <>
            <InputGeneric
              error={error?.carryover_limit_value?.[0]}
              name="carryover_limit_value"
              type="number"
              className="!w-16"
            />
            <span>{track_time_unit}</span>
          </>
        )}
      </div>
    </div>
  );
}
