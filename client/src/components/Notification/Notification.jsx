import { showNotification } from "@mantine/notifications";

export const Notification = (config) => {
  const notificationConfig = {
    id: Math.random().toString(),
    disallowClose: false,
    autoClose: 5000,
    loading: false,
  };
  showNotification({
    ...notificationConfig,
    title: config.title,
    message: config.message ? config.message : "",
    color: config.color,
    icon: config.icon,
  });
};
