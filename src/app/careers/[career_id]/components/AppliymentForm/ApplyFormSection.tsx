import React, { ReactNode, memo } from "react";
import { v4 as uuidv4 } from "uuid";
import { Field } from "@/constants/userInfo";
import { RowFieldType } from "@/types/userInfoTypes.type";
import Input from "@/app/(dashboard)/people/components/Fileds/Input/Input";

interface FiledsChampsPropsType {
  FieldsArray: RowFieldType[];
  setTouched?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  user?: any | undefined;
  champ?: string;
  FieldsCheck: any;
}
function ApplyFormSection({
  FieldsArray,
  setTouched,
  user,
  champ,
  FieldsCheck,
}: FiledsChampsPropsType): ReactNode {
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
                if (FieldsCheck?.[RowField?.name]?.AddToAppliement == false)
                  return;
                if (FieldsCheck?.[RowField?.name]) {
                  RowField = {
                    ...RowField,
                    ...FieldsCheck?.[RowField?.name],
                  };
                }
                const Component =
                  Field[(RowField?.type || "input").toUpperCase()] || Input;
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
export default memo(ApplyFormSection);
