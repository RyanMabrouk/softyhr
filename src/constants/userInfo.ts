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

//profile personnal champs

import { FaHome } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { MdOutlineCastForEducation, MdOutlineSmartphone } from "react-icons/md";
import Input from "@/app/(dashboard)/people/components/Fileds/Input/Input";
import SelectInput from "@/app/(dashboard)/people/components/Fileds/select/Select";
import RadioBox from "@/app/(dashboard)/people/components/Fileds/RadioBox/RadioBox";
import DateInput from "@/app/(dashboard)/people/components/Fileds/DateInput/DateInput";

export const Field: any = {
  TEXT: Input,
  NUMBER: Input,
  SELECT: SelectInput,
  DATE: DateInput,
  RADIO: RadioBox,
};

export const sectionIcon: any = {
  ImProfile: ImProfile,
  FAHOME: FaHome,
  MDOUTLINESMARTPHONE: MdOutlineSmartphone,
  MDOUTLINECASTFOREDUCATION: MdOutlineCastForEducation,
  IOIOSCHATBUBBLES: IoIosChatbubbles,
};
