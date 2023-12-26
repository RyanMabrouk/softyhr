import { GetSettings } from "@/api/getSettings";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../Loader/Loader";
import { ChampsType } from "@/types/userInfoTypes.type";
import RowFields from "./components/RowFields";

import { usePathname } from "next/navigation";
import { CgClose } from "react-icons/cg";
import SelectInput from "./components/select/Select";
import { GiRapidshareArrow } from "react-icons/gi";

import { useDrop } from "react-dnd";
import RowFiedlsList from "./components/RowFiedlsList";

function EditFields() {
  const pathname = usePathname();
  const { data, isPending } = useQuery({
    queryKey: ["settings"],
    queryFn:  () => GetSettings(pathname.split("/")[pathname.split("/").length - 1]),
  });

  const AddFields = {
    name: pathname.split("/")[pathname.split("/").length - 1],
    type: "select",
    options: [
      {
        label: "test1",
        value: "test1",
      },
      {
        label: "test2",
        value: "test2",
      },
    ],
  };

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <div className="max-h-5/6 z-50 flex flex-col items-start justify-center rounded-lg ">
          <div className="flex w-full items-center justify-between">
            <h1 className="v text-gray-23 pb-2 text-xl font-normal">
              Edit Fields for All Employees
            </h1>
            <CgClose color={"#999999"} fontSize={"2rem"} cursor="pointer" />
          </div>
          <div className=" rounded bg-white p-8 py-10">
            <div className="mb-2 flex w-full items-center  justify-between border-b border-gray-16 pb-2">
              <h1 className="text-lg font-bold capitalize">
                {pathname.split("/")[pathname.split("/").length - 1]}
              </h1>
              <SelectInput RowField={AddFields} />
            </div>
            <div className="max-h-[42rem] w-full overflow-auto px-2">
              <h1 className="flex items-center  gap-[0.5rem] font-light text-gray-15">
                <GiRapidshareArrow color={"green"} />
                Drag to reorder information on the Personal Tab
              </h1>
              {data?.Champs?.sort((a: any, b: any) => a.rang - b.rang)?.map(
                ({ rang, champ, Icon, Fields }: ChampsType, index: number) => {
                  return <RowFiedlsList data={data} champ={champ} Fields={Fields} />;
                },
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditFields;
