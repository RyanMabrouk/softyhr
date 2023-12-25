"use server";
import getData from "./getData";
import getCurrentorg from "./getCurrentOrg";
export async function GetSettings(section: string) {
  try {
    const org = await getCurrentorg();
    const { data: settings, error } = await getData("settings");
    if (error) throw new Error(error.message);
    else {
      const org_settings = settings?.filter(
        (setting) => setting.org_name === org?.name,
      )[0];
      if (settings && org_settings) return org_settings[section];
      else return null;
    }
  } catch (error) {
    console.log(error);
  }
}
