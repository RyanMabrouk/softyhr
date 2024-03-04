import React from "react";
import SettingsLayoutSkeleton from "../SettingsLayoutSkeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface JobSettingsRoutesType {
  label: string;
  path: string;
}

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const JobSettingsRoutes: JobSettingsRoutesType[] = [
    { label: "Candidate Sources", path: "/" },
    { label: "Candidate Statuses", path: "/CandidateSources" },
    { label: "Email Templates", path: "/EmailTemplates" },
    { label: "Offer Templates", path: "/OfferTemplates" },
  ];
  return (
    <SettingsLayoutSkeleton
      permissions={["access:/Settings/Jobs"]}
      Navigation={
        <>
          <header className="mb-6 text-xl text-black opacity-85">Hiring</header>
          {JobSettingsRoutes?.map((Route, index) => (
            <div key={"categories" + index} className="flex flex-col">
              <Link
                key={Route?.label}
                href={`/Settings/Jobs/${Route?.path}`}
                className={` rounded-sm p-2 ${pathname?.includes(Route?.path) || (pathname == "/Settings/Jobs" && Route?.label == JobSettingsRoutes[0]?.label) ? "bg-gray-14 font-bold text-fabric-700" : ""} text-[0.95rem] font-normal  transition-all ease-linear hover:bg-gray-14`}
              >
                {Route?.label}
              </Link>
            </div>
          ))}
        </>
      }
    >
      {children}
    </SettingsLayoutSkeleton>
  );
}

export default Layout;
