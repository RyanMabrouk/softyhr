
import Image from "next/image";
import { headers } from "next/headers";
import getCurrentorg from "@/api/getCurrentOrg";

export default async function Home() {
  const current_org = await getCurrentorg();
  console.log(current_org);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-color1-400 p-24 text-color2-100">
     {current_org?.name}
    </main>
  );
}
