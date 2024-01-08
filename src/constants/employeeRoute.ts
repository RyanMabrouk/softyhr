import { FaAddressCard } from "react-icons/fa";

export const EmployeeRoute = [
  {
    rang: 1,
    label: "personnal",
    path: (employeId: string) => `/people/${employeId}/personnal`,
    defaultPath: true,
    icon: FaAddressCard,
  },
  {
    rang: 2,
    label: "job",
    path: (employeId: string) => `/people/${employeId}/job`,
    defaultPath: true,
  },
  {
    rang: 3,
    label: "TimeOff",
    path: (employeId: string) => `/people/${employeId}/TimeOff`,
    defaultPath: true,
  },
  {
    rang: 4,
    label: "Performance",
    path: (employeId: string) => `/people/${employeId}/Performance`,
    defaultPath: true,
  },
  {
    rang: 5,
    label: "Benefits",
    path: (employeId: string) => `/people/${employeId}/Benefits`,
    defaultPath: true,
  },
  {
    rang: 6,
    label: "Documents",
    path: (employeId: string) => `/people/${employeId}/Documents`,
    defaultPath: true,
  },
  {
    rang: 7,
    label: "Assets",
    path: (employeId: string) => `/people/${employeId}/Assets`,
    defaultPath: true,
  },
  {
    rang: 8,
    label: "COVID-19",
    path: (employeId: string) => `/people/${employeId}/COVID-19`,
    defaultPath: true,
  },
];

export interface EmployeRoutesType {
  rang: number;
  label: string;
  path: (arg: string) => string;
  defaultPath: boolean;
}
