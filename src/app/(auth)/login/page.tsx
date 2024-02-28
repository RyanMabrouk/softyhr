import getSession from "@/api/getSession";
import { redirect } from "next/navigation";
import React from "react";
import { FlipEffectContainer } from "./_ui/FlipEffectContainer";
import getCurrentorg from "@/api/getCurrentOrg";
import { GetDomainName } from "./_getDomainForm/GetDomainName";
import { WhereIsMyDomain } from "./_getDomainForm/WhereIsMyDomain";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { LoginPage } from "./LoginPage";

export default async function Page() {
  const session = await getSession();
  const org = await getCurrentorg();
  if (session && org) redirect("/");
  return (
    <div className="bg-gray-gradient relative box-border  flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-sm pb-[3px] text-left shadow-[0_8px_14px_3px_#000]">
      {org ? (
        <FlipEffectContainer
          page1={<LoginPage />}
          page2={<ResetPasswordPage />}
        />
      ) : (
        <FlipEffectContainer
          page1={<GetDomainName />}
          page2={<WhereIsMyDomain />}
        />
      )}
    </div>
  );
}
