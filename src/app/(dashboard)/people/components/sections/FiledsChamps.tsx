import React, { ReactNode, memo } from "react";
import { v4 as uuidv4 } from "uuid";
import { Field } from "@/constants/userInfo";
import { RowFieldType, RowType, insert_RowFieldType } from "@/types/userInfoTypes.type";
import Input from "../Fileds/Input/Input";
interface FiledsChampsPropsType {
  FieldsArray: RowType[];
  setTouched?: React.Dispatch<React.SetStateAction<boolean>>;
  user?: { [key:string]: any | undefined} ;
  champ?: string;
}
function FiledsChamps({
  FieldsArray,
  setTouched,
  user,
  champ,
}: FiledsChampsPropsType): ReactNode {
  return (
    <>
      {FieldsArray?.sort((a: RowType, b: RowType) => a.rang - b.rang)?.map(
        ({ Row }: RowType) => {
          return (
            <div
              className="flex items-end justify-center gap-[1rem]"
              key={uuidv4()}
            >
              {Row?.map((RowField: RowFieldType) => {
                const type = RowField?.type || "input"
                const Component = Field[type.toUpperCase()] || Input;
                return (
                  <Component
                    champ={champ || ""}
                    defaultValue={user?.[champ || ""]?.[RowField?.name]}
                    user={user?.[champ || ""]}
                    setTouched={setTouched}
                    key={uuidv4()}
                    RowField={RowField}
                  />
                );
              })}
            </div>
          );
        },
      )}
    </>
  );
}

export default memo(FiledsChamps);
