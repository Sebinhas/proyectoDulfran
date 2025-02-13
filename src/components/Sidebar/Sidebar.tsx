import { Badge } from './components/Badge/Badge.tsx';
import { useAuthStore } from '../../hooks/authStore';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  // console.log(user);

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
          {user?.profile_type === 'financiero' && (
            <div id="invoices-badge">
              <Badge icon="facturas" title="Gestión de facturas" route="/dashboard/invoices" />
            </div>
          )}
          {user?.profile_type === 'financiero' && (
            <div id="clients-badge">
              <Badge icon="clientes" title="Gestión de clientes" route="/dashboard/clients" />
            </div>
          )}
          {user?.profile_type === 'admin' && (
            <div id="users-badge">
              <Badge icon="usuarios" title="Gestión de usuarios" route="/dashboard/users" />
            </div>
          )}

          {(user?.profile_type === 'admin' || user?.profile_type === 'financiero') && (
            <div id="reports-badge">
              <Badge icon="reportes" title="Reportes" route="/dashboard/reports" />
            </div>
          )}

          {(user?.profile_type === 'tecnico' || user?.profile_type === 'financiero') && (
            <div id="pqr-badge">
              <Badge icon="pqrManagement" title="Gestión de PQR" route="/dashboard/pqrResponse" />
            </div>
          )}
          {user?.profile_type === 'cliente' && (
            <div id="pqr-response-badge">
              <Badge icon="pqr" title="Mis PQR" route="/dashboard/pqr" />
            </div>
          )}


          {user?.profile_type === 'tecnico' && (
            <div id="contracts-badge">
              <Badge icon="contratos" title="Contratos" route="/dashboard/contracts" />
            </div>
          )}
          {user?.profile_type === 'cliente' && (
            <div id="payments-badge">
              <Badge icon="pagos" title="Gestión de pagos" route="/dashboard/payments" />
            </div>
          )}

          {user?.profile_type === 'admin' && (
            <div id="binnacle-badge">
              <Badge icon="bitacora" title="Bitacora"   route="/dashboard/binnacle" />
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
