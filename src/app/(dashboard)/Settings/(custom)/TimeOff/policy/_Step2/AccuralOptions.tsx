import React, { useContext } from "react";
import { InputGeneric, Label } from "@/app/_ui/InputGeneric";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import { CarrayoverLimitSelect } from "./CarrayoverLimitSelect";
import { RadioGroupBtns } from "./RadioGroupBtns";
import ErrorContext, { ErrorContextContextType } from "../context/errorContext";
import { useSearchParams } from "next/navigation";
import { useCategorieTimeUnit } from "../hooks/useCategorieTimeUnit";
import ToggleVisivilityContextContext, {
  ToggleVisivilityContextContextType,
} from "../context/ToggleVisivilityContext";
export function AccuralOptions() {
  const { error } = useContext<ErrorContextContextType>(ErrorContext);
  const categories_id = useSearchParams().get("categories_id");
  const track_time_unit = useCategorieTimeUnit({
    categories_id: Number(categories_id),
  });
  const { setToggle } = useContext<ToggleVisivilityContextContextType>(
    ToggleVisivilityContextContext,
  );
  const accural_options = [
    {
      name: "waiting_time",
      label:
        "Is there a waiting period before new employees begin accruing time?",
      options: [
        {
          label: "No, they begin accruing time immediately on hire",
          value: "",
        },
        {
          label: "Yes, there is a waiting period",
          value: "yes",
        },
      ],
      extra: (
        <div className="mb-2 ml-6 mt-3 flex flex-row items-start gap-1.5 [&>span]:pt-1">
          <InputGeneric
            error={error?.waiting_period?.[0]}
            type="number"
            name="waiting_period"
            className="!max-w-16"
          />
          <SelectGeneric
            className="!max-w-[10rem]"
            name="waiting_unit"
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
          <span>after hire date</span>
        </div>
      ),
    },
    {
      name: "accure_limit",
      label: "Is there a cap on the balance an employee can accrue?",
      options: [
        {
          label: "No, they will continue to accrue time, regardless of balance",
          value: "",
        },
        {
          label: "Yes, they stop accruing at a certain balance",
          value: "yes",
        },
      ],
      extra: (
        <div className="mb-2 ml-6 mt-3 flex flex-row items-start gap-1.5 [&>span]:pt-1">
          <InputGeneric
            error={error?.accure_limit_waiting_period?.[0]}
            type="number"
            name="accure_limit_waiting_period"
            className="!max-w-16"
          />
          <span>{track_time_unit}</span>
        </div>
      ),
    },
    {
      name: "carryover_limit",
      label:
        "Can unused time off be carried over after the carryover date? (You’ll set this date below)”",
      options: [
        {
          label: "No, it’s “use it or lose it”",
          value: "",
        },
        {
          label: "Yes, time can be carried over",
          value: "yes",
        },
      ],
      extra: <CarrayoverLimitSelect />,
    },
  ];
  return (
    <section className="flex flex-col gap-6">
      {accural_options.map((e, i) => (
        <div key={"accural_option" + i} className="flex flex-col">
          <Label name={e.name}>{e.label}</Label>
          {e.name === "carryover_limit" ? (
            <RadioGroupBtns
              {...e}
              defaultValue={e.options[0]}
              setValueInParent={() => setToggle && setToggle((old) => !old)}
            />
          ) : (
            <RadioGroupBtns {...e} defaultValue={e.options[0]} />
          )}
        </div>
      ))}
    </section>
  );
}
