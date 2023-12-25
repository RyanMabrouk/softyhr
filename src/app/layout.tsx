import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { redirect } from "next/navigation";
import getCurrentorg from "@/api/getCurrentOrg";
import Layout from "./layout/layout";
import Hydration from "@/provider/hydration";
import Store from "@/provider/store";

import getSession from "@/actions/getSession";
const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "SoftyHr",
  description: "Manage your employees with ease",
};

export default async function RootLayout({
  children,
  auth,
  dashboard,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
  dashboard: React.ReactNode;
}) {
  const current_org = await getCurrentorg();
  //if (!current_org) redirect("/");
  const session = await getSession();
  return (
    <html lang="en">
      <body className={lato.className + " min-h-screen"}>
        <Store>
          <Hydration>
            <Layout />
            {children}
          </Hydration>
        </Store>
        {/*session ? children : auth*/}
      </body>
    </html>
  );
}
