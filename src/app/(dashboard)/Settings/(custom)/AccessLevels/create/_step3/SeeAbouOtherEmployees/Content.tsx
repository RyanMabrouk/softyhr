"use client";
import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import panda from "/public/pudgy-space.png";
import Image from "next/image";
import { feildsPermissions } from "@/constants/permessions";
import { MdEdit } from "react-icons/md";
import { SelectAllBtn } from "./SelectAllBtn";
import { useSearchParams } from "next/navigation";
import useRole from "@/hooks/useRole";

export function Content() {
  // Duplicate and edit cases
  const searchParams = useSearchParams();
  const role_id = searchParams.get("role_id");
  const {
    role: { data: roleData },
  } = useRole({ id: Number(String(role_id)) });
  const [selected, setSelected] = useState(feildsPermissions[0].label);
  const [permessions, setPermessions] = useState(
    roleData?.permissions ?? ([] as string[]),
  );
  useEffect(() => {
    if (role_id && permessions.length === 0) {
      setPermessions(roleData?.permissions ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role_id]);
  const activeRoute = feildsPermissions.find((e) => e.label === selected);
  return (
    <>
      {permessions.map((e) => (
        <input
          key={e}
          type="text"
          hidden
          autoFocus
          readOnly
          name={"permessions"}
          value={e}
        />
      ))}
      <div className="flex w-full flex-row">
        <Image
          src={panda}
          alt="panda"
          width={60}
          height={60}
          className="-ml-2"
        />
        <div className="flex h-max w-full flex-col">
          <div className="ml-6 flex w-full flex-row items-center gap-7">
            {feildsPermissions.map((e, i) => (
              <span
                key={i}
                role="button"
                onClick={() => setSelected(e.label)}
                className={`z-20 border-b-2 border-b-transparent py-3 font-semibold transition-all ease-linear ${selected === e.label ? " !border-b-fabric-700 text-fabric-700" : "text-gray-25"}`}
              >
                {e.label}
              </span>
            ))}
          </div>
          <hr className=" h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
        </div>
      </div>
      <div className="-mb-2 mt-5 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1.5">
          {activeRoute?.icon}
          <span className="text-xl font-semibold text-fabric-700">
            {activeRoute?.label}
          </span>
        </div>
        <SelectAllBtn
          activeRoute={activeRoute}
          permissions={permessions}
          setPermessions={setPermessions}
        />
      </div>
      <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
      <div className="-mt-2 mb-10 flex flex-col gap-1">
        {[
          ...new Set(
            activeRoute?.permissions?.map((e) =>
              e.substring(e.indexOf(":") + 1, e.length),
            ),
          ),
        ].map((e, i) => (
          <div
            className="flex w-full flex-row  items-center justify-between rounded-sm bg-transparent py-5 transition-all ease-linear hover:bg-gray-14"
            key={"perm" + i}
          >
            <span className="font-semibold">{e}</span>
            <div className="flex flex-row items-center gap-24">
              <span className="text-gray-25">
                {permessions.includes("edit:" + e) ? (
                  <div className="flex flex-row items-center gap-1.5 text-gray-21">
                    <MdEdit className="h-5 w-5 " />
                    <span className="text-sm">Edit</span>
                  </div>
                ) : permessions.includes("read:" + e) ? (
                  <div className="flex flex-row items-center gap-1.5 text-gray-21">
                    <IoEye className="h-5 w-5 " />
                    <span className="text-sm">View Only</span>
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-1.5 text-gray-21">
                    <FaLock className="h-4 w-4 " />
                    <span className="text-sm">No Access</span>
                  </div>
                )}
              </span>
              <div className="flex flex-row gap-2 text-gray-25">
                <button
                  type="button"
                  className="peer flex cursor-pointer items-center justify-center rounded-md border border-transparent p-0.5 text-gray-21 transition-all ease-linear hover:border hover:border-black hover:bg-white  disabled:!cursor-default disabled:!border-transparent disabled:!bg-transparent disabled:text-fabric-700 "
                  disabled={
                    !permessions.includes("read:" + e) &&
                    !permessions.includes("edit:" + e)
                  }
                  onClick={() =>
                    setPermessions((old) =>
                      old.filter(
                        (x) =>
                          !(x.includes("edit:" + e) || x.includes("read:" + e)),
                      ),
                    )
                  }
                >
                  <FaLock className="h-4 w-5 " />
                </button>
                <button
                  type="button"
                  className={`peer flex cursor-pointer items-center justify-center rounded-md border border-transparent p-0.5 text-gray-21 transition-all ease-linear hover:border hover:border-black hover:bg-white  disabled:!cursor-default disabled:!border-transparent disabled:!bg-transparent disabled:text-fabric-700 `}
                  disabled={permessions.includes("read:" + e)}
                  onClick={() =>
                    setPermessions((old) => [
                      ...old.filter((x) => !(x === "edit:" + e)),
                      "read:" + e,
                    ])
                  }
                >
                  <IoEye className="h-5 w-5 " />
                </button>
                {activeRoute?.permissions?.some((x) => x.includes("edit:")) && (
                  <button
                    type="button"
                    className="peer flex cursor-pointer items-center justify-center rounded-md border border-transparent p-0.5 text-gray-21 transition-all ease-linear hover:border hover:border-black hover:bg-white  disabled:!cursor-default disabled:!border-transparent disabled:!bg-transparent disabled:text-fabric-700 "
                    disabled={permessions.includes("edit:" + e)}
                    onClick={() =>
                      setPermessions((old) => [
                        ...old.filter((x) => !(x === "read:" + e)),
                        "edit:" + e,
                      ])
                    }
                  >
                    <MdEdit className="h-5 w-5 " />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
