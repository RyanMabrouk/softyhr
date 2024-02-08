"use client";
import { useSettings } from "@/hooks/Settings/useSettings";
import React, { useState } from "react";
import { RowFieldType } from "@/types/userInfoTypes.type";
import { usePathname, useRouter } from "next/navigation";
import SelectInput from "./components/select/Select";
import { GiRapidshareArrow } from "react-icons/gi";

import RowFiedlsList from "./components/RowFiedlsList";
import Loader from "@/app/(dashboard)/people/components/Loader/Loader";
import { champ_type, sectionType } from "@/types/database.tables.types";
import { UpdateSettings } from "@/api/Settings/updateSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PopUpSkeleton from "../../../PopUpSkeleton";

function EditFields() {
  const pathname = usePathname();
  const settings_type = pathname.split("/")[pathname.split("/").length - 1];
  const { data, isPending } = useSettings(settings_type);
  const Router = useRouter();
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
  const queryClient = useQueryClient();
  //--------update_section_rang------

  const {
    mutateAsync,
    isPending: isLoading,
    isPaused,
  } = useMutation({
    mutationFn: async (NewSettings: sectionType) => {
      return await UpdateSettings({ [settings_type]: NewSettings }).then(() => {
        console.log("updated successfuly !!!");
      });
    },
    onSuccess: () => {
      Router.push(pathname);
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: () => {
      Router.push(pathname);
    },
  });
  const [Settings, setSettings] = useState<any>(data);
  console.log(Settings);
  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <PopUpSkeleton
          className="px-8 py-5"
          title="Edit Fields for All Employees"
        >
          <div className="rounded-sm bg-white">
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
                    Settings={Settings}
                    setSettings={setSettings}
                    champ={champ}
                    Fields={Fields}
                  />
                );
              })}
            </div>
            <button
              onClick={() => {
                mutateAsync(Settings);
              }}
              className="text-bold mt-4 rounded bg-color-primary-8 p-2 px-5 text-white duration-300 ease-in-out hover:!bg-color-primary-3 "
            >
              Done
            </button>
          </div>
        </PopUpSkeleton>
      )}
    </>
  );
}

export default EditFields;
