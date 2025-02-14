import { useAuthStore } from '../../../hooks/authStore.ts';
import { Help } from './Components/Help/Help.tsx';
import { NotificationsPanel } from './Components/Notificactions/NotificactionsPanel.tsx';
import { useHeaderDashboard } from './UseHeaderDashboard.ts';

export const HeaderDashboard = () => {
  const { user } = useAuthStore();
  const { showNotifications, handleShowNotifications, unreadCount } =
    useHeaderDashboard();

  return (
    <div className="w-full h-[80px]  p-4 pr-8 flex flex-row justify-end items-center">
      <div className="flex flex-row gap-6 items-center">
        <Help />

        <div className="relative">
          <div onClick={handleShowNotifications} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-bell">
              <path d="M10.268 21a2 2 0 0 0 3.464 0" />
              <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
            </svg>
            {/* Contador de notificaciones */}
            {unreadCount > 0 && (
              <div
                className={`${
                  unreadCount > 99 ? '-top-2.5 -right-4' : '-top-2.5 -right-2'
                } absolute bg-red-500 text-white text-[11px] 
            font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center
            px-1 border-2 transform transition-transform duration-200`}>
                {unreadCount > 99 ? '99+' : unreadCount}
              </div>
            )}
          </div>
          <NotificationsPanel
            isOpen={showNotifications}
            onClose={() => handleShowNotifications()}
          />
        </div>
        <div className="flex flex-row gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-user">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="10" r="3" />
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
          </svg>
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-gray-600">
              {user?.username || 'Undefined'}
            </div>
            <div className="text-xs">{user?.profile_type || 'Undefined'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
