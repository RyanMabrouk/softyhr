"use client";
import { notification } from "antd";
type NotificationType = "success" | "info" | "warning" | "error";
notification.config({
  placement: "topRight",
  duration: 10,
  rtl: true,
});
export default function useToast() {
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
