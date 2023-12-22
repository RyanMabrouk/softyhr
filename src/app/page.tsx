import getCurrentorg from "@/api/getCurrentOrg";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function page() {
  const current_org = await getCurrentorg();
  if (current_org) redirect("/home");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-color1-400 p-24 text-color2-100">
      "landing page"
    </main>
  );
}
