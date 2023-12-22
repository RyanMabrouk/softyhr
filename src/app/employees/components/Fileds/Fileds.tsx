import React, { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "./Input/Input";
import { Field } from "@/constants/userInfoLabel";

function Fileds({ FieldsArray, index }: any) {
  return (
    <>
      {FieldsArray?.sort((a: any, b: any) => a.rang - b.rang)?.map(
        ({ Row }: any) => {
          console.log(Row);
          return (
            <div
              className="hustify-center flex items-center gap-[1rem]"
              key={uuidv4()}
            >
              {Row?.map((RowField: any) => {
                console.log(RowField);
                const Component = Field[RowField?.fieldType.toUpperCase()];
                return <Component RowField={RowField} />;
              })}
            </div>
          );
        },
      )}
    </>
  );
}

export default Fileds;
