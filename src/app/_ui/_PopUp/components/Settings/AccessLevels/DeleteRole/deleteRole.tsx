"use client";
import deleteRole from "@/actions/settings/AccessLevels/deleteRole";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import useAllPermissions from "@/hooks/useAllPermissions";
import useRoles from "@/hooks/useRoles";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import { IoWarning } from "react-icons/io5";

export default function DeleteRole() {
  const { toast } = useToast();
  const pathname = usePathname();
  const Router = useRouter();
  const params = useParams();
  const { role_id } = params;
  const {
    roles: { data: roles, isPending: isPending1 },
  } = useRoles();
  const role = roles?.find((role) => role.id === Number(role_id));
  const {
    permissions: { data: permissions, isPending: isPending2 },
  } = useAllPermissions();
  const users =
    permissions?.filter((p) => p.role_id === role?.id).map((p) => p.user_id)
      .length ?? 0;
  // add delete role mutation
  const queryClient = useQueryClient();
  const { mutate: deleteMut, isPending: isPending3 } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await deleteRole({
        role_id: Number(role_id),
      });
      if (error) {
        toast.error(error.message, error.type);
        throw error;
      } else {
        toast.success("Role deleted successfully", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users_permissions"] });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      Router.push(pathname);
    },
  });
  const isPending = isPending1 || isPending2 || isPending3;
  return (
    <PopUpSkeleton
      className="flex w-[35rem] flex-col items-center gap-4 px-4 py-4"
      title="Delete Access Level"
    >
      <IoWarning className="h-16 w-16 text-color9-500 " />
      <div className=" max-w-[30rem] text-center text-[1.25rem] leading-6  text-gray-27">
        {"Are you sure you want to delete "}
        <strong>"{role?.name}"?</strong>
      </div>
      <div
        className={` max-w-[90%]  text-center text-[15px] leading-[22px]  ${users > 0 ? " text-red-500" : "text-gray-20"}`}
      >
        {users > 0
          ? "You cannot delete this access level because it is currently in use by " +
            users +
            " users. \n Please remove them and try again."
          : "This action cannot be undone."}
      </div>
      <form className="flex w-full flex-col gap-2 px-2 pt-3" action={deleteMut}>
        <hr className="h-[3px] w-full bg-primary-gradient" />
        <div className="flex flex-row gap-4 px-2 pt-3">
          <SubmitBtn
            className="!w-fit !max-w-[20rem] !px-2"
            blocked={users > 0}
            disabled={isPending}
          >
            Delete this access level
          </SubmitBtn>
          <CancelBtnGeneric />
        </div>
      </form>
    </PopUpSkeleton>
  );
}
