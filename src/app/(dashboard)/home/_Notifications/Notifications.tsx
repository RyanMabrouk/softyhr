"use client";
import React from "react";
import { GrAnnounce } from "react-icons/gr";
import { Player } from "@lottiefiles/react-lottie-player";
import Loader from "@/app/_ui/Loader/Loader";
import RoleGuard from "@/app/_ui/RoleGuard";
import { GetPendingNotifications } from "./_pendingNotifs/components/GetPendingNotifications";
export type NotificationType = {
  id: string;
  notification: JSX.Element | null;
  createdAt: Date;
};
export function Notifications() {
  const [Notifications, setNotifications] = React.useState<NotificationType[]>(
    [],
  );
  const [isPending, setIsPending] = React.useState(false);
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
          setIsPending={setIsPending}
          setNotifications={setNotifications}
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
          ) : Notifications.length > 0 ? (
            Notifications.sort((e) => +e.createdAt - +new Date()).map(
              (e: NotificationType, i) => (
                <div key={"notif" + i} className="flex h-fit flex-col">
                  {e.notification}
                  {Notifications.length - 1 !== i && (
                    <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
                  )}
                </div>
              ),
            )
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
