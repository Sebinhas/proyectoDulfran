import { Badge } from './components/Badge/Badge.tsx';

export const Sidebar = () => {
  return (
    <div className="w-full left-0 top-0 fixed max-w-[250px] h-full px-4 pt-3 flex flex-col gap-5 bg-white">
      <div className="w-full h-[60px] flex flex-row justify-center items-center bg-slate-400">
        Logo
      </div>
      <div className="flex flex-col justify-between pb-1 h-full">
        <div className="flex flex-col gap-2">
          <div id="dashboard-badge">
            <Badge icon="dashboard" title="Panel principal" route="/dashboard" />
          </div>
          <div id="invoices-badge">
            <Badge icon="facturas" title="Facturas" route="/dashboard/facturas" />
          </div>
          <div id="settings-badge">
            <Badge icon="ajustes" title="Ajustes" route="/dashboard/ajustes" />
          </div>
        </div>
        <Badge icon="salir" title="Salir" route="/auth/login" />
      </div>
    </div>
  );
};
