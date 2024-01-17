import Input from "@/app/(dashboard)/people/components/Fileds/Input/Input";
import { InformationJob_inputs } from "@/constants/Hiring";
import { RowFieldType } from "@/types/database.tables.types";
import React from "react";

interface AdditionnalInputsType {
  RowField: RowFieldType;
}
function AdditionnalInputs() {
  return (
    <>
      {InformationJob_inputs?.map(({ RowField }: any, i) => {
        return <Input key={i} RowField={RowField} />;
      })}
    </>
  );
}

export default AdditionnalInputs;
