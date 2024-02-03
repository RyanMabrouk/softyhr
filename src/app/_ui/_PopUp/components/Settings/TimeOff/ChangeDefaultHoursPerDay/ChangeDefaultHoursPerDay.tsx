"use client";
import chnageDefaultHours from "@/actions/settings/leave/chnageDefaultHours";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import { useSettings } from "@/hooks/Settings/useSettings";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { InputGeneric } from "../../../../../InputGeneric";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
export default function ChangeDefaultHoursPerDay() {
  const Router = useRouter();
  const { toast } = useToast();
  const { data: settings } = useSettings("default_hours_per_day");
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // mutation to update default hours per day
  const queryClient = useQueryClient();
  const { mutate: change, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await chnageDefaultHours({ formData });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Default hours per day updated successfully", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      Router.back();
    },
  });
  return (
    <PopUpSkeleton
      className="flex max-w-[35rem] flex-col gap-4 px-12 py-8"
      title="Default Hours Per Day"
    >
      <div className="text-gray-27 opacity-80">
        To make it easier for employees to fill out time off requests we present
        default hours for days requested. Employees can always adjust the number
        when they submit a request.
      </div>
      <div className="text-xl text-black opacity-85">Default Hours</div>
      <form
        action={change}
        className="flex w-full flex-col justify-center gap-5"
      >
        <main className="grid-row-4 grid grid-cols-3 flex-wrap gap-3">
          {daysOfWeek.map((day, index) => (
            <InputGeneric
              type="number"
              className=" !max-w-[15rem]"
              key={day}
              label={day}
              defaultValue={settings?.[index]}
              name={"hours"}
              required={true}
            />
          ))}
        </main>
        <hr className="h-[3px] w-full bg-primary-gradient" />
        <div className="flex w-full flex-row items-center justify-start gap-4 px-2 pt-3">
          <SubmitBtn disabled={isPending} className="!w-fit">
            Save
          </SubmitBtn>
          <CancelBtnGeneric />
        </div>
      </form>
    </PopUpSkeleton>
  );
}
