import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Hydration from "@/provider/hydration";
import Store from "@/provider/store";
import PopUp from "./_ui/_PopUp/PopUp";

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
  return (
    <html lang="en">
      <body className={lato.className + " min-h-screen"}>
        <Store>
          <Hydration>
            <PopUp />
            {children}
          </Hydration>
        </Store>
      </body>
    </html>
  );
}
