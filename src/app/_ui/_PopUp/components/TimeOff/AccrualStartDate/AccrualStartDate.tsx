import React from "react";
import PopUpSkeleton from "../../../PopUpSkeleton";
import default_avatar from "/public/default_avatar.jpeg";
import { useParams, usePathname, useRouter } from "next/navigation";
import useEmployeeData from "@/hooks/useEmloyeeData";
import Image from "next/image";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import editAccrualStartDate from "@/actions/leave/editAccrualStartDate";
import useToast from "@/hooks/useToast";
import { CalendarGeneric } from "@/app/_ui/CalenderGeneric";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
export default function AccrualStartDate() {
  const { toast } = useToast();
  const Router = useRouter();
  const { employeeId } = useParams();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const {
    employee_profile: { data: employee_profile },
  } = useEmployeeData({ employeeId: employeeId });
  // current employee full name
  const first_name: string =
    employee_profile?.["Basic Information"]?.["First name"];
  const last_name: string =
    employee_profile?.["Basic Information"]?.["Last name"];
  // Edit Accrual Start Date Mutation
  const { mutate: edit, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await editAccrualStartDate({
        formData: formData,
        user_id: employeeId as string,
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Accrual Start Date Changed Successfully", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles", employeeId] });
      Router.push(pathname);
    },
  });
  return (
    <PopUpSkeleton
      title="Accrual Level Start Date"
      className="flex w-full max-w-[50rem] flex-col gap-4 px-8 py-6"
    >
      <header className="flex w-full  flex-row items-center gap-2 bg-gray-14 px-4 py-3">
        <Image
          src={employee_profile?.picture ?? default_avatar}
          className="h-12 w-12 rounded-full"
          alt=""
          width={80}
          height={80}
        />
        <div className="m-0 block text-[1.2rem] font-normal capitalize leading-[1.733rem] text-black">
          {first_name + " " + last_name}
        </div>
      </header>
      <form
        action={edit}
        className="flex w-full flex-col items-start justify-start gap-3"
      >
        <main className=" flex flex-col gap-3 px-4 pb-2">
          <div className=" text-[0.95rem] opacity-75">
            <strong>Note:</strong> If your policy allows for employees to earn
            at different rates based on their length of service, you can
            manipulate the rate this employee is eligible for by adjusting the
            Accrual Start Date below.
          </div>
          <CalendarGeneric
            name="accrual_start_date"
            label="Accrual Level Start Date"
            defaultValue={
              employee_profile?.accrual_start_date
                ? new Date(employee_profile?.accrual_start_date)
                : undefined
            }
          />
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
