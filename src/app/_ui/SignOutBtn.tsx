"use server";
import signout from "@/actions/auth/signout";
export default async function SignOutBtn() {
  return (
    <form>
      <button formAction={signout}>
        <strong>log out</strong>
      </button>
    </form>
  );
}
