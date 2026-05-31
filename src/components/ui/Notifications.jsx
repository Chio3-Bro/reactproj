import { useNotifications } from "../../hooks/useNotifications";

function Notifications() {
  const { notification, hideNotification } = useNotifications();

  if (!notification) return null;

  return (
    <div className={`notification notification--${notification.type}`}>
      <span>{notification.message}</span>
      <button onClick={hideNotification}>×</button>
    </div>
  );
}

export default Notifications;
