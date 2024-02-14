"use client";
import React from "react";
import { GrAnnounce } from "react-icons/gr";
import { Player } from "@lottiefiles/react-lottie-player";
import Loader from "@/app/_ui/Loader/Loader";
import RoleGuard from "@/app/_ui/RoleGuard";
import { GetPendingNotifications } from "./_pendingLeavsNotifs/components/GetPendingNotifications";
import { useLeaveRequestsNotifs } from "./hooks/useLeaveRequestsNotifs";
import useRealTime from "@/hooks/useRealTime";
import { useQueryClient } from "@tanstack/react-query";
import useData from "@/hooks/useData";
export type NotificationType = {
  id: string | number;
  notification: JSX.Element | null;
  createdAt: Date;
};
export function Notifications() {
  const queryClient = useQueryClient();
  const {
    user_profile: { data: user, isPending: isPending_user },
  } = useData();
  useRealTime({
    table: "notifications",
    event: "INSERT",
    filters: [{ column: "user_id", value: user?.user_id }],
    onReceive: (payload) => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", "user"],
      });
    },
  });
  const { data: leave_notifs, isPending: isPending2 } =
    useLeaveRequestsNotifs();
  const [protectedNotifs, setProtectedNotifs] = React.useState<
    NotificationType[]
  >([]);
  const [isPending1, setIsPending1] = React.useState(false);
  const isPending = isPending1 || isPending2 || isPending_user;
  const all_notifications = [...protectedNotifs, ...leave_notifs];
  return (
    <>
      {/* This pattern prevents unnecessary requests */}
      <RoleGuard
        permissions={[
          "accept:leave_requests",
          "deny:leave_requests",
          "view:leave_requests_note",
        ]}
      >
        <GetPendingNotifications
          setIsPending={setIsPending1}
          setNotifications={setProtectedNotifs}
        />
      </RoleGuard>
      {/* This is the componant */}
      <section className="flex max-h-[30rem] min-h-[30rem] w-full flex-col self-stretch rounded-md border border-white bg-white px-1 pb-4 pt-1 shadow-md">
        <header className="flex flex-row items-center gap-1.5 rounded-t-md bg-gray-14 px-6 py-2 text-fabric-700">
          <GrAnnounce className="h-5 w-5 text-fabric-700" />
          <span className="text-lg font-semibold">
            What's happening at rayes
          </span>
        </header>
        <main className="flex h-full w-full flex-col overflow-y-auto pb-1 pt-2.5 shadow-inner">
          {isPending ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loader />
            </div>
          ) : all_notifications.length > 0 ? (
            all_notifications
              .sort((e) => +e.createdAt - +new Date())
              .map((e: NotificationType, i) => (
                <div key={"notif" + i} className="flex h-fit flex-col">
                  {e.notification}
                  {all_notifications.length - 1 !== i && (
                    <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
                  )}
                </div>
              ))
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Player
                src="https://lottie.host/85fb7313-2848-45c2-bdb9-2b729f57afc2/AwfmWMtW8n.json"
                className="h-60 w-60"
                loop
                autoplay
              />
            </div>
          )}
        </main>
      </section>
    </>
  );
}
