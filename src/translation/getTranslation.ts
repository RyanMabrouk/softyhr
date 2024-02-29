"use server";
import getData from "@/api/getData";
import { PostgrestError } from "@supabase/supabase-js";
const dictionaries: { [key: string]: () => Promise<{}> } = {
  "en-us": () => import("./lang/en.json").then((module) => module.default),
  fr: () => import("./lang/fr.json").then((module) => module.default),
};
export default async function getTranslation() {
  const {
    data: lang,
    error,
  }: {
    data: { preffered_lang: string }[] | null;
    error: PostgrestError | null;
  } = await getData("profiles", {
    user: true,
    column: "preffered_lang",
  });
  const dict = await dictionaries?.[lang?.[0]?.preffered_lang ?? "en-us"]?.();
  return {
    lang: dict as { [key: string]: string | { [key: string]: string } },
    error,
  };
}
