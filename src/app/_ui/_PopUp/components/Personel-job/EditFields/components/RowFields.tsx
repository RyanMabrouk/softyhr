"use client";
import { UpdateSettings } from "@/api/updateSettings";
import { ReorderFields } from "@/app/_ui/_PopUp/helper/ReorderFields.helper";
import { sectionType } from "@/types/database.tables.types";
import { RowFieldType } from "@/types/userInfoTypes.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

interface RowFieldsPropsType {
  RowFields: RowFieldType[];
  rang: number;
  champ: string;
  setSettings: any;
  data: sectionType;
}

function RowFields({
  RowFields,
  setSettings,
  rang,
  champ,
  data,
}: RowFieldsPropsType) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isPaused } = useMutation({
    mutationFn: async ({ RowStart, RowEnd, champ }: any) => {
      let NewSettings = ReorderFields(RowStart, RowEnd, data, champ);
      return await UpdateSettings(NewSettings).then(() => {});
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: champ,
    item: { Row: rang, champ: champ },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [{ isOver }, drop] = useDrop(() => ({
    accept: champ,
    drop: (item: any, monitor: any) => {
      const dropResult = monitor.internalMonitor.registry.dropTargets;
      console.log(
        ReorderFields(
          item.Row,
          dropResult.get(monitor.targetId).spec.Row,
          data,
          champ,
        ),
      );
      setSettings(
        {...ReorderFields(
          item.Row,
          dropResult.get(monitor.targetId).spec.Row,
          data,
          champ,
        )}
      );
      /*mutateAsync({
        RowStart: item.Row,
        champ: item.champ,
        RowEnd: dropResult.get(monitor.targetId).spec.Row,
      });*/

      // queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    Row: rang,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  return (
    <div ref={drop} className="w-full">
      <div
        className="flex h-[2rem] w-full cursor-move items-center  justify-start border border-dashed border-gray-18 bg-gray-14 px-4 py-4 pr-12 duration-150 ease-in-out hover:bg-gray-16"
        ref={drag}
      >
        {RowFields?.map((Fields: any, index: number) => {
          return (
            <h1 className="text-gray-23" key={Fields?.name}>
              {Fields?.name + (index + 1 < RowFields.length ? " , " : "") ||
                Fields ||
                "---"}
            </h1>
          );
        })}
      </div>
    </div>
  );
}

export default RowFields;
