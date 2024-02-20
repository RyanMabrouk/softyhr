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
  { label: "Niveau d'accés BambooHR", description: "", action: () => "" },
  { label: "Réinitialiser le mot de passe de l'utilisateur", action: () => "" },
];

import Input from "@/app/(dashboard)/people/components/Fileds/Input/Input";
import SelectInput from "@/app/(dashboard)/people/components/Fileds/select/Select";
import Date from "@/app/(dashboard)/people/components/Fileds/DateInput/DateInput";
import RadioBox from "@/app/(dashboard)/people/components/Fileds/RadioBox/RadioBox";
import FiledsChamps from "@/app/(dashboard)/people/components/Fileds/Fileds";
import TableChamps from "@/app/(dashboard)/people/components/Fileds/TableChamps";
import textarea from "@/app/(dashboard)/people/components/Fileds/textarea/textarea";
import Editor from "@/app/(dashboard)/people/components/Fileds/Editor/Editor";
import InputFile from "@/app/(dashboard)/people/components/Fileds/File/File";
import SelectUsers from "@/app/(dashboard)/people/components/Fileds/SelectUsers/SelectUsers";
import Education from "@/app/(dashboard)/people/components/Fileds/Education/Education";
import DateInputRange from "@/app/(dashboard)/people/components/Fileds/DateInputRange/DateInputRange";

export const Field: any = {
  TEXT: Input,
  NUMBER: Input,
  SELECT: SelectInput,
  DATE: Date,
  RADIO: RadioBox,
  DATE_RANGE: DateInputRange,
  TEXTAREA: textarea,
  EDITOR: Editor,
  FILE: InputFile,
  SELECT_USERS: SelectUsers,
};

export const Section: any = {
  "Visa Information": TableChamps,
  "Driver License": TableChamps,
  Education: Education,
  "Employment Status": TableChamps,
  Compensation: TableChamps,
  "Job Information": TableChamps,
  Bonus:TableChamps
};


