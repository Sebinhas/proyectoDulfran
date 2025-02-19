import { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: Date;
  read: boolean;
}

type FilterType = 'all' | 'unread';

const useNotificactions = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [notifications, setNotifications] = useState<Notification[]>([]);


  // const [notifications] = useState<Notification[]>([
  //   {
  //     id: '1',
  //     title: 'Nueva orden creada',
  //     message: 'Se ha creado una nueva orden #123',
  //     type: 'info',
  //     timestamp: new Date(),
  //     read: false
  //   },
  //   {
  //     id: '2',
  //     title: 'Factura recibida',
  //     message: 'La factura #1234567890 ha sido recibida',
  //     type: 'success',
  //     timestamp: new Date(Date.now() - 3600000),
  //     read: false
  //   },
  //   {
  //     id: '3',
  //     title: 'Orden completada',
  //     message: 'La orden #120 ha sido completada',
  //     type: 'success',
  //     timestamp: new Date(Date.now() - 86400000),
  //     read: true
  //   },
  //   {
  //     id: '4',
  //     title: 'Estado de la orden',
  //     message: 'El estado de la orden #123 ha sido actualizado',
  //     type: 'warning',
  //     timestamp: new Date(),
  //     read: false
  //   }
  // ]);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return days > 0
      ? `Hace ${days}d`
      : hours > 0
      ? `Hace ${hours}h`
      : minutes > 0
      ? `Hace ${minutes}m`
      : 'Ahora';
  };

  return {
    notifications,
    formatTimestamp,
    unreadCount,
    activeFilter,
    setActiveFilter
  };
};

export { useNotificactions };
