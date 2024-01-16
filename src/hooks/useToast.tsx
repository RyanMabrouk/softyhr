"use client";
import { createContext, useContext } from "react";
import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

notification.config({
  placement: "topRight",
  duration: 10,
  rtl: true,
});

function createToast() {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string,
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  const toast = {
    success(message: string, description: string = "") {
      openNotificationWithIcon("success", description, message);
    },
    error(message: string, description: string = "") {
      openNotificationWithIcon("error", description, message);
    },
    warning(message: string, description: string = "") {
      openNotificationWithIcon("warning", description, message);
    },
    info(message: string, description: string = "") {
      openNotificationWithIcon("info", description, message);
    },
  };

  return { toast: toast, toastContainer: contextHolder };
}
type ToastType = Partial<{
  toast: {
    success(message: string, description?: string): void;
    error(message: string, description?: string): void;
    warning(message: string, description?: string): void;
    info(message: string, description?: string): void;
  };
  toastContainer: React.ReactNode;
}>;
// Context
const toastContext = createContext<ToastType>({}); // Update the createContext type

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toast, toastContainer } = createToast();
  return (
    <toastContext.Provider value={{ toast, toastContainer }}>
      {children}
    </toastContext.Provider>
  );
}

export default function useToast() {
  const { toast, toastContainer } = useContext(toastContext);
  if (!toast || !toastContainer)
    throw new Error("useToast must be used within a ToastProvider");
  return { toast: toast, toastContainer: toastContainer };
}
export function ToastContainer() {
  const { toastContainer } = useContext(toastContext);
  return <>{toastContainer}</>;
}
