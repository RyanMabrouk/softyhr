"use client";
import { Job_locationElementType } from "@/app/(dashboard)/Hiring/jobs/add/Information-Job/components/AdditionnalInputs";
import LocationCard from "@/app/(dashboard)/Hiring/jobs/add/Information-Job/components/LocationCard";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import useRoles from "@/hooks/Roles/useRoles";
import React, { useState } from "react";
import { ImBlocked } from "react-icons/im";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { TbLockCog } from "react-icons/tb";

export default function AccessSection() {
  /*const Access: Job_locationElementType[] = [
    {
      label: "Allow Access to SoftyHR",
      show: true,
      description:
        "They will be able to login to SoftyHR using the access level you choose.",
      Icon: IoCheckmarkDoneCircle,
    },
    {
      label: "No Access",
      show: true,
      description:
        "They won't have access and will not be able to login to SoftyHR.",
      Icon: ImBlocked,
    },
  ];
  const [Location, setLocation] = useState<string>(Access[0]?.label || "");*/
  const {
    roles: { data: roles },
  } = useRoles();
  return (
    <div className="mt-4 flex w-full flex-col place-items-start justify-center gap-[2rem] border-b border-gray-18 pb-28">
      <h1 className="font-lg flex items-center justify-center gap-[0.5rem] text-xl  text-black">
        <TbLockCog className="text-fabric-700" />
        Self-service access
      </h1>
      <div className="flex items-center justify-start gap-[1rem]">
        {/*Access?.map(
          (
            { label, show, Icon, description }: Job_locationElementType,
            index: number,
          ) => {
            return (
              <LocationCard
                key={index}
                description={description}
                setLocation={setLocation}
                label={label}
                show={show || false}
                selected={label == Location}
                Icon={Icon}
              />
            );
          },
        )*/}
        {
          <SelectGeneric
            name="role_id"
            inputLabel="- Select Role -"
            required
            capitalize
            className="capitalize"
            options={roles?.map((e) => ({ label: e.name, value: e.id }))}
          />
        }
      </div>
      <h1 className={`text-sm font-medium text-color5-500`}>
        To enable access, this employee needs to be active and have a valid work
        or home email.
      </h1>
    </div>
  );
}
