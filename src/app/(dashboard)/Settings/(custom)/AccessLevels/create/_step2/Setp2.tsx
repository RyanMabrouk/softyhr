"use client";
import React, { useContext, useEffect, useState } from "react";
import StepContext, {
  StepContextContextType,
} from "../../../TimeOff/policy/context/StepContext";
import { permissions } from "@/constants/permessions";
import { CheckBoxGeneric } from "@/app/_ui/CheckBoxGeneric";
import { useSearchParams } from "next/navigation";
import useRole from "@/hooks/useRole";

export function Setp2() {
  type Permission = {
    permession: string;
    label: string;
    description?: string;
    default?: boolean;
    category: string;
  };
  // Duplicate and edit cases
  const searchParams = useSearchParams();
  const role_id = searchParams.get("role_id");
  const {
    role: { data: roleData },
  } = useRole({ id: Number(String(role_id)) });
  const { step } = useContext<StepContextContextType>(StepContext);
  const [label, setLabel] = useState<string>(permissions[0].label);
  const [checkAll, setCheckAll] = useState(false);
  const [checked, setChecked] = useState<string[]>(roleData?.permissions ?? []);
  const allpermissions = permissions.reduce(
    (acc: Permission[], e) => [
      ...acc,
      ...e.permissions.map((p) => ({ ...p, category: e.label })),
    ],
    [],
  );
  useEffect(() => {
    setChecked((old) => [
      ...new Set([
        ...old,
        ...allpermissions.filter((e) => e.default).map((e) => e.permession),
        ...(roleData?.permissions ?? []),
      ]),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleData?.permissions.length]);
  useEffect(() => {
    if (
      allpermissions.every((e) => checked.includes(e.permession)) &&
      !checkAll
    ) {
      setCheckAll(true);
    }
    if (
      !allpermissions.every((e) => checked.includes(e.permession)) &&
      checkAll
    ) {
      setCheckAll(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked.length]);
  const handleCheckBoxChange = (e: string, checked: boolean) => {
    setChecked((old) =>
      checked ? [...new Set([...old, e])] : old.filter((p) => p !== e),
    );
  };
  const handleCheckAllChange = (e: string, checked: boolean) => {
    if (checked) {
      setChecked(allpermissions.map((e) => e.permession));
    } else {
      setChecked([]);
    }
  };

  return (
    <div
      className={`mt-10 flex w-full flex-col gap-6 px-6 ${step === 2 ? "flex" : "hidden"} `}
    >
      <div className="flex flex-col gap-1">
        <span className="text-xl">
          What Can People with this Access Level Do?
        </span>
        <span className="mb-8 text-sm text-gray-21">
          Select an area to customize access.
        </span>
        <main className="flex h-full flex-row">
          <nav className="mb-0 flex h-full min-h-[30rem] max-w-60 grow flex-col bg-gray-14  px-5 py-4 ">
            {permissions.map((e, i) => (
              <button
                type="button"
                key={"permession" + i}
                className={`flex flex-row items-center justify-start gap-2 rounded-sm px-3 py-2 capitalize text-gray-21 no-underline transition-all  ease-linear hover:bg-white hover:text-fabric-700 ${e.label === label ? "font-bold !text-fabric-700" : ""}`}
                onClick={() => setLabel(e.label)}
              >
                {e.icon}
                {e.label}
              </button>
            ))}
          </nav>
          <section className="ml-9 flex flex-col gap-3">
            <div className="flex flex-col">
              <CheckBoxGeneric
                onChange={handleCheckAllChange}
                defaultValue={checkAll}
                name="check_all"
              >
                Access all permissions
              </CheckBoxGeneric>
              <span className="-mt-1 ml-8 text-sm text-gray-21">
                Allow this role to have full controle of the organization{" "}
              </span>
            </div>
            <header className="mb-4 text-2xl font-semibold">{label}</header>
            {allpermissions.map((e, i) => (
              <div
                key={"checkCheckBoxGenericbox" + i}
                className={`flex flex-col ${label === e.category ? "block" : "hidden"}`}
              >
                <CheckBoxGeneric
                  name="permessions"
                  value={e.permession}
                  setInputValueInParent={handleCheckBoxChange}
                  defaultValue={checked.includes(e.permession)}
                >
                  {e.label}
                </CheckBoxGeneric>
                <span className="-mt-1 ml-8 text-sm text-gray-21">
                  {e.description ?? ""}
                </span>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
