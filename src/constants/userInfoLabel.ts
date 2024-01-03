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

//profile personnal

const PersonnalFields = [
  {
    rang: 7,
    Row: [
      {
        name: "Téléphone au travail",
        fieldType: "text",
        required: true,
      },
      {
        name: "Prénom",
        fieldType: "text",
        required: true,
      },
      {
        name: "Nom de famille",
        fieldType: "text",
        required: true,
      },
    ],
  },
  {
    rang: 2,
    Row: [
      {
        name: "NAS",
        fieldType: "number",
        required: true,
      },
    ],
  },
  {
    rang: 3,
    Row: [
      {
        name: "# d'employé",
        fieldType: "text",
        required: true,
      },
      {
        name: "Statut",
        fieldType: "text",
        required: true,
      },
    ],
  },
  {
    rang: 7,
    Row: [
      {
        name: "Date de naissance",
        fieldType: "Date",
        required: true,
        ExtraTxt: "Age",
      },
    ],
  },
  {
    rang: 8,
    Row: [
      {
        name: "Sexe",
        fieldType: "text",
        required: true,
      },
      {
        name: "NIN",
        fieldType: "text",
        required: false,
      },
    ],
  },
  {
    rang: 7,
    Row: [
      {
        name: "Taille de t-shirt",
        fieldType: "text",
        required: false,
      },
    ],
  },
  {
    rang: 1,
    Row: [
      {
        name: "Allergies",
        fieldType: "text",
        required: false,
      },
      {
        name: "Nationalité",
        fieldType: "select",
        options: [
          { value: "test1", label: "test1" },
          { value: "test2", label: "test2" },
          { value: "test3", label: "test3" },
        ],
        required: false,
      },
    ],
  },
  {
    rang: 8,
    Row: [
      {
        name: "test",
        fieldType: "radio",
        options: ["test1", "test2", "test3"],
        required: false,
      },
    ],
  },
];

//profile personnal champs

import { FaHome } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { MdOutlineCastForEducation, MdOutlineSmartphone } from "react-icons/md";
import Input from "@/app/(dashboard)/people/components/Fileds/Input/Input";
import SelectInput from "@/app/(dashboard)/people/components/Fileds/select/Select";
import Date from "@/app/(dashboard)/people/components/Fileds/DateInput/DateInput";
import RadioBox from "@/app/(dashboard)/people/components/Fileds/RadioBox/RadioBox";
import FiledsChamps from "@/app/(dashboard)/people/components/Fileds/Fileds";
import Education from "@/app/(dashboard)/people/components/Fileds/Education";
import TableChamps from "@/app/(dashboard)/people/components/Fileds/TableChamps";

export const PersonnalChamps = [
  { rang: 1, champ: "personnal", Icon: ImProfile, Fields: PersonnalFields },
  { rang: 2, champ: "Adresse", Icon: FaHome, Fields: PersonnalFields },
  {
    rang: 3,
    champ: "Contact",
    Icon: MdOutlineSmartphone,
    Fields: PersonnalFields,
  },
  {
    rang: 4,
    champ: "Éducation",
    Icon: MdOutlineCastForEducation,
    Fields: PersonnalFields,
  },
  {
    rang: 5,
    champ: "Liens sociaux",
    Icon: IoIosChatbubbles,
    Fields: PersonnalFields,
  },
  {
    rang: 6,
    champ: "Informations de visa",
    Icon: MdOutlineCastForEducation,
    Fields: PersonnalFields,
  },
  {
    rang: 7,
    champ: "Permis de conduire ",
    Icon: MdOutlineCastForEducation,
    Fields: PersonnalFields,
  },
];

export const Field: any = {
  TEXT: Input,
  NUMBER: Input,
  SELECT: SelectInput,
  DATE: Date,
  RADIO: RadioBox,
};

export const Section: any = {
  "Visa Information": TableChamps,
  "Driver License": TableChamps,
  Education: Education,
};
