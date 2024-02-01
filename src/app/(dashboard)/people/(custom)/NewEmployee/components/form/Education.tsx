import { RowFieldType } from "@/types/userInfoTypes.type";
import React, { ReactNode, memo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Field } from "@/constants/userInfo";
import { FaTrash } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateData from "@/api/updateData";
import useToast from "@/hooks/useToast";
import { usePathname, useRouter } from "next/navigation";
import useData from "@/hooks/useData";
import useEmployeeData from "@/hooks/useEmloyeeData";
interface EducationPropsType {
  FieldsArray: RowFieldType[];
  setTouched: (arg: boolean) => void;
  user: any;
  champ: string;
  params: { employeeId: string };
  setData: (arg: any) => any;
  DATA: Object[];
  employeeId: string;
}

function Education({
  FieldsArray,
  setTouched,
  champ,
}: EducationPropsType): ReactNode {
  const router = useRouter();
  const pathname = usePathname();
  const [data, setdata] = useState<any>([]);
  return (
    <div className="flex flex-col items-start ">
      {data?.map((data: any) => {
        {
          return (
            <div className="flex justify-center gap-[1rem] py-2" key={data?.id}>
              <div className="flex flex-col items-start gap-[0.5rem] border-b border-gray-5 py-6">
                {FieldsArray?.map(({ Row }: any, index: number) => {
                  return (
                    <div
                      className="flex items-end justify-center gap-[2rem]"
                      key={index}
                    >
                      {Row?.map((RowField: any) => {
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
                  setdata((old: any) =>
                    old?.filter((education: any) => education.id != data?.id),
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
        onClick={()=>setdata((old: any) => [
          ...old || [],
          {
            id: uuidv4(),
            GPA: "",
            Degree: "",
            "End Date": "",
            "Start Date": "",
            "College/Institution": "",
            "Major/Specialization": "",
          },
        ])}
      >
        <IoMdAddCircleOutline fill={"#095c8f"} />
        Add Education
      </div>
    </div>
  );
}

export default memo(Education);
