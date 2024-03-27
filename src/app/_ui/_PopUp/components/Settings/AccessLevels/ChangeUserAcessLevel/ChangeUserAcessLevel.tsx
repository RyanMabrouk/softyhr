"use client";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import useProfiles from "@/hooks/useProfiles";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import default_avatar from "/public/default_avatar.png";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/helpers/string.helpers";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
import useRoles from "@/hooks/Roles/useRoles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import addEmployeeToRole from "@/actions/settings/AccessLevels/addEmployeeToRole";
import useAllPermissions from "@/hooks/Roles/useAllPermissions";
export default function ChangeUserAcessLevel() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { toast } = useToast();
  const Router = useRouter();
  const employeeId = searchParams.get("employeeId");
  const {
    profiles: { data: profiles },
  } = useProfiles();
  const employee_profile = profiles?.find((p) => p.user_id === employeeId);
  // current employee full name
  const first_name: string =
    employee_profile?.["Basic Information"]?.["First name"];
  const last_name: string =
    employee_profile?.["Basic Information"]?.["Last name"];
  const {
    roles: { data: roles },
  } = useRoles();
  const {
    permissions: { data: permissions },
  } = useAllPermissions();
  const user_role_id = permissions?.find(
    (p) => p.user_id === employeeId,
  )?.role_id;
  const user_role_name = roles?.find((r) => r.id === user_role_id)?.name;
  const options = roles?.map((r) => ({ label: r.name, value: r.id }));
  // add leave policy mutation
  const queryClient = useQueryClient();
  const { mutate: add, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const new_role_id = Number(formData.get("role_id") as string);
      if (new_role_id === user_role_id) {
        toast.error("No change", "Error");
        return;
      }
      if (!new_role_id) {
        toast.error("Please select a role", "Error");
        return;
      }
      const { error } = await addEmployeeToRole({
        user_id: String(employeeId),
        role_id: new_role_id,
      });
      if (error) {
        toast.error(error.type, error.message);
      } else {
        toast.success(
          `${capitalizeFirstLetter(
            first_name,
          )} has been added to the role successfully`,
          "Success",
        );
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users_permissions"],
      });
      Router.push(pathname, { scroll: false });
    },
  });
  return (
    <PopUpSkeleton
      title="Change Acess Level"
      className="flex w-full min-w-[50rem] flex-col gap-4 px-8 py-6"
    >
      <header className="flex w-full flex-row items-center gap-2 bg-gray-14 px-4 py-3">
        <Image
          priority
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
        action={add}
        className="flex w-full flex-col items-start justify-start gap-3"
      >
        <div className="mb-2 ml-4">
          <SelectGeneric
            label={`Add ${capitalizeFirstLetter(first_name)} to...`}
            name="role_id"
            className="!w-[17.5rem]"
            defaultValue={{
              label: capitalizeFirstLetter(user_role_name ?? ""),
              value: Number(user_role_id),
            }}
            required={true}
            group={true}
            inputLabel="-Select role-"
            options={options}
          />
        </div>
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
