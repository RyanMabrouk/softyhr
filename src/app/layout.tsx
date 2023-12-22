import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { redirect } from "next/navigation";
import getCurrentorg from "@/api/getCurrentOrg";
import Layout from "./layout/layout";

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
}: {
  children: React.ReactNode;
}) {
  const current_org = await getCurrentorg();
  if (!current_org) redirect("/");
  return (
    <html lang="en">
      <body className={lato.className + " min-h-screen"}>
        <Layout />
        {children}
      </body>
    </html>
  );
}
