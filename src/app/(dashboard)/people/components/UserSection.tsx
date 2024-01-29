"use client";
import React, { memo, useState } from "react";
import FiledsChamps from "../components/Fileds/Fileds";
import { FaAddressCard } from "react-icons/fa";
import ChangesSection from "../components/ChangesSection/ChangesSection";
import { useSettings } from "@/hooks/useSettings";
import { v4 as uuidv4 } from "uuid";
import { sectionIcon } from "@/constants/userInfo";
import { ChampsType } from "@/types/userInfoTypes.type";
import { usePathname, useRouter } from "next/navigation";
import { Section } from "@/constants/userInfoSections";
import formulateData from "../components/utils/formulateData";
import { useMutation, useQueryClient } from "@tanstack/react-query";  
import updateData from "@/api/updateData";
import useToast from "@/hooks/useToast";
import { Profile_Type } from "@/types/database.tables.types";
import useEmployeeData from "@/hooks/useEmloyeeData";

interface UserSection {
  section: string;
  employeeId: string;
}

function UserSection({ section, employeeId }: UserSection) {
  const router = useRouter();
  const { data, isPending } = useSettings(section);
  const { toast } = useToast();
  const [touched, setTouched] = useState<boolean>(false);
  const [Data, setData] = useState<any>([]);
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (NewData: Profile_Type) => {
      return await updateData("profiles", NewData, {
        user_id: NewData.user_id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      setData([]);
      router.refresh();
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  const { employee_profile: user } = useEmployeeData({ employeeId });

  const pathname = usePathname();
  const Router = useRouter();
  const SubmitForm = (formdata: FormData) => {
    const NewData = formulateData(formdata, user);
    mutateAsync(NewData);
    setTouched(false);
  };
  return (
    <>
      {isPending || user?.isPending ? (
        <div className="flex h-[20rem] w-full items-center justify-center ">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-start justify-start pb-10 pl-8">
          <div className="mt-8 flex  w-full items-center justify-between gap-[1rem] border-b border-gray-18 pb-4 text-lg font-normal ">
            <h1 className="flex items-center justify-center  gap-[1rem] text-2xl font-medium text-color-primary-7 ">
              <FaAddressCard fill="green" />
              {section}
            </h1>
            <h1
              className="cursor-pointer text-gray-10 hover:underline"
              onClick={() => Router.push(pathname + "?popup=edit_field")}
            >
              Edit Fields
            </h1>
          </div>
          <form className="Form-Profile" action={SubmitForm}>
            {data?.Champs?.sort((a: any, b: any) => a.rang - b.rang)?.map(
              ({ rang, champ, Icon, Fields }: ChampsType, index: number) => {
                const Component = sectionIcon[Icon.toUpperCase()];
                const ComponentChamps = Section[champ] || FiledsChamps;
                return (
                  <div
                    className="mt-4 flex w-full flex-col place-items-start justify-center gap-[2rem] border-b border-gray-18 pb-8"
                    key={index}
                  >
                    <h1 className="font-lg flex items-center justify-center gap-[0.5rem] text-xl  text-black">
                      <Component fill="green" />
                      {champ}
                    </h1>
                    <div className="flex flex-col items-start justify-center gap-[1rem]">
                      <ComponentChamps
                        employeeId={employeeId}
                        champ={champ}
                        user={user?.data}
                        setData={setData}
                        DATA={Data}
                        setTouched={setTouched}
                        key={rang || uuidv4()}
                        FieldsArray={Fields?.sort(
                          (a: any, b: any) => a?.rang - b?.rang,
                        )}
                      />
                    </div>
                  </div>
                );
              },
            )}
            {touched && (
              <ChangesSection touched={touched} setTouched={setTouched} />
            )}
          </form>
        </div>
      )}
    </>
  );
}

export default UserSection;
