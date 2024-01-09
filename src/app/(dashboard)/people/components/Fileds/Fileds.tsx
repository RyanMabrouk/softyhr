import React, { ReactNode, memo } from "react";
import { v4 as uuidv4 } from "uuid";
import { Field } from "@/constants/userInfo";
import { RowFieldType } from "@/types/userInfoTypes.type";
interface FiledsChampsPropsType {
  FieldsArray: RowFieldType[];
  setTouched?: ((arg: boolean) => void) | undefined;
  user?: any | undefined;
  champ: string;
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
                    champ={champ}
                    defaultValue={user?.[champ]?.[RowField?.name] || ""}
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
