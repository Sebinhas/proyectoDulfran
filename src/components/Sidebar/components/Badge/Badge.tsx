import { useLocation, useNavigate } from 'react-router-dom';
import { BadgeProps } from './DTOBadge';

export const Badge = ({ icon, title, route }: BadgeProps) => {
  const navigate = useNavigate();

  const isActive = useLocation().pathname === route;
  const isSalir = icon === 'salir';

  const renderIcon = () => {
    switch (icon) {
      case 'dashboard':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-layout-dashboard">
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
          </svg>
        );
      // case "pacientes":
      //   return (
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       width="24"
      //       height="24"
      //       viewBox="0 0 24 24"
      //       fill="none"
      //       stroke="currentColor"
      //       strokeWidth="2"
      //       strokeLinecap="round"
      //       strokeLinejoin="round"
      //       className="lucide lucide-users"
      //     >
      //       <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      //       <circle cx="9" cy="7" r="4" />
      //       <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      //       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      //     </svg>
      //   );
      case 'catalogo':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-square-chart-gantt">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 8h7" />
            <path d="M8 12h6" />
            <path d="M11 16h5" />
          </svg>
        );
      case 'ordenes':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-clipboard-pen-line">
            <rect width="8" height="4" x="8" y="2" rx="1" />
            <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5" />
            <path d="M16 4h2a2 2 0 0 1 1.73 1" />
            <path d="M8 18h1" />
            <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
          </svg>
        );
      case 'facturas':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-file-input">
            <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M2 15h10" />
            <path d="m9 18 3-3-3-3" />
          </svg>
        );
      case 'ajustes':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-settings">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
      case 'salir':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-log-out">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
        );
      default:
        return null; // Si no hay ícono, devuelve null
    }
  };

  return (
    <div
      onClick={() => navigate(route)}
      className={`${
        isActive
          ? 'bg-gray-600 font-semibold text-white'
          : isSalir
          ? 'font-bold text-red-600 hover:bg-red-100 transition-all duration-300'
          : 'text-gray-600 font-light hover:font-semibold hover:bg-gray-500 hover:text-white'
      } w-full h-[44px] pl-2 rounded-[4px] cursor-pointer flex flex-row gap-2 items-center transition-all duration-200`}>
      <div>{renderIcon()}</div>
      <div className="text-lg font-normal select-none">{title}</div>
    </div>
  );
};
