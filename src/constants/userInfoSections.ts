//profile header

export const changementRequest = [
  { label: "Asset request...", action: () => "" },
  { label: "Compensation...", action: () => "" },
  { label: "Emplyoment Status...", action: () => "" },
  { label: "Job Information...", action: () => "" },
  { label: "Promotion...", action: () => "" },
];
export const Settings = [
  { label: "Demande de signature", action: () => "" },
  { label: "Telechargement de formulaire", action: () => "" },
  { label: "Niveau d'accés SoftyHR", description: "", action: () => "" },
  { label: "Réinitialiser le mot de passe de l'utilisateur", action: () => "" },
];
import Education from "@/app/(dashboard)/people/components/Fileds/Education/Education";
import TableChamps from "@/app/(dashboard)/people/components/sections/TableChamps";

export const Section: any = {
  "Visa Information": TableChamps,
  "Driver License": TableChamps,
  Education: Education,
  "Employment Status": TableChamps,
  Compensation: TableChamps,
  "Job Information": TableChamps,
  Bonus:TableChamps
};


