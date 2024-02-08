import React, { ReactNode, createContext, useState } from 'react'

export const MailContext = createContext({});

export interface Mail {
  email_object: string | null;
  email_html: string | null;
}

 export type MailContextType = Partial<{
   Mail: Mail | null;
   setMail: React.Dispatch<React.SetStateAction<Mail>>;
 }>;
 
 interface MailProviderPropsType {
    children:ReactNode;
 }

function MailProvider({children}:MailProviderPropsType) {
    const [Mail, setMail] = useState<Mail>();

  return (
    <MailContext.Provider value={{Mail, setMail}}>{children}</MailContext.Provider>
  )
}

export default MailProvider