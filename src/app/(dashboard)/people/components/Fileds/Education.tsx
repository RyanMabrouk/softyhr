import Input from "./Input/Input";
import { RowFieldType } from "@/types/userInfoTypes.type";
import React, { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { Field } from "@/constants/userInfo";
import { FaTrash } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";

interface EducationPropsType {
  FieldsArray: RowFieldType[];
  setTouched: (arg: boolean) => void;
  user: any;
  champ: string;
}

function Education({
  FieldsArray,
  setTouched,
  user,
  champ,
}: EducationPropsType): ReactNode {
  console.log(user[champ], FieldsArray);
  return (
    <div className="flex flex-col items-start ">
      {user[champ]?.map((data: any) => {
        {
          return (
            <div className="flex justify-center gap-[1rem] py-2">
              <div className="flex flex-col items-start gap-[0.5rem] border-b border-gray-5 py-6">
                {FieldsArray?.map(({ Row }: any) => {
                  return (
                    <div
                      className="flex items-end justify-center gap-[2rem]"
                      key={uuidv4()}
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
              <FaTrash cursor={"pointer"} fill={"gray"} />
            </div>
          );
        }
      })}
      <div className="flex cursor-pointer items-center justify-center gap-[0.5rem] pt-4 text-color5-600">
        <IoMdAddCircleOutline fill={"#095c8f"} />
        Add Education
      </div>
    </div>
  );
}

export default Education;
