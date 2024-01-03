"use client";
import React, { useState } from "react";
import FiledsChamps from "../../components/Fileds/Fileds";
import { FaAddressCard } from "react-icons/fa";
import ChangesSection from "../../components/ChangesSection/ChangesSection";
import { useSettings } from "@/hooks/useSettings";
import Loader from "../../components/Loader/Loader";
import submitForm from "@/api/test";
import { v4 as uuidv4 } from "uuid";
import { sectionIcon } from "@/constants/userInfo";
import { ChampsType } from "@/types/userInfoTypes.type";
import { usePathname, useRouter } from "next/navigation";
import getData from "@/api/getData";
import getSession from "@/actions/getSession";
import getUser from "@/api/getUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Section } from "@/constants/userInfoLabel";
import formulateData from "../../components/utils/formulateData";
import updateData from "@/api/updateData";
import useToast from "@/hooks/useToast";

function Personnal() {
  const { data, isPending } = useSettings("personnal");
  const { toast, toastContainer } = useToast();
  const [touched, setTouched] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutateAsync, isPaused } = useMutation({
    mutationFn: async (NewData: any) => {
      return await updateData("profiles", NewData, {
        user_id: NewData.user_id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("your changes updated successfully", "update");
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  const { data: user, isPending: isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getData("profiles", { user: true, org: true }),
  });
  const pathname = usePathname();
  const Router = useRouter();
  const SubmitForm = (formdata: FormData) => {
    const NewData = formulateData(formdata, user);
    mutateAsync(NewData);
    setTouched(false);
  };
  return (
    <>
      {toastContainer}
      {isPending || isLoading ? (
        <div className="flex h-[20rem] w-full items-center justify-center ">
          <Loader />
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-start justify-start">
          <div className="mt-8 flex  w-full items-center justify-between gap-[1rem] border-b border-gray-18 pb-4 text-lg font-normal ">
            <h1 className="flex items-center justify-center  gap-[1rem] text-2xl font-medium text-color-primary-7 ">
              <FaAddressCard fill="green" />
              Personnal
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
                console.log(Icon.toUpperCase());
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
                        user={user?.data[0]}
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

export default Personnal;
