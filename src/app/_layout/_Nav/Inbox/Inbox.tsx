"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaInbox } from "react-icons/fa6";
import RoleGuard from "@/app/_ui/RoleGuard";
import usePendingLeaveRequests from "@/hooks/TimeOff/usePendingLeaveRequests";
import { RealTimeDataLeaveRequets } from "./realTimeHooks/RealTimeDataLeaveRequets";
type notifs = {
  pending_leave_requests: number;
};
export function Inbox() {
  const [toggleView, setToggleView] = useState(false);
  const [notifs, setNotifs] = useState<notifs>({
    pending_leave_requests: 0, // make sure whatever you add to this object also added in the links array and matches as the dataSetName !!
  });
  const links = [
    {
      label: "Time Off requests",
      path: "/inbox/TimeOffRequests/pending",
      hook: usePendingLeaveRequests,
      dataSetName: "pending_leave_requests",
      permissions: [
        "accept:leave_requests",
        "deny:leave_requests",
        "view:leave_requests_note",
      ],
      realTimeHooks: <RealTimeDataLeaveRequets />,
    },
  ];
  return (
    <div className="relative">
      <div
        className="relative mr-1"
        role="button"
        onClick={() => setToggleView((old) => !old)}
      >
        <FaInbox className="h-7 w-7 cursor-pointer font-bold text-gray-15 transition-all ease-linear hover:text-fabric-700" />
        <div className="absolute right-[-30%] top-[-25%] flex h-6 w-6 cursor-default items-center justify-center rounded-full border-2 border-gray-17 bg-fabric-700 px-1 text-center text-[0.70rem] font-semibold text-white">
          <span>{Object.values(notifs).reduce((acc, e) => acc + e, 0)}</span>
        </div>
      </div>
      <div
        className={`shadow-green absolute right-0 top-[135%] z-50 h-fit w-max min-w-[12.5rem] overflow-clip rounded-md bg-white ${toggleView ? "block" : "hidden"}`}
      >
        <Link
          href={"/inbox"}
          className="group flex cursor-pointer flex-row items-center gap-1 px-3 py-2 font-bold text-gray-27 transition-all ease-linear hover:bg-fabric-700 hover:text-white"
          onClick={() => setToggleView((old) => !old)}
        >
          <FaInbox className="h-5 w-5 text-fabric-700 group-hover:text-white" />
          <span>Inbox</span>
        </Link>
        <main
          className="flex flex-col justify-center rounded-b-md text-sm text-gray-27 transition-all ease-linear"
          role="button"
        >
          {links.map((link, index) => (
            <RoleGuard
              permissions={link.permissions}
              key={"inbox_link" + index}
            >
              <InboxLink
                {...link}
                setNotifs={setNotifs}
                setToggleView={setToggleView}
              />
              {link.realTimeHooks}
            </RoleGuard>
          ))}
        </main>
      </div>
    </div>
  );
}
function InboxLink({
  label,
  path,
  hook,
  setToggleView,
  setNotifs,
  // dataSetName is name of the object that has the data returned from the hook and will be used to update the notifs state
  dataSetName,
}: {
  label: string;
  path: string;
  hook: () => { [key: string]: { data: any[] | undefined } };
  dataSetName: string;
  setToggleView: React.Dispatch<React.SetStateAction<boolean>>;
  setNotifs: React.Dispatch<React.SetStateAction<notifs>>;
}) {
  const {
    [dataSetName]: { data: requests },
  } = hook();
  useEffect(() => {
    setNotifs((old) => ({
      ...old,
      [dataSetName]: requests?.length ?? 0,
    }));
  }, [requests?.length, setNotifs, dataSetName]);
  return (
    <Link
      onClick={() => setToggleView((old) => !old)}
      className="group border-t bg-white px-3 py-2 text-base text-gray-27 transition-all ease-linear hover:bg-fabric-700 hover:text-white"
      href={path}
    >
      <span>{label} </span>
      <span className="text-sm text-gray-21 transition-all ease-linear group-hover:text-white">
        {" ("}
      </span>
      <span className="inbox_link text-sm text-gray-21 transition-all ease-linear group-hover:text-white">
        {requests?.length ?? 0}
      </span>
      <span className="text-sm text-gray-21 transition-all ease-linear group-hover:text-white">
        {")"}
      </span>
    </Link>
  );
}
