"use client";
import React, { memo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDrag, useDrop } from "react-dnd";
import { ReorderChamps } from "../../../../helper/ReorderChamps.helper";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { UpdateSettings } from "@/api/Settings/updateSettings";
import { RowType, sectionType } from "@/types/database.tables.types";
import RowFields from "./RowFields";

interface RowFieldsListPropstype {
  champ: string;
  Fields: RowType[] | string[] | null;
  section: string;
  data: sectionType;
  rang: number;
  setSettings: any;
  Settings: any;
}

interface DropItemType {
  rang: number;
  champ: string;
}

function RowFiedlsList({
  champ,
  Settings,
  setSettings,
  section,
  data,
  Fields,
  rang,
}: RowFieldsListPropstype) {
  //-------drag_section-----------
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "champ",
    item: { rang: rang, champ: champ },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  //-------drop_section-----------
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "champ",
    drop: (item: DropItemType, monitor: any) => {
      const dropResult = monitor.internalMonitor.registry.dropTargets;
      /*console.log(
        item.champ,
        " dropped on ",
        dropResult.get(monitor.targetId).spec.data,
      );*/
      if (item?.rang == dropResult.get(monitor.targetId).spec.data?.rang)
        return;
      const NewSettings = ReorderChamps(
        item.rang,
        dropResult.get(monitor.targetId).spec.data.rang,
        data?.Champs,
      );
      setSettings({ Champs: NewSettings });
    },
    data: { rang, champ },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  if (typeof Fields?.[0] == "string") {
    return (
      <div ref={drag}>
        <div
          className="mt-2 flex cursor-move flex-col items-start justify-center gap-[0.5rem] border border-dashed border-gray-15  bg-gray-14  px-4 duration-150 ease-in-out   hover:!border-gray-14"
          key={uuidv4()}
          ref={drop}
        >
          <h1 className="pb-2 pt-2 text-lg font-bold text-gray-21">{champ}</h1>
        </div>
      </div>
    );
  }
  return (
    <div ref={drag}>
      <div
        className="mt-2 flex cursor-move flex-col items-start justify-center gap-[0.5rem] border  border-dashed border-white px-4 pb-4 duration-150 ease-in-out   hover:!border-gray-16"
        key={uuidv4()}
        ref={drop}
      >
        <h1 className="pb-2 pt-2 text-lg font-bold text-gray-21">{champ}</h1>
        {Fields?.sort((a: any, b: any) => a?.rang - b?.rang)?.map(
          ({ Row, rang }: any) => {
            return (
              <RowFields
                champ={champ}
                data={data}
                RowFields={Row}
                rang={rang}
                key={uuidv4()}
                setSettings={setSettings}
              />
            );
          },
        )}
      </div>
    </div>
  );
}

export default memo(RowFiedlsList);
