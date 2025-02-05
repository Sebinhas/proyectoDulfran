import { useState } from "react";
import usePqr from "./usePqr.ts";
import PqrCard from "./Components/PqrCard/PqrCard.tsx";
import PqrDetail from "./Components/PqrDetails/PqrDetails.tsx";
import NewPqrModal from "./Components/NewPqrModal/NewPqrModal.tsx";

export const mockPqrs = [
  {
    id: 1,
    sub_category: "Facturación incorrecta",
    category: "Facturación",
    description: "El monto facturado no corresponde con el servicio prestado",
    status: "pendiente",
    created_at: "2024-03-15T10:30:00",
    updated_at: "2024-03-15T10:30:00",
    responses: [
      {
        response: "Estamos revisando su caso con el departamento de facturación",
        created_at: "2024-03-15T11:30:00",
        admin_nit: null,
        adminUser: {
          name: "Juan Pérez",
          profile_type: "Agente de Facturación"
        }
      }
    ]
  },
  {
    id: 2,
    sub_category: "Servicio intermitente",
    category: "Soporte técnico",
    description: "El servicio presenta interrupciones frecuentes durante las últimas 48 horas",
    status: "en_proceso",
    created_at: "2024-03-14T15:45:00",
    updated_at: "2024-03-15T09:20:00",
    responses: [
      {
        response: "Se ha programado una visita técnica para mañana",
        created_at: "2024-03-15T09:20:00",
        admin_nit: null,
        adminUser: {
          name: "María González",
          profile_type: "Soporte Técnico"
        }
      },
      {
        response: "Hemos detectado una falla en el sector, equipo técnico en camino",
        created_at: "2024-03-14T16:00:00",
        admin_nit: true,
        user: "Super Administrador"
      }
    ]
  },
  {
    id: 3,
    sub_category: "Cambio de plan",
    category: "Servicios",
    description: "Solicitud de actualización al plan premium",
    status: "cerrado",
    created_at: "2024-03-10T08:00:00",
    updated_at: "2024-03-12T16:30:00",
    responses: [
      {
        response: "Cambio de plan realizado exitosamente. Ya puede disfrutar de su plan premium",
        created_at: "2024-03-12T16:30:00",
        admin_nit: null,
        adminUser: {
          name: "Carlos Ruiz",
          profile_type: "Ejecutivo de Cuenta"
        }
      },
      {
        response: "Solicitud recibida, procesando cambio de plan",
        created_at: "2024-03-10T09:15:00",
        admin_nit: null,
        adminUser: {
          name: "Ana Silva",
          profile_type: "Atención al Cliente"
        }
      }
    ]
  },
  {
    id: 4,
    sub_category: "Reclamo por cobro",
    category: "Facturación",
    description: "Cargo no reconocido en la última factura",
    status: "pendiente",
    created_at: "2024-03-16T11:20:00",
    updated_at: "2024-03-16T11:20:00",
    responses: []
  }
];

const Pqr = () => {
  const { pqr } = usePqr();
  const [selectedPqr, setSelectedPqr] = useState<any>(null);
  const [isNewPqrModalOpen, setIsNewPqrModalOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col p-6 select-none">
  
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis PQR</h1>
        <button 
          onClick={() => setIsNewPqrModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <span>+</span> Nueva PQR
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar PQR..."
          className="border rounded-md px-4 py-2 outline-none flex-1"
        />
        <select className="border rounded-md px-4 py-2 w-44 outline-none">
          <option value="">Estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En Proceso</option>
          <option value="cerrado">Cerrado</option>
        </select>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[700px]">
        {mockPqrs.map((item: any) => (
          <PqrCard 
            key={item.id} 
            data={item} 
            onClick={() => setSelectedPqr(item)}
          />
        ))}
      </div>

      {isNewPqrModalOpen && (
        <NewPqrModal 
          onClose={() => setIsNewPqrModalOpen(false)}
        />
      )}

      {selectedPqr && (
        <PqrDetail 
          data={selectedPqr} 
          onClose={() => setSelectedPqr(null)} 
        />
      )}
    </div>
  );
};

export default Pqr;
