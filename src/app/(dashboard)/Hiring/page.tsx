import { HirinSections } from "@/constants/Hiring";
import { redirect } from "next/navigation";

export default async function Page() {
  redirect(HirinSections[0]?.path);
}
