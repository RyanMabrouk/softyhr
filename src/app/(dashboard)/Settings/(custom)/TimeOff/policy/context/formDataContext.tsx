"use client";
import { createContext, useState } from "react";

const FormDataContext = createContext({});
export default FormDataContext;

export type FormDataContextContextType = Partial<{
  formData: FormData | null;
  setFormData: React.Dispatch<React.SetStateAction<FormData | null>>;
}>;
export function FormDataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formData, setFormData] = useState<FormData | null>(null);
  return (
    <FormDataContext.Provider
      value={{
        formData,
        setFormData,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
}
