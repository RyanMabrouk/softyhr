import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Hydration from "@/provider/hydration";
import Store from "@/provider/store";
import PopUp from "./_ui/_PopUp/PopUp";
import { ToastContainer, ToastProvider } from "@/hooks/useToast";
import Head from "next/head";
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
      <Head>
        <title>SoftyHr</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-128x128.png" />
        <link rel="icon" href="/icons/icon-128x128.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
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
