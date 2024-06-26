import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Hydration from "@/provider/hydration";
import Store from "@/provider/store";
import PopUp from "./_ui/_PopUp/PopUp";
import { ToastContainer, ToastProvider } from "@/hooks/useToast";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "SoftyHr",
  description: "Manage your employees with ease",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "management",
    "softy hr",
    "company",
    "company management",
    "softyhr",
    "hr",
    "hr management",
    "employee",
    "human resources",
    "human resources management",
    "employee management",
    "employee hr",
    "softy",
  ],
  authors: [
    {
      name: "Softylines",
      url: "https://www.linkedin.com/company/softylines/",
    },
  ],
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
            <ToastProvider>
              <ToastContainer />
              <PopUp />
              {children}
            </ToastProvider>
          </Hydration>
        </Store>
      </body>
    </html>
  );
}
