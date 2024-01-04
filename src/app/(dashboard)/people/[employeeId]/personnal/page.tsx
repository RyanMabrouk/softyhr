"use client";
import React, { useState } from "react";
import FiledsChamps from "../../components/Fileds/Fileds";
import { FaAddressCard } from "react-icons/fa";
import ChangesSection from "../../components/ChangesSection/ChangesSection";
import { useSettings } from "@/hooks/useSettings";
import Loader from "../../components/Loader/Loader";
import submitForm from "@/api/test";
import { sectionIcon } from "@/constants/userInfo";
import { ChampsType } from "@/types/userInfoTypes.type";
import { usePathname, useRouter } from "next/navigation";

function Personnal() {
  const { data, isPending } = useSettings("personnal");
  const [touched, setTouched] = useState<boolean>(false);
  const pathname = usePathname();
  const Router = useRouter();
  console.log(pathname);
  return (
    <>
      {isPending ? (
        <div className="flex h-[20rem] w-full items-center justify-center ">
          <Loader />
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-start justify-start pl-8">
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
          <form className="Form-Profile" action={submitForm}>
            {data?.Champs?.sort((a: any, b: any) => a.rang - b.rang)?.map(
              ({ rang, champ, Icon, Fields }: ChampsType, index: number) => {
                const Component = sectionIcon[Icon.toUpperCase()];
                console.log(Component);
                return (
                  <div
                    className="mt-4 flex w-full flex-col place-items-start justify-center gap-[2rem] border-b border-gray-18 pb-8"
                    key={index}
                  >
                    <h1 className="font-lg flex items-center justify-center gap-[0.5rem] text-xl  text-black">
                      {/*   <Component fill="green" />*/}
                      {champ}
                    </h1>
                    <div className="flex flex-col items-start justify-center gap-[1rem]">
                      <FiledsChamps
                        setTouched={setTouched}
                        key={rang}
                        FieldsArray={Fields?.sort(
                          (a: any, b: any) => a.rang - b.rang,
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
