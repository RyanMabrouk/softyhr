import React from "react";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import { Label } from "@/app/_ui/InputGeneric";
import InsightGeneric from "@/app/_ui/InsightGeneric";
export function FineTuninigInputs() {
  return (
    <>
      <div className="flex flex-col justify-center gap-1">
        <Label name="accured_time_start">
          Employees receive accrued time...
        </Label>
        <div className="flex flex-row items-center gap-2">
          <SelectGeneric
            className="!w-[15rem] !text-[0.95rem] !text-gray-27"
            name="accured_time_start"
            defaultValue={{
              label: "At the start of the accrual period",
              value: "start",
            }}
            options={[
              {
                label: "At the start of the accrual period",
                value: "start",
              },
              {
                label: "At the end of the accrual period",
                value: "end",
              },
            ]}
          />
          <InsightGeneric tip="Change this option if the employee shouldn't receive accrued time for just part of the period, based on the day they are hired." />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1">
        <Label name="first_accural_date">
          Employees first accural date should be..
        </Label>
        <div className="flex flex-row items-center gap-2">
          <SelectGeneric
            className="!w-[15rem] !text-[0.95rem] !text-gray-27"
            name="first_accural_date"
            defaultValue={{
              label: "Prorated, based on the accrual period",
              value: "prorated",
            }}
            options={[
              {
                label: "Prorated, based on the accrual period",
                value: "prorated",
              },
              {
                label: "The full amount for the accrual period",
                value: "full_amount",
              },
            ]}
          />
          <InsightGeneric tip="Change this option if employees shouldn't receive all of the time off for the accrual period when it begins." />
        </div>
      </div>
    </>
  );
}
