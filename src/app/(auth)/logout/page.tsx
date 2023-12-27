import getCurrentorg from "@/api/getCurrentOrg";
import { redirect } from "next/navigation";
import React from "react";
import Skeleton from "../login/_ui/Skeleton";
import Link from "next/link";
import { Button } from "../login/_ui/Button";
import getSession from "@/actions/getSession";
import bg_img from "/public/winter.png";
import Image from "next/image";
export default async function Page() {
  const org = await getCurrentorg();
  const session = await getSession();
  if (!org || session) redirect("/");
  return (
    <div className="max-w-screen relative flex max-h-screen flex-col">
      <Image className="h-[50dvh] w-screen object-cover" src={bg_img} alt="" />
      <div className="box-border h-screen w-screen overflow-hidden bg-[linear-gradient(-180deg,#eee,#fbfbfb)] pb-[3px] text-left"></div>
      <div className="box-borde absolute inset-0 flex h-screen w-screen items-center justify-center  overflow-hidden">
        <Skeleton>
          <main className="flex w-full min-w-[min(50rem,100vw)] flex-col items-center justify-center gap-3 bg-white px-[auto] pb-8 pt-6 ">
            <h1 className="mx-0 text-3xl font-bold leading-9 text-fabric-700">
              Ciao.
            </h1>
            <p className=" mb-5 text-lg font-normal text-gray-21">
              You're all safe and logged out. Enjoy the rest of your day.
            </p>
            <Link href="/login">
              <Button>{"Log Back In »"}</Button>
            </Link>
          </main>
        </Skeleton>
      </div>
    </div>
  );
}
