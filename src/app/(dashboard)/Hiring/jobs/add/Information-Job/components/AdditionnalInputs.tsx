import { InformationJob_inputs } from "@/constants/Hiring";
import { Field } from "@/constants/userInfo";
import { v4 as uuidv4 } from "uuid";
import { RowFieldType } from "@/types/database.tables.types";
import React, { memo, useState } from "react";
import LocationCard from "./LocationCard";
import { FaBuilding } from "react-icons/fa6";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { RiComputerLine } from "react-icons/ri";
import { IconType } from "react-icons";
import SelectInput from "@/app/(dashboard)/people/components/Fileds/select/Select";

interface AdditionnalInputsType {
  RowField: RowFieldType;
}

export interface Job_locationElementType {
  label: string;
  Icon: IconType;
  show: boolean;
}
interface AdditionnalInputsTypeProps {
  LocationValue?: string | undefined;
  Job_locationValue?: string | undefined;
}

function AdditionnalInputs({
  LocationValue,
  Job_locationValue,
}: AdditionnalInputsTypeProps) {
  const Job_location: Job_locationElementType[] = [
    { label: "in office", show: true, Icon: FaBuilding },
    { label: "hybrid", show: true, Icon: BiSolidBuildingHouse },
    { label: "remote", show: false, Icon: RiComputerLine },
  ];

  const SelectLocation = {
    options: ["London", "USA", "Tunisian", "Canada"],
    name: "Location",
    required: true,
  };

  const [Location, setLocation] = useState<string>(Job_locationValue || "");
  const [Show, setShow] = useState<boolean>(
    LocationValue && Job_locationValue != "remote" ? true : false,
  );
  console.log(LocationValue, Job_locationValue);
  return (
    <div className="flex flex-col items-start justify-center gap-[1rem]">
      <div>
        <h1 className="">Job Location</h1>
        <div className="flex items-center justify-start gap-[1rem]">
          {Job_location?.map(
            ({ label, show, Icon }: Job_locationElementType, index: number) => {
              return (
                <LocationCard
                  key={index}
                  setShow={setShow}
                  setLocation={setLocation}
                  label={label}
                  show={show}
                  selected={label == Location}
                  Icon={Icon}
                />
              );
            },
          )}
          <input
            readOnly
            autoFocus
            hidden
            name={"Job_location"}
            value={Location}
          />
        </div>
      </div>
      {Show && (
        <SelectInput defaultValue={LocationValue} RowField={SelectLocation} />
      )}
    </div>
  );
}

export default memo(AdditionnalInputs);
