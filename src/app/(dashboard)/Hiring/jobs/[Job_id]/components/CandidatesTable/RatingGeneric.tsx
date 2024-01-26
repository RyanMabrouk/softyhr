"use client"
import { Rating } from "@mui/material";
import React, { useState } from "react";
import useToast from "@/hooks/useToast";
import updateData from "@/api/updateData";

interface RatingGenericPropsType {
  DefaultValue: number;
  id: string | number;
  tableName: string;
}

function RatingGeneric({
  DefaultValue,
  id,
  tableName,
}: RatingGenericPropsType) {
  const { toast } = useToast();
  const [value, setValue] = useState<number>(DefaultValue);
  return (
    <Rating
      name="simple-controlled"
      precision={0.5}
      value={value}
      onChange={async (event, newValue: any) => {
        const response = await updateData(
          tableName,
          { Ratings: newValue },
          { id },
        );
        if (response?.error) toast.error("something went wrong !");
        else setValue(newValue);
      }}
    />
  );
}

export default RatingGeneric;
