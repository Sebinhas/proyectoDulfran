import { useLocation, useNavigate } from 'react-router-dom';
import { BadgeProps } from './DTOBadge';
import { AiOutlineNotification } from "react-icons/ai"; //icono de bitacora
import { LuFileInput } from "react-icons/lu"; //icono de usuarios - clientes
import { LuUsers } from "react-icons/lu"; //icono de usuarios - clientes
import { LuLogOut } from "react-icons/lu"; //icono de salir
import { LuMessageSquareWarning } from "react-icons/lu"; //icono de reportes
import { IoNotificationsOutline } from "react-icons/io5"; //icono de notificaciones
import { LuUser } from "react-icons/lu"; //icono de perfil
import { MdPayment } from "react-icons/md"; //icono de pagos
import { LuMessagesSquare } from "react-icons/lu"; //icono de Gestion de PQR
import { LuMessageSquareText } from "react-icons/lu"; //icono de Mis PQR
import { LuFilePen } from "react-icons/lu"; //Gestion de contratos
export const Badge = ({ icon, title, route }: BadgeProps) => {
  const navigate = useNavigate();

  const isActive = useLocation().pathname === route;
  const isSalir = icon === 'salir';

  const renderIcon = () => {
    switch (icon) {
      case 'notificaciones': return(<IoNotificationsOutline />);
      case 'pqrManagement': return (<LuMessagesSquare />);
      case 'reportes': return(<LuMessageSquareWarning />);
      case 'bitacora': return(<AiOutlineNotification />);
      case 'pqr': return(<LuMessageSquareText />);
      case 'facturas': return(<LuFileInput />);
      case 'contratos': return(<LuFilePen />);
      case 'usuarios': return (<LuUsers />);
      case 'pagos': return(<MdPayment />);
      case 'clientes': return(<LuUser />);
      case 'salir': return(<LuLogOut />);
      case 'perfil': return(<LuUser />);
      default:
        return null; // Si no hay ícono, devuelve null
    }
  };

  return (
    <div
      onClick={() => navigate(route)}
      className={`${
        isActive
          ? 'bg-gray-100 font-semibold text-[#101C42]'
          : isSalir
          ? 'font-bold text-slate-200 hover:bg-red-100 hover:text-red-600 transition-all duration-300'
          : 'text-gray-300 font-light hover:font-semibold hover:bg-gray-200 hover:text-[#101C42]'
      } w-full h-[44px] pl-2 rounded-[4px] cursor-pointer flex flex-row gap-2 items-center transition-all duration-200`}>
      <div className='text-2xl'>{renderIcon()}</div>
      <div className="text-lg font-normal select-none">{title}</div>
    </div>
  );
};
