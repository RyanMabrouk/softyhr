import React from "react";
import { TimeOff } from "./_TimeOff/TimeOff";
import { LeaveDataHydration } from "@/provider/LeaveDataHydration";
import { Notifications } from "./_Notifications/Notifications";
export default function Content() {
  return (
    <>
      <LeaveDataHydration>
        <TimeOff />
      </LeaveDataHydration>
      <Notifications />
    </>
  );
}
