"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import RowFields from "./RowFields";
import { useDrag, useDrop } from "react-dnd";
import { ReorderChamps } from "../../../helper/ReorderChamps";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { UpdateSettings } from "@/api/updateSettings";

function RowFiedlsList({ champ, Fields, data, rang }: any) {
  const queryClient = useQueryClient();
  const [Data, setData] = useState(Fields);
  const { mutateAsync, isPending, isPaused } = useMutation({
    mutationFn: async (NewSettings: any) => {
      return await UpdateSettings(NewSettings).then(() => {
        console.log("updated successfuly !!!");
      });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "champ",
    item: { rang: rang, champ: champ },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "champ",
    drop: (item: any, monitor: any) => {
      const dropResult = monitor.internalMonitor.registry.dropTargets;
      console.log(
        item.champ,
        " dropped on ",
        dropResult.get(monitor.targetId).spec.data,
      );
      const NewSettings = ReorderChamps(
        item.rang,
        dropResult.get(monitor.targetId).spec.data.rang,
        data?.Champs,
      );
      mutateAsync({ Champs: NewSettings });
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    data: { rang, champ },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  console.log(data);
  return (
    <div ref={drag}>
      <div
        className="mt-2 flex cursor-move flex-col items-start justify-center gap-[0.5rem] border  border-dashed border-white px-4 pb-4 duration-150 ease-in-out   hover:!border-gray-16"
        key={uuidv4()}
        ref={drop}
      >
        <h1 className="pb-2 pt-2 text-lg font-bold text-gray-21">{champ}</h1>
        {Fields?.sort((a: any, b: any) => a.rang - b.rang)?.map(
          ({ Row, rang }: any) => {
            return (
              !isDragging && (
                <RowFields
                  champ={champ}
                  data={data}
                  RowFields={Row}
                  rang={rang}
                  key={uuidv4()}
                />
              )
            );
          },
        )}
      </div>
    </div>
  );
}

export default RowFiedlsList;
