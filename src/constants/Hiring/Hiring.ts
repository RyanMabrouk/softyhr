import { TiClipboard } from "react-icons/ti";
import { RxAvatar } from "react-icons/rx";
import { RiUserStarFill } from "react-icons/ri";
import { IconType } from "react-icons";
import { FaCircleUser } from "react-icons/fa6";

export const HirinSections = [
  { label: "Job Opening", path: "/Hiring/jobs", Icon: "TICLIPBOARD" },
  { label: "Candidates", path: "/Hiring/candidates", Icon: "FACIRCLEUSER" },
  {
    label: "Talent Pools",
    path: "/Hiring/talent-pools",
    Icon: "RIUSERSTARFILL",
  },
];

export interface HirinSectionsType {
  label: string;
  path: string;
  Icon: string;
}

type HirinIconsType<T> = {
  [key: string]: T;
};

export const HirinIcons: HirinIconsType<IconType> = {
  TICLIPBOARD: TiClipboard,
  FACIRCLEUSER: FaCircleUser,
  RIUSERSTARFILL: RiUserStarFill,
};
export const CreateHiringJob: string[] = [
  "Information-Job",
  "Application-Details",
  "Job-Boards",
];

export const HiringInfos: HiringInfosType[] = [
  { label: "Location", name: "Job Location" },
  { label: "Department", name: "Departement" },
  { label: "Employment Type", name: "Employment Type" },
  { label: "Minimum Experience", name: "Minimum Experience" },
];
export type HiringInfosType = {
  label: string;
  name: string;
};

export const FieldsAplyment = [
  {
    name: "Country",
    type: "text",
    required: true,
  },
  {
    name: "Country",
    type: "text",
    required: true,
  },
];

export const InformationJob_inputs = [
  { RowField: { name: "Job Location", type: "text" } },
  { RowField: { name: "Internal Job Code", type: "text" } },
];

export const ApplicationDefaultQuestions: ApplicationDefaultQuestionsType[] = [
  {
    required: false,
    AddToAppliement: false,
    type: "file",
    name: "Resume",
  },
  { required: false, AddToAppliement: false, type: "text", name: "Adress" },
  { required: false, AddToAppliement: false, type: "text", name: "Linked URL" },
  {
    required: false,
    AddToAppliement: false,
    type: "Date",
    name: "Date available",
  },
  {
    required: false,
    AddToAppliement: false,
    type: "text",
    name: "Desired Salary",
  },
  {
    required: false,
    AddToAppliement: false,
    type: "file",
    name: "Cover Letter",
  },
  {
    required: false,
    AddToAppliement: false,
    type: "text",
    name: "Referred by",
  },
  {
    required: false,
    AddToAppliement: false,
    type: "text",
    name: "Website, Blog or Portfolio",
  },
  {
    required: false,
    AddToAppliement: false,
    type: "text",
    name: "Twitter Username",
  },
  {
    required: false,
    AddToAppliement: false,
    type: "text",
    name: "Highest Education",
  },
  {
    required: false,
    AddToAppliement: false,
    type: "text",
    name: "College/University",
  },
  { required: false, AddToAppliement: false, type: "text", name: "References" },
];

export const ApplicationIniTialQuestions: any = {
  Resume: {
    required: false,
    AddToAppliement: false,
    type: "file",
    accept: "application/pdf, application/vnd.ms-excel",
    name: "Resume",
  },
  Adress: {
    required: false,
    AddToAppliement: false,
    type: "text",
    name: "Adress",
  },
  "Linked URL": {
    required: false,
    AddToAppliement: false,
    type: "text",
    name: "Linked URL",
  },
  "Date available": {
    required: false,
    AddToAppliement: false,
    type: "Date",
    name: "Date available",
  },
  "Desired Salary": {
    required: false,
    AddToAppliement: false,
    type: "text",
    name: "Desired Salary",
  },
  "Cover Letter": {
    required: false,
    AddToAppliement: false,
    type: "file",
    accept: "application/pdf, application/vnd.ms-excel",
    name: "Cover Letter",
  },
  "Referred by": {
    required: false,
    AddToAppliement: false,
    type: "text",
    name: "Referred by",
  },
  "Website, Blog or Portfolio": {
    required: false,
    AddToAppliement: false,
    type: "text",
    name: "Website, Blog or Portfolio",
  },
  "Twitter Username": {
    required: false,
    AddToAppliement: false,
    type: "text",
    name: "Twitter Username",
  },
  "Highest Education Obtained": {
    required: false,
    AddToAppliement: false,
    type: "text",
    name: "Highest Education",
  },
  "College/University": {
    required: false,
    AddToAppliement: false,
    type: "text",
    name: "College/University",
  },
  References: {
    required: false,
    AddToAppliement: false,
    type: "text",
    name: "References",
  },
};

export interface ApplicationDefaultQuestionsType {
  required: boolean;
  type: string;
  AddToAppliement: boolean;
  name: string;
}

export const GovermentJobCategory = [
  "Sales Workers",
  "Services Workers",
  "Professinals",
  "Operatives",
  "Laborers and Helpers",
  "Craft Workers",
  "Administrative Support Workers",
  "Technicians",
  "First/ Mid Level Officials and Managers",
  "Executive/ Senior Level Officials and Managers",
];
