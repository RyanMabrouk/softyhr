import React, { memo, useState } from "react";
import { EducationType } from "../../UserSection";
import { RowType } from "@/types/database.tables.types";
import { insert_RowFieldType } from "@/types/userInfoTypes.type";
import { v4 as uuidv4 } from "uuid";
import { Field } from "@/constants/userInfo";
import { FaTrash } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

interface EducationListPropsType {
  setTouched?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  FieldsArray: RowType[];
  setData: React.Dispatch<React.SetStateAction<EducationType[]>>;
  champ: string;
  data: EducationType;
  Data: any;
}
function EducationList({
  FieldsArray,
  champ,
  setTouched,
  setData,
  data,
  Data,
}: EducationListPropsType) {
  const pathname = usePathname();
 
  const router = useRouter();
  const Show_DeleteEducation = (id: string) => {
    router.push(pathname + `?popup=delete_education&id=${id}`);
  };
  
  return (
    <div className="flex justify-center gap-[1rem] py-2" key={data?.id}>
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
                 /*   setSelectedKeys={
                      RowField?.name == "Start Date"
                        ? setstartDate
                        : RowField?.name == "End Date" ?
                        setEndDate
                        : undefined
                    }*/
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
                (education: EducationType) => education.id != data?.id,
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

export default memo(EducationList);
