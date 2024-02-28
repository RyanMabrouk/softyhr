import resetPassword from "@/actions/auth/resetPassword";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import useEmployeeData from "@/hooks/useEmloyeeData";
import useToast from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IoWarning } from "react-icons/io5";
export default function ChangeEmployeePassword() {
  const { toast } = useToast();
  const Router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("employeeId");
  const {
    employee_profile: { data: employee_profile },
  } = useEmployeeData({ employeeId: employeeId });
  // current employee full name
  const first_name: string =
    employee_profile?.["Basic Information"]?.["First name"];
  const last_name: string =
    employee_profile?.["Basic Information"]?.["Last name"];
  const email: string = employee_profile?.Contact?.["Work Email"];
  // Mutation to Reset Password
  const { mutate: SendReset, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await resetPassword(formData);
      if (error) {
        toast.error(error.type, error.message);
      } else {
        toast.success("Password reset link sent to " + email);
      }
    },
    onSuccess: () => {
      Router.push(pathname);
    },
  });
  return (
    <PopUpSkeleton
      className="flex max-w-[35rem] flex-col items-center gap-4 px-8 py-4"
      title="Just Checking..."
    >
      <IoWarning className="h-16 w-16 text-color9-500 " />
      <div className=" max-w-[30rem] text-center text-[1.25rem] leading-6  text-gray-27">
        <span>
          {"Reset password for  "}
          <strong>{first_name + " " + last_name}</strong>
        </span>
      </div>
      <div className=" max-w-[85%] text-center text-[15px] leading-[22px] text-gray-20">
        {`An email with a link to reset their password will be sent to ${email}.`}
      </div>
      <form action={SendReset} className="flex w-full flex-col gap-2 px-2 pt-3">
        <input
          type="text"
          name="email"
          value={email}
          hidden
          autoFocus
          readOnly
        />
        <hr className="h-[3px] w-full bg-primary-gradient" />
        <div className="flex flex-row gap-4 px-2 pt-3">
          <SubmitBtn
            className="!w-fit !max-w-[20rem] !px-2"
            disabled={isPending}
            blocked={!email}
          >{`Reset password`}</SubmitBtn>
          <CancelBtnGeneric />
        </div>
      </form>
    </PopUpSkeleton>
  );
}
