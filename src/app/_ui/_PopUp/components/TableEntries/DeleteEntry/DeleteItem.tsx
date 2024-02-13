"use client";
import React from "react";
import PopUpSkeleton from "../../../PopUpSkeleton";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import default_avatar from "/public/default_avatar.jpeg";
import useEmployeeData from "@/hooks/useEmloyeeData";
import Image from "next/image";
import useData from "@/hooks/useData";
import FiledsChamps from "@/app/(dashboard)/people/components/Fileds/Fileds";
import Input from "@/app/(dashboard)/people/components/Fileds/Input/Input";
import DateInput from "@/app/(dashboard)/people/components/Fileds/DateInput/DateInput";
import Loader from "@/app/(dashboard)/people/components/Loader/Loader";
import { Delete_Entry } from "@/actions/personal-job/Entries/Delete_Entry";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";

function DeleteItem() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const section_name = searchParams.get("section") || "";
  const item_id = searchParams.get("id") || "";
  const { employeeId } = useParams();
  const {
    employee_profile: { data, isPending },
  } = useEmployeeData({ employeeId });
  const { settings } = useData();
  const { toast } = useToast();

  //----Deleting-item-----

  const SubmitForm = async () => {
    const response = await Delete_Entry(section_name, data, item_id);
    if (response?.error) toast.error(response?.error?.Message);
    else toast.success(`${section_name} Deleted Successfully`);
    queryClient.invalidateQueries({ queryKey: ["profiles", employeeId] });
    router.push(pathname);
  };
  return (
    <>
      {settings?.isPending || isPending ? (
        <Loader />
      ) : (
        <PopUpSkeleton className="" title={`Delete ${section_name} item`}>
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
              <div className="flex w-full flex-col items-start justify-center gap-[1rem]">
                Are you sure you want to delete this row?
                <div className="h-[0.1rem] w-full bg-gradient-to-r from-color-primary-1 to-color-primary-3" />
                <form
                  action={SubmitForm}
                  className="flex items-start justify-center gap-[1rem]"
                >
                  <button
                    type="submit"
                    className="text-bold mt-4 rounded bg-color-primary-8 p-2 px-5 text-white duration-300 ease-in-out hover:!bg-color-primary-3 "
                  >
                    Delete item
                  </button>
                  <button
                    type="reset"
                    onClick={() => router.push(pathname)}
                    className="text-bold mt-4 rounded p-2 px-5 text-color5-500 duration-300 ease-in-out "
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}
          </div>
        </PopUpSkeleton>
      )}
    </>
  );
}

export default DeleteItem;
