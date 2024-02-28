import React, { useState } from "react";
import { MdOutlineMoreTime, MdTimelapse } from "react-icons/md";
import { CheckBox } from "./CheckBox";
import { database_leave_policies_policy_type } from "@/types/database.tables.types";

export function TypeCheckBox() {
  const defaultType: database_leave_policies_policy_type = "traditional";
  const [selected, setselected] = useState(defaultType);
  return (
    <section className="flex flex-row items-center gap-4">
      <input
        type="text"
        name="type"
        hidden
        readOnly
        required
        value={selected}
      />
      <CheckBox
        setValueInParent={setselected}
        valueInParent={selected}
        value="traditional"
        Icon={(props) => (
          <MdTimelapse
            className={`!h-6 !w-20 text-gray-15  ${props.className}`}
          />
        )}
        label="It accrues time (traditional)"
        discription="Time taken by employees is deducted from a balance that accrues on a schedule or is set manually."
      />
      <CheckBox
        setValueInParent={setselected}
        valueInParent={selected}
        value="unlimited"
        Icon={(props) => (
          <MdOutlineMoreTime
            className={`!h-6 !w-20 text-gray-15 ${props.className}`}
          />
        )}
        label="It’s flexible (unlimited)"
        discription="There is no balance to deduct from, but I still want time off requests to be approved and tracked."
      />
    </section>
  );
}
