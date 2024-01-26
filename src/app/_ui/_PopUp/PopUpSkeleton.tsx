import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { CgClose } from "react-icons/cg";
export default function PopUpSkeleton({
  title,
  children,
  className,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  const Router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  return (
    <div className="z-50 flex flex-col gap-2">
      <div className="z-50 flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <h1 className=" pb-2 text-2xl font-normal text-fabric-700">
            {title}
          </h1>
          <div
            onClick={() => {
              queryClient.setQueryData(["fileIds"], []);
              Router.replace(pathname);
            }}
          >
            <CgClose className="cursor-pointer text-3xl text-gray-15" />
          </div>
        </div>
      </div>
      <div className={`shadow-popup rounded-sm bg-white  ${className}`}>
        {children}
      </div>
    </div>
  );
}
