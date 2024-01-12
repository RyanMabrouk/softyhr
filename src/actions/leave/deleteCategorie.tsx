"use server";
export default async function deleteCategorie({
  user_id,
  categories_id,
}: {
  categories_id: number;
  user_id: string | string[];
}) {
  console.log("🚀 ~ categorie_id:", categories_id);
  console.log("🚀 ~ user_id:", user_id);
  return {
    error: {
      message: "Error",
      type: "error",
    },
  };
}
