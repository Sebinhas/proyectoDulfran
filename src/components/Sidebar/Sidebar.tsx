import { Badge } from './components/Badge/Badge.tsx';
import { useAuthStore } from '../../hooks/authStore';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };


  return (
    <div className="w-full left-0 top-0 fixed max-w-[270px] h-full px-4 pt-3 flex flex-col gap-5 bg-[#101C42]">
      <div className="w-full h-[60px] flex flex-row justify-center items-center bg-slate-400">
        Logo
      </div>
      <div className="flex flex-col justify-between pb-1 h-full">
        <div className="flex flex-col gap-2">
          <div id="invoices-badge">
            <Badge icon="facturas" title="Gestión de facturas" route="/dashboard/invoices" />
          </div>
          {user?.role === 'admin' && (
            <div id="settings-badge">
              <Badge icon="usuarios" title="Gestión de usuarios" route="/dashboard/users" />
            </div>
          )}
          {user?.role === 'admin' && (
            <div id="reports-badge">
              <Badge icon="reportes" title="Reportes" route="/dashboard/reports" />
            </div>
          )}
          {user?.role === 'user' && (
            <div id="pqr-badge">
              <Badge icon="pqr" title="PQR" route="/dashboard/pqr" />
            </div>
          )}
          {user?.role === 'admin' && (
            <div id="pqr-response-badge">
              <Badge icon="pqr" title="PQR" route="/dashboard/pqrResponse" />
            </div>
          )}
          <div id="notifications-badge">
            <Badge icon="notificaciones" title="Notificaciones" route="/dashboard/notifications" />
          </div>
          <div id="profile-badge">
            <Badge icon="perfil" title="Perfil" route="/dashboard/profile" />
          </div>
        </div>
        <div id="logout-badge" className="cursor-pointer" onClick={handleLogout}>
          <Badge icon="salir" title="Salir" route="/" />
        </div>
      </div>
    </div>
  );
};
