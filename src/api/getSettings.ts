"use server";
import getData from "./getData";
import getCurrentorg from "./getCurrentOrg";
export async function GetSettings(section: string) {
  try {
    const org = await getCurrentorg();
    const { data: org_settings, error } = await getData("settings", {
      match: { org_name: org?.name },
    }); 
    if (error) throw new Error(error.message);
    else {
      if (org_settings) return org_settings[0][section];
      else return null;
    }
  } catch (error) {
    console.log(error);
  }
}
