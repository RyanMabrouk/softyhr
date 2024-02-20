//profile header

export const changementRequest = []; /*[
  { label: "Asset request...", value: "" },
  { label: "Compensation...", value: "" },
  { label: "Emplyoment Status...", value: "" },
  { label: "Job Information...", value: "" },
  { label: "Promotion...", value: "" },
];*/
export const Settings = []; /* [
  { label: "Demande de signature", value: "" },
  { label: "Telechargement de formulaire", value: "" },
  { label: "Niveau d'accés BambooHR", description: "", value: "" },
  { label: "Réinitialiser le mot de passe de l'utilisateur", value: "" },
];*/

//profile personnal champs

import {
  FaFacebookSquare,
  FaHome,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import {
  MdOutlineCastForEducation,
  MdOutlineHomeWork,
  MdOutlineSmartphone,
  MdPhoneAndroid,
} from "react-icons/md";
import Input from "@/app/(dashboard)/people/components/Fileds/Input/Input";
import SelectInput from "@/app/(dashboard)/people/components/Fileds/select/Select";
import RadioBox from "@/app/(dashboard)/people/components/Fileds/RadioBox/RadioBox";
import DateInput from "@/app/(dashboard)/people/components/Fileds/DateInput/DateInput";
import { CiMail } from "react-icons/ci";
import { IconType } from "react-icons";
import { ReactNode } from "react";
import textarea from "@/app/(dashboard)/people/components/Fileds/textarea/textarea";

import dynamic from "next/dynamic";
import InputFile from "@/app/(dashboard)/people/components/Fileds/File/File";
import SelectUsers from "@/app/(dashboard)/people/components/Fileds/SelectUsers/SelectUsers";
import { IoSearchSharp } from "react-icons/io5";
import DateInputRange from "@/app/(dashboard)/people/components/Fileds/DateInputRange/DateInputRange";
import { BsTwitterX } from "react-icons/bs";
const Editor = dynamic(
  () => import("@/app/(dashboard)/people/components/Fileds/Editor/Editor"),
  { ssr: false },
);
interface FieldsObjectType {
  [key: string]: ReactNode;
}

export const Field: any = {
  TEXT: Input,
  NUMBER: Input,
  SELECT: SelectInput,
  DATE: DateInput,
  DATE_RANGE:DateInputRange,
  RADIO: RadioBox,
  TEXTAREA: textarea,
  EDITOR: Editor,
  FILE: InputFile,
  SELECT_USERS: SelectUsers,
};

export const sectionIcon: ObjectIconsType = {
  IMPROFILE: ImProfile,
  FAHOME: FaHome,
  MDOUTLINESMARTPHONE: MdOutlineSmartphone,
  MDOUTLINECASTFOREDUCATION: MdOutlineCastForEducation,
  IOIOSCHATBUBBLES: IoIosChatbubbles,
};

export const NewEmployeeSections = [
  "EDUCATION",
  "EMPLOYMENT STATUS",
  "BASIC INFORMATION",
  "ADDRESS",
  "SOCIAL LINKS",
  "CONTACT",
];

interface ObjectIconsType {
  [key: string]: IconType;
}

export const InputIcons: ObjectIconsType = {
  LINKEDIN: FaLinkedin,
  TWITTER: BsTwitterX,
  SQUARE: FaFacebookSquare,
  PINTEREST: FaPinterest,
  MDOUTLINEHOMEWORK: MdOutlineHomeWork,
  MDPHONEANDROID: MdPhoneAndroid,
  CIMAIL: CiMail,
  FAINSTAGRAM: FaInstagram,
  IOSEARCHSHARP: IoSearchSharp,
};
