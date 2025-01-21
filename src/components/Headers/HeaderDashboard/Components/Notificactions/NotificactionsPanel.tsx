import { useNotificactions } from './useNotificactions';
import NotifiactionStyle from './Components/NotifiactionStyle';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
  const { notifications, formatTimestamp, activeFilter, setActiveFilter, unreadCount } =
    useNotificactions();

  if (!isOpen) return null;

  const filteredNotifications =
    activeFilter === 'all' ? notifications : notifications.filter((n) => !n.read);

  return (
    <div
      className="fixed right-4 top-[60px]  w-[380px] max-w-[calc(100vw-2rem)] bg-white 
      rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-semibold text-gray-900">Notificaciones</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 
              transition-all duration-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200
              ${
                activeFilter === 'all'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-blue-500 hover:bg-blue-50'
              }`}>
            Todas
          </button>
          <button
            onClick={() => setActiveFilter('unread')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200
              ${
                activeFilter === 'unread'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-blue-500 hover:bg-blue-50'
              }
              ${unreadCount > 0 ? 'flex items-center text-blue-600 gap-2' : ''}`}>
            No leídas
          </button>
        </div>
      </div>

      {/* Lista de notificaciones */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="rounded-full bg-gray-50 p-3 mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-sm text-center">
              {activeFilter === 'unread'
                ? 'No hay notificaciones sin leer'
                : 'No hay notificaciones'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`group relative flex gap-4 px-4 py-3 hover:bg-gray-50 
                  transition-colors duration-200 ${notification.read ? 'bg-gray-100/50' : ''}`}>
                {/* Icono */}
                <div className="flex-shrink-0">
                  {NotifiactionStyle({ type: notification.type })}
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0 cursor-default">
                  <div className="flex items-start justify-between gap-x-2">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {notification.title}
                    </p>
                    <span className="flex-shrink-0 flex text-xs text-gray-500">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{notification.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {filteredNotifications.length > 0 && (
        <div className="sticky bottom-0 bg-white px-4 py-3 border-t border-gray-100">
          <button
            className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 
            hover:bg-blue-100 rounded-lg transition-colors duration-200 focus:outline-none 
            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Ver todas las notificaciones
          </button>
        </div>
      )}
    </div>
  );
};
