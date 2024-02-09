import React, { memo } from "react";
import "dayjs/locale/zh-cn";
import { RowFieldType } from "@/types/database.tables.types";
import { CalendarGeneric } from "@/app/_ui/CalenderGeneric";

interface DateInputPropsType {
  RowField: RowFieldType;
  setTouched?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  defaultValue?: string | undefined;
}
function DateInput({
  RowField,
  setTouched,
  defaultValue = "",
}: DateInputPropsType) {
  return (
    <CalendarGeneric
      name={RowField?.name}
      label={RowField?.name}
      setAction={() => setTouched && setTouched(true)}
      defaultValue={defaultValue != "" ? new Date(defaultValue) : undefined}
    />
  );
}

export default memo(DateInput);
