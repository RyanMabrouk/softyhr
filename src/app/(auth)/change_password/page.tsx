import getSession from "@/actions/getSession";
import getCurrentorg from "@/api/getCurrentOrg";
import { redirect } from "next/navigation";
import React from "react";
import Skeleton from "../login/_ui/Skeleton";
import Image from "next/image";
import default_company_logo from "/public/cropped (2).jpg";
import { Form } from "./Form";
export default async function Page() {
  const session = await getSession();
  const org = await getCurrentorg();
  if (!session || !org) redirect("/");
  return (
    <div className="relative box-border flex  h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-sm bg-[linear-gradient(-180deg,#eee,#fbfbfb)] pb-[3px] text-left shadow-[0_8px_14px_3px_#000]">
      <Skeleton>
        <main className="flex w-full min-w-[37.5rem] flex-col items-center justify-center gap-6 bg-white pb-16 pt-12">
          <Image src={default_company_logo} alt="" />
          <Form />
        </main>
      </Skeleton>
    </div>
  );
}
