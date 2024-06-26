"use client";
import React, { useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import { v4 as uuidv4 } from "uuid";
import { sectionIcon } from "@/constants/userInfo";
import { ChampsType } from "@/types/userInfoTypes.type";
import { useRouter, useSearchParams } from "next/navigation";
import useToast from "@/hooks/useToast";
import ChangesSection from "../../../components/ChangesSection/ChangesSection";
import EmployementStatus from "../EmployementStatus";
import AccessSection from "../AccessSection";
import { CreateNewEmployee } from "@/actions/hiring/CreateNewEmployee";
import useCandidate from "@/hooks/Hiring/useCandidate";
import formulateDataNewemployee from "../../utils/formulateData";
import FiledsChamps from "../../../components/sections/FiledsChamps";
import Loader from "@/app/_ui/Loader/Loader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useData from "@/hooks/useData";

function Form() {
  const {
    user_profile: { data: profile_data, isPending: profile_pending },
  } = useData();
  const queryClient = useQueryClient();
  const { data, isPending } = useSettings("New_Employee");
  const { toast } = useToast();
  const [touched, setTouched] = useState<boolean>(true);
  const params = useSearchParams();
  const router = useRouter();
  const Candidate = params.get("Candidate");
  const {
    candidates: { data: candidate_data, isPending: candidate_isPending },
  }: any = useCandidate("", { id: Candidate });

  //----------add_candiate_as_new_emplyee------
  const SubmitFormCandidate = async (formdata: FormData) => {
    //-----formulate_data-------
    let result: any = {};
    data?.Champs.forEach((champ: any) => {
      let Champ: any = {};
      champ.Fields.flatMap((fieldGroup: any) => {
        return fieldGroup.Row?.map(
          (fieldRow: any) => (Champ = { ...Champ, [fieldRow.name]: "" }),
        );
      });
      result = { ...result, [champ?.champ]: { ...Champ } };
    });
    const NewData = formulateDataNewemployee(formdata, {
      data: {
        ...result,
        Job: { "Hire Date": new Date() },
        supervisor_id: candidate_data[0]?.["Hiring Lead"] || "",
      },
    });
    //----create_new_user--and--submit_profile_data
    CreateEmployeeMut({ NewData, formData: formdata });
  };

  //----------add_new_emplyee------
  const SubmitForm = async (formdata: FormData) => {
    //-----formulate_data-------
    let result: any = {};
    data?.Champs?.forEach((champ: any) => {
      let Champ: any = {};
      champ.Fields.flatMap((fieldGroup: any) => {
        return fieldGroup.Row?.map(
          (fieldRow: any) => (Champ = { ...Champ, [fieldRow.name]: "" }),
        );
      });
      result = { ...result, [champ?.champ]: { ...Champ } };
    });
    const NewData = formulateDataNewemployee(formdata, {
      data: {
        ...result,
        Job: { "Hire Date": new Date() },
        supervisor_id: profile_data?.user_id || "",
      },
    });
    //----create_new_user--and--submit_profile_data
    CreateEmployeeMut({ NewData, formData: formdata });
  };
  const { mutate: CreateEmployeeMut, isPending: isCreatingEmployee } =
    useMutation({
      mutationFn: async ({
        NewData,
        formData,
      }: {
        NewData: any;
        formData: FormData;
      }) => {
        const response = await CreateNewEmployee({
          NewEmployeData: NewData,
          email: NewData?.Contact?.["Work Email"] || "",
          role_id: formData.get("role_id") as string,
        });

        setTouched(false);
        if (response?.Submitted) {
          toast.success(response?.Message);
          router.push("/people/list");
        } else {
          toast.error(response?.Message);
          throw new Error(response?.Message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["profiles"] });
        queryClient.invalidateQueries({ queryKey: ["users_permissions"] });
        router.push("/people/list");
      },
    });
  return (
    <>
      {isPending || candidate_isPending || profile_pending ? (
        <div className="flex h-[20rem] w-full items-center justify-center ">
          <Loader />
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-start justify-start pl-8">
          <form
            action={(formData) => {
              const role_id = formData.get("role_id") as string;
              if (role_id === "none") {
                toast.error("Please select a role for the new employee");
              } else {
                Candidate
                  ? SubmitFormCandidate(formData)
                  : SubmitForm(formData);
              }
            }}
          >
            {data?.Champs?.sort((a: any, b: any) => a.rang - b.rang)?.map(
              ({ rang, champ, Icon, Fields }: ChampsType, index: number) => {
                const Component = sectionIcon[Icon.toUpperCase()];
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
                      <FiledsChamps
                        champ={champ}
                        //user={user?.data}
                        setTouched={setTouched}
                        key={rang || uuidv4()}
                        user={{ [champ]: candidate_data?.[0] }}
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
                OnCancelLink="/people/list"
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
