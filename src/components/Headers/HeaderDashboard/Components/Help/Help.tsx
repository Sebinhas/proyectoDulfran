import { useEffect, useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export const Help = () => {
  const [driverObj, setDriverObj] = useState<any>(null);

  useEffect(() => {
    const driverInstance = driver({
      popoverClass: 'bg-white p-4 rounded-xl shadow-lg border border-gray-200',
      stagePadding: 5,
      stageRadius: 10,
      steps: [
        {
          element: '#dashboard-badge',
          popover: {
            title: 'Panel Principal',
            description: 'Aquí puedes ver un resumen de tus actividades y estadísticas clave.',
            side: 'right',
            align: 'start'
          }
        },
        {
          element: '#catalog-badge',
          popover: {
            title: 'Catálogo de Productos',
            description: 'Administra tus productos y servicios dentales aquí.',
            side: 'right',
            align: 'start'
          }
        },
        {
          element: '#orders-badge',
          popover: {
            title: 'Gestión de Órdenes',
            description: 'Supervisa y gestiona todas las órdenes de trabajo.',
            side: 'right',
            align: 'start'
          }
        },
        {
          element: '#invoices-badge',
          popover: {
            title: 'Facturación',
            description: 'Accede y gestiona todas las facturas emitidas.',
            side: 'right',
            align: 'start'
          }
        },
        {
          element: '#settings-badge',
          popover: {
            title: 'Configuración',
            description: 'Ajusta las preferencias de tu cuenta y del sistema.',
            side: 'right',
            align: 'start'
          }
        }
      ],
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      doneBtnText: 'Finalizar'
    });

    setDriverObj(driverInstance);

    return () => {
      driverInstance.destroy();
    };
  }, []);

  const handleStartTour = () => {
    driverObj?.drive();
  };

  return (
    <div onClick={handleStartTour} className="cursor-pointer relative group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    </div>
  );
};

export default Help;
