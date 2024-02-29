"use server";
import getData from "@/api/getData";
import { PostgrestError } from "@supabase/supabase-js";
const dictionaries = {
  "en-us": () => import("./lang/en.json").then((module) => module.default),
  fr: () => import("./lang/fr.json").then((module) => module.default),
};
export default async function getTranslation() {
  const {
    data: lang,
    error,
  }: {
    data: { preffered_lang: "en-us" | "fr" }[] | null;
    error: PostgrestError | null;
  } = await getData("profiles", {
    user: true,
    column: "preffered_lang",
  });
  const dict =
    lang?.[0]?.preffered_lang === "fr"
      ? await dictionaries?.fr?.()
      : await dictionaries?.["en-us"]?.();
  return {
    lang: dict,
    error,
  };
}
