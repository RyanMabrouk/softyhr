"use client";
import { useSettings } from "@/hooks/useSettings";
import React, { useState } from "react";
import { ChampsType, RowFieldType } from "@/types/userInfoTypes.type";

import { usePathname, useRouter } from "next/navigation";
import { CgClose } from "react-icons/cg";
import SelectInput from "./components/select/Select";
import { GiRapidshareArrow } from "react-icons/gi";

import RowFiedlsList from "./components/RowFiedlsList";
import Loader from "@/app/(dashboard)/people/components/Loader/Loader";

function EditFields() {
  const pathname = usePathname();
  const Router = useRouter();
  const settings_type = pathname.split("/")[pathname.split("/").length - 1];
  const { data, isPending } = useSettings(settings_type);
  const AddFields: RowFieldType = {
    placeHolder: "",
    name: settings_type,
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
    required: false,
  };

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <div className="max-h-5/6 z-50 flex flex-col items-start justify-center rounded-lg ">
          <div className="flex w-full items-center justify-between">
            <h1 className=" pb-2 text-xl font-normal text-color-primary-4">
              Edit Fields for All Employees
            </h1>
            <div onClick={() => Router.push(pathname)}>
              <CgClose
                color={"#999999"}
                fontSize={"2rem"}
                cursor="pointer"
              />
            </div>
          </div>
          <div className=" rounded bg-white p-8 py-10 shadow-md">
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
                  return (
                    <RowFiedlsList
                      key={champ}
                      section={settings_type}
                      rang={rang}
                      data={data}
                      champ={champ}
                      Fields={Fields}
                    />
                  );
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
