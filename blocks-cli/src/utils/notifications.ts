  export const NotificationSupported = () => {
    return "Notification" in window;
  }

  export const getNotificationPermission = async () => {
    if (!NotificationSupported()) return;
    await Notification.requestPermission().then((result) => {
    })
  }