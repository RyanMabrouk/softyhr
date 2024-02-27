import React, { ReactNode, createContext, useState } from 'react'

export const MailContext = createContext({});

export interface MailType {
  email_object: string | null;
  email_html: string | null;
}

 export type MailContextType = Partial<{
   Mail: MailType | null;
   setMail: React.Dispatch<React.SetStateAction<MailType>>;
 }>;
 
 interface MailProviderPropsType {
    children:ReactNode;
 }

function MailProvider({children}:MailProviderPropsType) {
    const [Mail, setMail] = useState<MailType>();

  return (
    <MailContext.Provider value={{Mail, setMail}}>{children}</MailContext.Provider>
  )
}

export default MailProvider