import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useNotificactions } from './Components/Notificactions/useNotificactions';

export const useHeaderDashboard = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications } = useNotificactions();
  const unreadCount = notifications.filter((notif: any) => !notif.read).length;

  const handleShowNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return {
    navigate,
    showNotifications,
    unreadCount,
    handleShowNotifications
  };
};
