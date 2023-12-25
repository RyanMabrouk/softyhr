import React, { ReactNode, memo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "./Input/Input";
import { Field } from "@/constants/userInfo";
import { RowFieldType } from "@/app/types/userInfoTypes.type";

interface FiledsChampsPropsType {
  FieldsArray:RowFieldType[];
  setTouched:(arg: boolean)=>void;
}

function FiledsChamps({
  FieldsArray,
  setTouched,
}: FiledsChampsPropsType): ReactNode {
  //const [touched, setTouched] = useState<boolean>(false);
  return (
    <>
      {FieldsArray?.sort((a: any, b: any) => a.rang - b.rang)?.map(
        ({ Row }: any) => {
          return (
            <div
              className="flex items-end justify-center gap-[1rem]"
              key={uuidv4()}
            >
              {Row?.map((RowField: any) => {
                const Component = Field[RowField?.type.toUpperCase()];
                return (
                  <Component
                    setTouched={setTouched}
                    key={uuidv4()}
                    // setTouched={setTouched}
                    RowField={RowField}
                  />
                );
              })}
            </div>
          );
        },
      )}
      {}
    </>
  );
}

export default FiledsChamps;
