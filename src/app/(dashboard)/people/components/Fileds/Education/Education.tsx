
import React, { ReactNode, memo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IoMdAddCircleOutline } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import useEmployeeData from "@/hooks/useEmloyeeData";
import { RowType } from "@/types/database.tables.types";
import { EducationType } from "../../UserSection";
import EducationList from "./EducationList";
interface EducationPropsType {
  FieldsArray: RowType[];
  setTouched: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  user: any;
  champ: string;
  params: { employeeId: string };
  setData: React.Dispatch<React.SetStateAction<EducationType[]>>;
  DATA: EducationType[];
  employeeId: string;
}

function Education({
  FieldsArray,
  setTouched,
  champ,
  DATA,
  setData,
  employeeId,
}: EducationPropsType): ReactNode {
  const { employee_profile: Data } = useEmployeeData({ employeeId });
  

  return (
    <div className="flex flex-col items-start ">
      {[...(Data?.data?.[champ] || []), ...(DATA || [])]?.map(
        (data: EducationType) => {
            return (
              <EducationList
                key={uuidv4()}
                FieldsArray={FieldsArray}
                champ={champ}
                data={data}
                Data={Data}
                setData={setData}
                setTouched={setTouched}
              />
            );
        },
      )}
      <div
        className="flex cursor-pointer items-center justify-center gap-[0.5rem] pt-4 text-color5-600"
        onClick={() =>
          setData([
            ...DATA,
            {
              id: uuidv4(),
              GPA: "",
              Degree: "",
              "End Date": "",
              "Start Date": "",
              "College/Institution": "",
              "Major/Specialization": "",
            },
          ])
        }
      >
        <IoMdAddCircleOutline fill={"#095c8f"} />
        Add Education
      </div>
    </div>
  );
}

export default memo(Education);
