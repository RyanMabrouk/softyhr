import React from "react";
import { v4 as uuidv4 } from "uuid";
import RowFields from "./RowFields";
import { useDrag, useDrop } from "react-dnd";
import { ChampsType } from "@/types/userInfoTypes.type";

function RowFiedlsList({ champ, Fields, data }: any) {

 

  return (
    <>
      <div
        className="mt-2 flex cursor-move flex-col items-start justify-center gap-[0.3rem] border  border-dashed border-white px-4 pb-4 duration-150 ease-in-out   hover:!border-gray-16"
        key={uuidv4()}
        
      >
        <h1 className="text-gray-21 pb-2 pt-2 text-lg font-bold">{champ}</h1>
        {Fields?.sort((a: any, b: any) => a.rang - b.rang)?.map(
          ({ Row, rang }: any) => {
            return <RowFields champ={champ} data={data}  RowFields={Row} rang={rang} key={uuidv4()} />;
          },
        )}
      </div>
    </>
  );
}

export default RowFiedlsList;
