import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Hydration from "@/provider/hydration";
import Store from "@/provider/store";

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
  auth: React.ReactNode;
  dashboard: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lato.className + " min-h-screen"}>
        <Store>
          <Hydration>
            {children}
          </Hydration>
        </Store>
      </body>
    </html>
  );
}
