import React, { useContext } from "react";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import { InputGeneric, Label } from "@/app/_ui/InputGeneric";
import { RadioGroupBtns } from "./RadioGroupBtns";
import InsightGeneric from "@/app/_ui/InsightGeneric";
import ErrorContext, { ErrorContextContextType } from "../context/errorContext";
import ToggleVisivilityContext, {
  ToggleVisivilityContextContextType,
} from "../context/ToggleVisivilityContext";
export function CarryoverValidity() {
  const { error } = useContext<ErrorContextContextType>(ErrorContext);
  const { toggle } = useContext<ToggleVisivilityContextContextType>(
    ToggleVisivilityContext,
  );
  if (!toggle) return;
  const values = {
    name: "carryover_validity",
    label: "Is there a cap on the balance an employee can accrue?",
    options: [
      {
        label: "No, it never expires",
        value: "",
      },
      {
        label: "Yes, it expires after a period of time",
        value: "yes",
      },
    ],
    extra: (
      <div className="mb-2 ml-6 mt-3 flex flex-row items-start gap-1.5 [&>span]:pt-1">
        <InputGeneric
          error={error?.carryover_validity_count?.[0]}
          type="number"
          name="carryover_validity_count"
          className="!max-w-16"
        />
        <SelectGeneric
          className="!max-w-[10rem]"
          name="carryover_validity_unit"
          defaultValue={{
            label: "Days",
            value: "days",
          }}
          options={[
            { label: "Days", value: "days" },
            { label: "Weeks", value: "weeks" },
            { label: "Months", value: "months" },
            { label: "Years", value: "years" },
          ]}
        />
      </div>
    ),
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <Label name={values.name}>{values.label}</Label>
        <InsightGeneric tip="Example. an Employee carries over 21 hours of time off balance but they must be used within 3 months." />
      </div>
      <RadioGroupBtns {...values} defaultValue={values.options[0]} />
    </div>
  );
}
