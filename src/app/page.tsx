"use server";
import signout from "@/actions/auth/signout";
import getCurrentorg from "@/api/getCurrentOrg";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const current_org = await getCurrentorg();
  if (current_org) redirect("/home");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-color1-400 p-24 text-color2-100">
      <h1>landing page</h1>
      <Link href="/login">
        <strong>Log in</strong>
      </Link>
      <Link href="/signup">
        <strong>sign up</strong>
      </Link>
      <SignOutBtn />
    </main>
  );
}
function SignOutBtn() {
  return (
    <form>
      <button formAction={signout}>
        <strong>log out</strong>
      </button>
    </form>
  );
}
