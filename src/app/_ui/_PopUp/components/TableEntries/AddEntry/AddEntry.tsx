"use client";
import React from "react";
import PopUpSkeleton from "../../../PopUpSkeleton";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import default_avatar from "/public/default_avatar.png";
import useEmployeeData from "@/hooks/useEmloyeeData";
import Image from "next/image";
import useData from "@/hooks/useData";
import Loader from "@/app/(dashboard)/people/components/Loader/Loader";
import { Field } from "@/constants/userInfo";
import { v4 as uuidv4 } from "uuid";
import { Add_Entry } from "@/actions/personal-job/Entries/Add_Entry";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";

function AddEntry() {
  const searchParams = useSearchParams();
  const section_name = searchParams.get("section") || "";
  const { employeeId } = useParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    employee_profile: { data, isPending },
  } = useEmployeeData({ employeeId: String(employeeId) });
  const { settings } = useData();
  const { toast } = useToast();

  //-------Add_Entry---------
  const SubmitForm = async (formdata: FormData) => {
    const response = await Add_Entry(formdata, section_name, data);
    queryClient.invalidateQueries({ queryKey: ["profiles", employeeId] });
    if (response?.error) toast.error(response?.error?.Message);
    else {
      toast.success(`${section_name} added Successfully`);
    }
    router.push(pathname);
    queryClient.invalidateQueries({ queryKey: ["profiles", employeeId] });
  };

  return (
    <>
      {settings?.isPending || isPending ? (
        <Loader />
      ) : (
        <PopUpSkeleton className="" title={`add ${section_name} item`}>
          <div className="flex flex-col items-start justify-center gap-[1rem] p-4 px-8">
            <div className="flex h-[4rem] w-full min-w-[30rem] items-center gap-[1rem] border-b border-gray-15 bg-gray-14 p-8">
              <Image
                alt="profile image"
                src={data?.profile_image || default_avatar}
              />
              <h1>
                {data?.["Basic Information"]?.["First name"] +
                  " " +
                  data?.["Basic Information"]?.["Last name"]}
              </h1>
            </div>
            {settings?.isPending ? (
              <h1>Loading...</h1>
            ) : (
              <form
                action={SubmitForm}
                className="flex w-full flex-col items-start justify-center gap-[1rem]"
              >
                {settings?.data?.[0]?.["personnal"]?.Champs?.filter(
                  (section: any) => section?.champ == section_name,
                )[0]?.Fields?.map((RowField: any) => {
                  const Component = Field[RowField?.type.toUpperCase()];
                  return <Component key={uuidv4()} RowField={RowField} />;
                })}
                {settings?.data?.[0]?.["job"]?.Champs?.filter(
                  (section: any) => section?.champ == section_name,
                )[0]?.Fields?.map((RowField: any) => {
                  const Component = Field[RowField?.type.toUpperCase()];
                  return <Component key={uuidv4()} RowField={RowField} />;
                })}
                <div className="h-[0.1rem] w-full bg-gradient-to-r from-color-primary-1 to-color-primary-3" />
                <div className="flex items-start justify-center gap-[1rem]">
                  <button
                    type="submit"
                    className="text-bold mt-4 rounded bg-color-primary-8 p-2 px-5 text-white duration-300 ease-in-out hover:!bg-color-primary-3 "
                  >
                    Add item
                  </button>
                  <button
                    type="reset"
                    onClick={() => router.push(pathname)}
                    className="text-bold mt-4 rounded p-2 px-5 text-color5-500 duration-300 ease-in-out "
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </PopUpSkeleton>
      )}
    </>
  );
}

export default AddEntry;
