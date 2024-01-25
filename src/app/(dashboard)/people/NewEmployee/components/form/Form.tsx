"use client";
import React, { memo, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import { useSettings } from "@/hooks/useSettings";
import { v4 as uuidv4 } from "uuid";
import { NewEmployeeSections, sectionIcon } from "@/constants/userInfo";
import { ChampsType } from "@/types/userInfoTypes.type";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateData from "@/api/updateData";
import useToast from "@/hooks/useToast";
import useData from "@/hooks/useData";
import FiledsChamps from "@/app/(dashboard)/people/components/Fileds/Fileds";
import {
  Profile_Type,
  Settings_type_insert,
  database_profile_type_insert,
} from "@/types/database.tables.types";
import useEmployeeData from "@/hooks/useEmloyeeData";
import formulateData from "../../../components/utils/formulateData";
import ChangesSection from "../../../components/ChangesSection/ChangesSection";
import useCandidate from "@/hooks/useCandidate";
import Education from "./Education";
import { test } from "@/actions/test";
import EmployementStatus from "../EmployementStatus";

export const CreateEmployeeSection: any = {
  Education: Education,
};

function Form() {
  const router = useRouter();
  const { data, isPending } = useSettings("personnal");
  const { data: job, isPending: isLoading } = useSettings("job");
  const { toast } = useToast();
  const [touched, setTouched] = useState<boolean>(true);
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (NewData: Profile_Type) => {
      return await updateData("profiles", NewData, {
        user_id: NewData.user_id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      router.refresh();
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  //const { employee_profile: user } = useCandidate({ employeeId });

  const pathname = usePathname();
  const Router = useRouter();
  const SubmitForm = (formdata: FormData) => {
    //const NewData = formulateData(formdata, user);
    //  mutateAsync(NewData);
    test(formdata);
    setTouched(false);
  };
  return (
    <>
      {isPending || isLoading ? (
        <div className="flex h-[20rem] w-full items-center justify-center ">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-start justify-start pl-8">
          <form className="" action={SubmitForm}>
            {data?.Champs?.sort((a: any, b: any) => a.rang - b.rang)?.map(
              ({ rang, champ, Icon, Fields }: ChampsType, index: number) => {
                console.log(champ);
                if (!NewEmployeeSections.includes(champ.toUpperCase())) return;
                const Component = sectionIcon[Icon.toUpperCase()];
                console.log(champ);
                const ComponentChamps = CreateEmployeeSection[champ] || FiledsChamps;

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
                        champ={champ}
                        // user={user?.data}
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
            <EmployementStatus />
            {touched && (
              <ChangesSection touched={true} setTouched={setTouched} />
            )}
          </form>
        </div>
      )}
    </>
  );
}

export default Form;
