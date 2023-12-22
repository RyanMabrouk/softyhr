import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
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
  const session = await getSession();
  return (
    <html lang="en">
      <body className={lato.className}>{session?.user ? children : auth}</body>
    </html>
  );
}
