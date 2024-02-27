"use client";
import { Rating, SxProps } from "@mui/material";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import useToast from "@/hooks/useToast";
import updateData from "@/api/updateData";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

interface RatingGenericPropsType {
  DefaultValue: number;
  id: string | number;
  tableName: string;
  size?: "medium" | "large" | "small";
  sx?: SxProps;
}

function RatingGeneric({
  DefaultValue,
  id,
  tableName,
  size,
  sx,
}: RatingGenericPropsType) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [value, setValue] = useState<number | null>(DefaultValue);
  return (
    <Rating
      name="simple-controlled"
      precision={0.5}
      size={size || "medium"}
      value={DefaultValue}
      sx={sx}
      onChange={async (
        event: SyntheticEvent<Element, Event>,
        newValue: number | null,
      ): Promise<void> => {
        const response = await updateData(
          tableName,
          { Ratings: newValue },
          { id },
        );
        /*if (response?.error) toast.error("something went wrong !");
        else setValue(newValue);*/
        queryClient.invalidateQueries({ queryKey: ["Candidates"] });
      }}
    />
  );
}

export default RatingGeneric;
