import { PersonnalChamps } from "@/constants/userInfoLabel";
import React from "react";
import Fileds from "../../components/Fileds/Fileds";
import { FaAddressCard } from "react-icons/fa";

function page() {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start">
      <div className="border-gray-18 mt-8  flex w-full items-center justify-between gap-[1rem] border-b pb-4 text-lg font-normal ">
        <h1 className="flex items-center justify-center  gap-[1rem] text-2xl font-medium text-color-green-7 ">
          <FaAddressCard fill="green" />
          Personnal
        </h1>
        <h1 className="cursor-pointer text-gray-10 hover:underline">
          Edit Fields
        </h1>
      </div>
      {PersonnalChamps?.sort((a, b) => a.rang - b.rang)?.map(
        ({ rang, champ, Icon, Fields }, index: number) => {
          return (
            <div
              className="border-gray-18 mt-4 flex w-full flex-col place-items-start justify-center gap-[2rem] border-b pb-8"
              key={index}
            >
              <h1 className="font-lg flex items-center justify-center gap-[0.5rem] text-xl  text-black">
                <Icon fill="green" />
                {champ}
              </h1>
              <div className="flex flex-col items-start justify-center gap-[1rem]">
                <Fileds
                  key={rang}
                  FieldsArray={Fields?.sort((a, b) => a.rang - b.rang)}
                  index={0}
                />
              </div>
            </div>
          );
        },
      )}
    </div>
  );
}

export default page;
