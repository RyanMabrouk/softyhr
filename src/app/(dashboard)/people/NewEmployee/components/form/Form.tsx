"use client";
import React, { useState } from "react";
import { useSettings } from "@/hooks/Settings/useSettings";
import { v4 as uuidv4 } from "uuid";
import { NewEmployeeSections, sectionIcon } from "@/constants/userInfo";
import { ChampsType } from "@/types/userInfoTypes.type";
import { useSearchParams } from "next/navigation";
import useToast from "@/hooks/useToast";
import FiledsChamps from "@/app/(dashboard)/people/components/Fileds/Fileds";
import ChangesSection from "../../../components/ChangesSection/ChangesSection";
import Education from "./Education";
import EmployementStatus from "../EmployementStatus";
import AccessSection from "../AccessSection";
import formulateData from "../../../components/utils/formulateData";
import { CreateNewEmployee } from "@/actions/hiring/CreateNewEmployee";
import useCandidate from "@/hooks/Hiring/useCandidate";

export const CreateEmployeeSection: any = {
  Education: Education,
};

function Form() {
  const { data, isPending } = useSettings("personnal");
  const { toast } = useToast();
  const [touched, setTouched] = useState<boolean>(true);
  const params = useSearchParams();
  const Candidate = params.get("Candidate");
  const {
    candidates: { data: candidate_data, isPending: candidate_isPending },
  }: any = useCandidate({ id: Candidate });
  const SubmitForm = async (formdata: FormData) => {
    //-----formulate_data-------
    let result: any = {};
    data?.Champs.forEach((champ: any) => {
      let Champ: any = {};
      if (!NewEmployeeSections.includes(champ.champ.toUpperCase())) return;
      champ.Fields.flatMap((fieldGroup: any) => {
        return fieldGroup.Row?.map(
          (fieldRow: any) => (Champ = { ...Champ, [fieldRow.name]: "" }),
        );
      });
      result = { ...result, [champ?.champ]: { ...Champ } };
    });
    const NewData = formulateData(formdata, {
      data: {
        ...result,
        Job: { "Hire Date": new Date() },
        supervisor_id: candidate_data[0]?.["Hiring Lead"] || "",
      },
    });

    //----create_new_user--and--submit_profile_data
    const response = await CreateNewEmployee(
      NewData,
      NewData?.Contact?.["Work Email"] || "",
    );
    if (response?.Submitted) toast.success(response?.Message);
    else toast.error(response?.Message);
    setTouched(false);
  };

  return (
    <>
      {isPending || candidate_isPending ? (
        <div className="flex h-[20rem] w-full items-center justify-center ">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-start justify-start pl-8">
          <form className="" action={SubmitForm}>
            {data?.Champs?.sort((a: any, b: any) => a.rang - b.rang)?.map(
              ({ rang, champ, Icon, Fields }: ChampsType, index: number) => {
                if (!NewEmployeeSections.includes(champ.toUpperCase())) return;
                const Component = sectionIcon[Icon.toUpperCase()];
                const ComponentChamps =
                  CreateEmployeeSection[champ] || FiledsChamps;
                return (
                  <div
                    className="mt-4 flex w-full flex-col place-items-start justify-center gap-[2rem] border-b border-gray-18 pb-8"
                    key={index}
                  >
                    <h1 className="font-lg flex items-center justify-center gap-[0.5rem] text-xl  text-black">
                      <Component className="text-fabric-700" />
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
            <AccessSection />
            {touched && (
              <ChangesSection
                SubmitTxt={"Add New Employee"}
                touched={true}
                setTouched={setTouched}
              />
            )}
          </form>
        </div>
      )}
    </>
  );
}

export default Form;
