"use client";
import { useSettings } from "@/hooks/useSettings";
import React from "react";
import { ChampsType, RowFieldType } from "@/types/userInfoTypes.type";
import { usePathname, useRouter } from "next/navigation";
import SelectInput from "./components/select/Select";
import { GiRapidshareArrow } from "react-icons/gi";

import RowFiedlsList from "./components/RowFiedlsList";
import Loader from "@/app/(dashboard)/people/components/Loader/Loader";
import { champ_type } from "@/types/database.tables.types";
import PopUpSkeleton from "../../PopUpSkeleton";

function EditFields() {
  const pathname = usePathname();
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
        <PopUpSkeleton
          className="p-8 py-10"
          title="Edit Fields for All Employees"
        >
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
            {data?.Champs?.sort(
              (a: champ_type, b: champ_type) => a.rang - b.rang,
            )?.map(({ rang, champ, Icon, Fields }: champ_type) => {
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
            })}
          </div>
        </PopUpSkeleton>
      )}
    </>
  );
}

export default EditFields;
