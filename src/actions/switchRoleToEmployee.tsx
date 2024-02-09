"use server";
import updateData from "@/api/updateData";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function switchRoleToEmployee() {
  const supabase = createServerActionClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user_id = session?.user?.id;
  const { error } = await updateData(
    "permissions",
    { role_id: 2 },
    { user_id: user_id as string },
  );
  console.error("error -->", error);
}
export async function switchRoleToAdmin() {
  const supabase = createServerActionClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user_id = session?.user?.id;
  const { error } = await updateData(
    "permissions",
    { role_id: 1 },
    { user_id: user_id as string },
  );
  console.error("error -->", error);
}
