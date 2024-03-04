import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import useAllPermissions from "@/hooks/useAllPermissions";
import useProfiles from "@/hooks/useProfiles";
import useRoles from "@/hooks/useRoles";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import { MdPerson } from "react-icons/md";
import {
  SwitchEmployeesDragAndDrop,
  usersWithoutCurrentId,
} from "../../TimeOff/components/SwitchEmployeesDragAndDrop/SwitchEmployeesDragAndDrop";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import addEmployeesToRole from "@/actions/settings/AccessLevels/addEmployeesToRole";
export default function AddEmployeesToRole() {
  const { toast } = useToast();
  const pathname = usePathname();
  const Router = useRouter();
  const { role_id } = useParams();
  const {
    roles: { data: roles, isPending: isPending1 },
  } = useRoles();
  const {
    profiles: { data: profiles, isPending: isPending2 },
  } = useProfiles();
  const {
    permissions: { data: permissions, isPending: isPending3 },
  } = useAllPermissions();
  const role = roles?.find((role) => role.id === Number(role_id));
  const role_users = permissions
    ?.filter((p) => p.role_id === role?.id)
    .map((p) => p.user_id);
  const users_with_other_roles: usersWithoutCurrentId[] | undefined = profiles
    ?.filter((p) => !role_users?.includes(p.user_id))
    .map((p) => {
      const user_role_id = permissions?.find(
        (e) => e.user_id === p.user_id,
      )?.role_id;
      return {
        ...p,
        name:
          p?.["Basic Information"]?.["First name"] +
          " " +
          p?.["Basic Information"]?.["Last name"],
        current_name: roles?.find((role) => role.id === user_role_id)?.name,
        current_id: user_role_id,
      };
    });
  const [employees, setEmployees] = React.useState<usersWithoutCurrentId[]>(
    users_with_other_roles ?? [],
  );
  const [selectedEmployees, setSelectedEmployees] = React.useState<
    usersWithoutCurrentId[]
  >([]);
  // add employees to role mutation
  const queryClient = useQueryClient();
  const { mutate: add, isPending: isPending4 } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await addEmployeesToRole({
        users: selectedEmployees,
        role_id: Number(role_id),
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Employees added to role successfully", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users_permissions"] });
      Router.push(pathname);
    },
  });
  const isPending = isPending1 || isPending2 || isPending3 || isPending4;
  return (
    <PopUpSkeleton
      title="Add Employees"
      className="flex max-w-[45rem] flex-col gap-4 px-10 py-6"
    >
      <div className="flex flex-row items-center gap-1.5">
        <MdPerson className="h-7 w-7 text-fabric-700" />
        <span className="text-lg font-semibold text-gray-27 first-letter:capitalize">
          {role?.name}
        </span>
      </div>
      <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
      <div>Select the Employees you'd like to add to {role?.name}</div>
      <form
        className="flex w-full flex-col items-center justify-center gap-5"
        action={add}
      >
        <SwitchEmployeesDragAndDrop
          setEmployees={setEmployees}
          setSelectedEmployees={setSelectedEmployees}
          employees={employees}
          selectedEmployees={selectedEmployees}
        ></SwitchEmployeesDragAndDrop>
        <hr className="h-[3px] w-full bg-primary-gradient" />
        <div className="flex w-full flex-row items-center justify-start gap-4 px-2 pt-3">
          <SubmitBtn
            className="!w-fit"
            disabled={isPending}
            blocked={selectedEmployees.length === 0}
          >
            Save
          </SubmitBtn>
          <CancelBtnGeneric />
        </div>
      </form>
    </PopUpSkeleton>
  );
}
