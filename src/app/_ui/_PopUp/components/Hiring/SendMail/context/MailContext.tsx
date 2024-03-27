import React, { ReactNode, createContext, useState } from "react";

export const MailContext = createContext({});

export interface attachmentsType {
  path: string;
  file_name: string;
  org_name: string;
  size: number;
  file_type: string;
}
export interface MailType {
  email_object: string | null;
  email_html: string | null;
  attachment?: attachmentsType[];
}

export type MailContextType = Partial<{
  Mail: MailType | null;
  setMail: React.Dispatch<React.SetStateAction<MailType>>;
}>;

interface MailProviderPropsType {
  children: ReactNode;
}

function MailProvider({ children }: MailProviderPropsType) {
  const [Mail, setMail] = useState<MailType>();

  return (
    <MailContext.Provider value={{ Mail, setMail }}>
      {children}
    </MailContext.Provider>
  );
}

export default MailProvider;
