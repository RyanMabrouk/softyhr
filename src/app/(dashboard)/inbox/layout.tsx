"use client";
import { Footer } from "@/app/_ui/Footer";
import RoleGuard from "@/app/_ui/RoleGuard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { FaInbox } from "react-icons/fa6";
import { HiInboxArrowDown } from "react-icons/hi2";
export default function Layout({ children }: { children: React.ReactNode }) {
  const [toggle, setToggle] = React.useState<string>("Inbox");
  const pathname = usePathname();
  const Links = [
    {
      label: "Inbox",
      icon: <HiInboxArrowDown className="h-5 w-5" />,
      options: [
        {
          icon: <AiFillLike />,
          label: "Time off requests",
          path: "/inbox/TimeOffRequests/pending",
          permessions: [
            "accept:leave_requests",
            "deny:leave_requests",
            "view:leave_requests_note",
          ],
        },
      ],
    },
    {
      label: "Completed",
      icon: <FaCheckCircle className="h-5 w-5" />,
      options: [
        {
          icon: <AiFillLike />,
          label: "Time off requests",
          path: "/inbox/TimeOffRequests/accepted",
          permessions: [
            "accept:leave_requests",
            "deny:leave_requests",
            "view:leave_requests_note",
          ],
        },
      ],
    },
  ];
  return (
    <>
      <div className="mx-[auto] flex h-full w-full max-w-[80rem] flex-col justify-center pt-5">
        <header className="mb-3 flex flex-row items-center justify-start gap-2">
          <FaInbox
            className={`h-9 w-9 cursor-pointer font-bold  text-fabric-700 transition-all ease-linear`}
          />
          <span className="text-3xl font-semibold text-fabric-700">
            Requests
          </span>
        </header>
        <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
        <main className="flex flex-row">
          <nav className="mb-0 flex min-h-screen min-w-[15rem] max-w-[15rem] grow flex-col bg-gray-14  px-5 py-4 ">
            {Links.map((e) => (
              <div className="flex w-full flex-col" key={e.label}>
                <main
                  className={`flex flex-row items-center gap-2 rounded-sm px-3 py-2 text-lg transition-all ease-linear  ${toggle === e.label ? "text-fabric-700" : "text-gray-21 hover:bg-white hover:text-fabric-700"}`}
                  role="button"
                  onClick={() => setToggle(e.label)}
                >
                  {e.icon}
                  <span>{e.label}</span>
                </main>
                {toggle === e.label && (
                  <>
                    {e.options.map((o) => (
                      <RoleGuard key={o.path} permissions={o.permessions}>
                        <Link
                          href={o.path}
                          className={`ml-9 flex w-fit flex-row items-center gap-1 py-1.5  transition-all ease-linear ${pathname.includes(o.path) ? "text-fabric-700" : "text-gray-21 hover:text-fabric-700 hover:underline "}`}
                        >
                          {o.icon}
                          <span>{o.label}</span>
                        </Link>
                      </RoleGuard>
                    ))}
                    <hr className="mt-2 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
                  </>
                )}
              </div>
            ))}
          </nav>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
