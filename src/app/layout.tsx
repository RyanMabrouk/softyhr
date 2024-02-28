import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Hydration from "@/provider/hydration";
import Store from "@/provider/store";
import PopUp from "./_ui/_PopUp/PopUp";
import { ToastContainer, ToastProvider } from "@/hooks/useToast";
import dynamic from "next/dynamic";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  style: ["normal"],
});

const GrafanaWithoutSSR = dynamic(() => import("./Grafana"), { ssr: false });

export const metadata: Metadata = {
  title: "SoftyHr",
  description: "Manage your employees with ease",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["management", "softy hr", "company", "company management"],
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
              <GrafanaWithoutSSR />
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
