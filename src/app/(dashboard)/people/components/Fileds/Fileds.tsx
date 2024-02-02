import React, { ReactNode, memo } from "react";
import { v4 as uuidv4 } from "uuid";
import { Field } from "@/constants/userInfo";
import { RowFieldType, insert_RowFieldType } from "@/types/userInfoTypes.type";
import Input from "./Input/Input";
import { Profile_Type, RowType } from "@/types/database.tables.types";
interface FiledsChampsPropsType {
  FieldsArray: RowType[];
  setTouched?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  user?: { [key:string]: any | undefined} ;
  champ?: string;
}
function FiledsChamps({
  FieldsArray,
  setTouched,
  user,
  champ,
}: FiledsChampsPropsType): ReactNode {
  console.log(FieldsArray);
  return (
    <>
      {FieldsArray?.sort((a: RowType, b: RowType) => a.rang - b.rang)?.map(
        ({ Row }: RowType) => {
          return (
            <div
              className="flex items-end justify-center gap-[1rem]"
              key={uuidv4()}
            >
              {Row?.map((RowField: insert_RowFieldType) => {
                const Component =
                  Field[RowField.type.toUpperCase() || "INPUT"] || Input;
                return (
                  <Component
                    champ={champ || ""}
                    defaultValue={user?.[champ || ""]?.[RowField?.name]}
                    user={user}
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
