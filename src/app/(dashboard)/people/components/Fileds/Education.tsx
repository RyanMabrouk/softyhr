import {
  ChampsType,
  RowFieldType,
  insert_RowFieldType,
} from "@/types/userInfoTypes.type";
import React, { ReactNode, SetStateAction, memo, useState } from "react";
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
import { EducationType } from "../UserSection";
import { RowType } from "@/types/database.tables.types";
import Input from "./Input/Input";
interface EducationPropsType {
  FieldsArray: RowType[];
  setTouched: (arg: boolean) => void;
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
  const router = useRouter();
  const pathname = usePathname();
  const Show_DeleteEducation = (id: string) => {
    router.push(pathname + `?popup=delete_education&id=${id}`);
  };
  return (
    <div className="flex flex-col items-start ">
      {[...(Data?.data?.[champ] || []), ...(DATA || [])]?.map(
        (data: EducationType) => {
          {
            return (
              <div
                className="flex justify-center gap-[1rem] py-2"
                key={data?.id}
              >
                <div className="flex flex-col items-start gap-[0.5rem] border-b border-gray-5 py-6">
                  {FieldsArray?.map(({ Row }: RowType) => {
                    return (
                      <div
                        className="flex items-end justify-center gap-[2rem]"
                        key={uuidv4()}
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
                    if (
                      Data?.data?.[champ]?.filter(
                        (education: EducationType) => education.id == data?.id,
                      ).length === 0
                    )
                      setData((old: EducationType[]) =>
                        old?.filter(
                          (education: EducationType) =>
                            education.id != data?.id,
                        ),
                      );
                    else {
                      Show_DeleteEducation(data?.id);
                    }
                  }}
                  className="hover:bg-gray flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center duration-150 ease-in-out hover:border hover:border-gray-27"
                >
                  <FaTrash cursor={"pointer"} fill={"gray"} />
                </div>
              </div>
            );
          }
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
