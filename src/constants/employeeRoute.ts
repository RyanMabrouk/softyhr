import useTranslation from "@/translation/useTranslation";

export function useEmployeeRoute(): EmployeRoutesType[] {
  const { lang } = useTranslation();
  return [
    {
      rang: 1,
      label: lang?.["Personal"]?.["Personal"] as string,
      path: (employeId: string) => `/people/${employeId}/personnal`,
      defaultPath: true,
      RoleGuard: {
        permissions: [],
        strict: true,
      },
    },
    {
      rang: 2,
      label: lang?.["Job"]?.["Job"] as string,
      path: (employeId: string) => `/people/${employeId}/job`,
      defaultPath: true,
      RoleGuard: {
        permissions: [],
        strict: true,
      },
    },
    {
      rang: 3,
      label: lang?.["Time Off"]["Time Off"] as string,
      path: (employeId: string) => `/people/${employeId}/TimeOff`,
      defaultPath: true,
      RoleGuard: {
        permissions: [
          "read:Employees policies",
          "read:Employees upcoming time off",
          "read:Employees history",
        ],
        strict: false,
      },
    },
    /*{
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
  },*/
  ];
}

export interface EmployeRoutesType {
  rang: number;
  label: string;
  path: (arg: string) => string;
  defaultPath: boolean;
  RoleGuard: {
    permissions: string[];
    strict: boolean;
  };
}
