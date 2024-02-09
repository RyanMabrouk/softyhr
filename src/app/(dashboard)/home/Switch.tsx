import React from "react";
import switchRoleToEmployee, {
  switchRoleToAdmin,
} from "@/actions/switchRoleToEmployee";
import { useRouter } from "next/navigation";
export default function Switch() {
  const router = useRouter();
  return (
    <>
      <form>
        <button
          className="mx-auto mt-10 w-full text-lg font-semibold hover:text-fabric-700 hover:underline"
          formAction={async () => {
            await switchRoleToEmployee();
            router.refresh();
          }}
        >
          Switch Role To Employee
        </button>
      </form>
      <form>
        <button
          className="mx-auto mt-5 w-full text-lg font-semibold hover:text-fabric-700 hover:underline"
          formAction={async () => {
            await switchRoleToAdmin();
            router.refresh();
          }}
        >
          Switch Role To Admin
        </button>
      </form>
    </>
  );
}
