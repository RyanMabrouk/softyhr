import { UpdateSettings } from "@/api/updateSettings";
import { ReorderFields } from "@/app/_PopUp/helper/ReorderFields";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useDrag, useDrop } from "react-dnd";

function RowFields({ RowFields, rang, champ, data }: any) {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async ({ RowStart, RowEnd, champ }: any) => {
      console.log(RowStart, RowEnd);
      const NewSettings = ReorderFields(RowStart, RowEnd, data, champ);
      return await UpdateSettings(NewSettings).then(() => {
        console.log("updated successfuly !!!");
      });
    },
    onSuccess: (data: any) => {
      console.log(data);
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
      mutateAsync({
        RowStart: item.Row,
        champ: item.champ,
        RowEnd: dropResult.get(monitor.targetId).spec.Row,
      });
    },
    Row: rang,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="w-full">
      <div
        className="flex h-[2.5rem] w-full cursor-move  items-center justify-start border border-dashed border-gray-15 bg-gray-14 px-4 duration-150 ease-in-out hover:bg-gray-16"
        ref={drag}
      >
        {RowFields?.map(({ name }: any, index: number) => {
          return (
            <h1 className="text-gray-23" key={name + index}>
              {name + (index + 1 < RowFields.length ? " & " : "")}
            </h1>
          );
        })}
      </div>
    </div>
  );
}

export default RowFields;
