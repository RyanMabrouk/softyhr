"use server";
import getData from "@/api/getData";
import postData from "@/api/postData";
export default async function isertuserspermessions() {
  const { data: users, error: error1 } = await getData("profiles", {
    column: "role_id,user_id,org_name,files_ids",
  });
  console.log(users);
  console.error(error1);
  const { data, error } = await postData(
    "permissions",
    users?.map((user: any) => ({
      role_id: Number(user.role_id),
      user_id: user.user_id,
      org_name: user.org_name,
      files_ids: user.files_ids,
    })),
  );
  console.error("error -->", error);
  console.log(data);
}
