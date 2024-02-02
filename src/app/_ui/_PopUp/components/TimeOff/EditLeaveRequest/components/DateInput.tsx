import React from "react";
import { formatYYYYMMDD } from "@/helpers/date.helpers";
import { useAlreadyBooked } from "@/app/_ui/_PopUp/components/TimeOff/EditLeaveRequest/hooks/useAlreadyBooked";
import { useParams } from "next/navigation";
import useData from "@/hooks/useData";
export function DateInput({
  name,
  label,
  defaultValue,
  setValueInParent,
}: {
  name: string;
  label: string;
  defaultValue: string | "";
  setValueInParent?: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const {
    user_profile: { data: user_profile },
  } = useData();
  const employeeId = useParams().employeeId ?? user_profile?.user_id;
  const already_booked = useAlreadyBooked(employeeId);
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name + "_id"}
        className={`relative w-fit text-sm ${
          already_booked ? "text-color9-500" : "text-gray-21"
        }`}
      >
        {label}
        <span className="absolute -right-2 top-0 text-sm">*</span>
      </label>
      <input
        type="date"
        className={`max-w-[10rem] rounded-md border px-2 py-1 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px] placeholder:text-gray-14 focus:outline-none ${
          already_booked
            ? "border-color9-500"
            : "focus:shadow-green border-gray-18"
        }`}
        name={name}
        id={name + "_id"}
        defaultValue={
          defaultValue ? formatYYYYMMDD(new Date(defaultValue)) : ""
        }
        onChange={(e) => {
          setValueInParent && setValueInParent(new Date(e.target.value));
        }}
        required
      />
    </div>
  );
}
