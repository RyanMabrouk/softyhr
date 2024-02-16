import { insert_RowFieldType } from "@/types/userInfoTypes.type";
import React, { ReactNode, memo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Field } from "@/constants/userInfo";
import { FaTrash } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { Profile_Type, RowType } from "@/types/database.tables.types";
import { EducationType } from "../../../components/UserSection";
interface EducationPropsType {
  FieldsArray: RowType[];
  setTouched: (arg: boolean) => void;
  user: Profile_Type;
  champ: string;
  params: { employeeId: string };
  setData: React.Dispatch<React.SetStateAction<EducationType[]>>;
  DATA: Object[];
  employeeId: string;
}
function Education({
  FieldsArray,
  setTouched,
  champ,
}: EducationPropsType): ReactNode {
  const [data, setdata] = useState<EducationType[]>([]);
  return (
    <div className="flex flex-col items-start ">
      {data?.map((data: EducationType) => {
        {
          return (
            <div className="flex justify-center gap-[1rem] py-2" key={data?.id}>
              <div className="flex flex-col items-start gap-[0.5rem] border-b border-gray-5 py-6">
                {FieldsArray?.map(({ Row }: RowType, index: number) => {
                  return (
                    <div
                      className="flex items-end justify-center gap-[2rem]"
                      key={index}
                    >
                      {Row?.map((RowField: insert_RowFieldType) => {
                        const Component = Field[RowField?.type.toUpperCase()];
                        return (
                          <Component
                            champ={champ}
                            defaultValue={data[RowField?.name]}
                            setTouched={setTouched}
                            key={uuidv4()}
                            RowField={RowField}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <div
                key={data?.id}
                onClick={() => {
                  setdata((old: EducationType[]) =>
                    old?.filter(
                      (education: EducationType) => education.id != data?.id,
                    ),
                  );
                }}
                className="hover:bg-gray flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center duration-150 ease-in-out hover:border hover:border-gray-27"
              >
                <FaTrash cursor={"pointer"} fill={"gray"} />
              </div>
            </div>
          );
        }
      })}
      <div
        className="flex cursor-pointer items-center justify-center gap-[0.5rem] pt-4 text-color5-600"
        onClick={() =>
          setdata((old: EducationType[]) => [
            ...(old || []),
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
