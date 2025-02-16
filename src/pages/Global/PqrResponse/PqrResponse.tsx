import TableGlobal from "../../../components/TableData/TableGlobal";
import usePqrResponse from "./usePqrResponse";


export const mockAdminPqrs = [
  {
    id: 1,
    type: "PETICION",
    category: "Facturación",
    sub_category: "Ajuste de factura",
    description: "Solicito revisión del cargo adicional en la factura del mes de marzo",
    status: "pendiente",
    client_cedula: "1234567890",
    created_at: "2024-03-15T10:30:00",
    updated_at: "2024-03-15T10:30:00",
    client: {
      first_name: "Juan",
      second_name: "Carlos",
      first_lastname: "Pérez",
      second_lastname: "Gómez",
      cedula: "1234567890",
      no_contract: "CON-2024-001",
      phone: "3001234567",
      email: "juan.perez@email.com",
      speed_plan: "50 MB"
    }
  },
  {
    id: 2,
    type: "QUEJA",
    category: "Servicio técnico",
    sub_category: "Velocidad del servicio",
    description: "El servicio de internet presenta lentitud constante desde hace una semana",
    status: "en_proceso",
    client_cedula: "2345678901",
    created_at: "2024-03-14T15:45:00",
    updated_at: "2024-03-15T09:20:00",
    client: {
      first_name: "María",
      second_name: "Fernanda",
      first_lastname: "González",
      second_lastname: "López",
      cedula: "2345678901",
      no_contract: "CON-2024-002",
      phone: "3109876543",
      email: "maria.gonzalez@email.com",
      speed_plan: "100 MB"
    }
  },
  {
    id: 3,
    type: "RECLAMO",
    category: "Atención al cliente",
    sub_category: "Incumplimiento de visita",
    description: "El técnico no se presentó en la fecha programada para la instalación",
    status: "cerrado",
    client_cedula: "3456789012",
    created_at: "2024-03-10T08:00:00",
    updated_at: "2024-03-12T16:30:00",
    client: {
      first_name: "Pedro",
      second_name: "",
      first_lastname: "Ramírez",
      second_lastname: "Silva",
      cedula: "3456789012",
      no_contract: "CON-2024-003",
      phone: "3203456789",
      email: "pedro.ramirez@email.com",
      speed_plan: "200 MB"
    }
  },
  {
    id: 4,
    type: "PETICION",
    category: "Servicios",
    sub_category: "Cambio de plan",
    description: "Solicito aumentar la velocidad de mi plan actual",
    status: "pendiente",
    client_cedula: "4567890123",
    created_at: "2024-03-16T11:20:00",
    updated_at: "2024-03-16T11:20:00",
    client: {
      first_name: "Ana",
      second_name: "María",
      first_lastname: "Castro",
      second_lastname: "Ruiz",
      cedula: "4567890123",
      no_contract: "CON-2024-004",
      phone: "3156789012",
      email: "ana.castro@email.com",
      speed_plan: "30 MB"
    }
  },
  {
    id: 5,
    type: "QUEJA",
    category: "Facturación",
    sub_category: "Cobro indebido",
    description: "Me están cobrando un servicio adicional que nunca solicité",
    status: "en_proceso",
    client_cedula: "5678901234",
    created_at: "2024-03-13T09:15:00",
    updated_at: "2024-03-14T14:20:00",
    client: {
      first_name: "Luis",
      second_name: "Alberto",
      first_lastname: "Mendoza",
      second_lastname: "Torres",
      cedula: "5678901234",
      no_contract: "CON-2024-005",
      phone: "3167890123",
      email: "luis.mendoza@email.com",
      speed_plan: "150 MB"
    }
  },
  {
    id: 6,
    type: "RECLAMO",
    category: "Técnico",
    sub_category: "Intermitencia del servicio",
    description: "El servicio se cae constantemente en horas de la noche",
    status: "pendiente",
    client_cedula: "6789012345",
    created_at: "2024-03-16T08:30:00",
    updated_at: "2024-03-16T08:30:00",
    client: {
      first_name: "Carmen",
      second_name: "Elena",
      first_lastname: "Vargas",
      second_lastname: "Díaz",
      cedula: "6789012345",
      no_contract: "CON-2024-006",
      phone: "3178901234",
      email: "carmen.vargas@email.com",
      speed_plan: "80 MB"
    }
  }
];

const PqrResponse = () => {
  const { columns, handleEdit, RenderResponsePqr, selectedPqr, handleSubmitResponse, register, handleSubmit, closeModalActionResponsePqr } = usePqrResponse();
  // const { response } = useSocketPqr([1,2]);

  return (
    <div className="w-full flex flex-col p-4">
      <TableGlobal
        columns={columns}
        data={mockAdminPqrs ?? []}
        itemsPerPage={8}
        actions={{
          edit: (row) => handleEdit(row)
        }}
      />
      <RenderResponsePqr>
        <div className="w-full max-h-[80vh] overflow-y-auto p-4 select-none">
          <div className="w-full max-w-5xl mx-auto flex flex-col gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-medium text-lg text-gray-900 mb-4">Información del Cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
                  <p className="text-base break-words">
                    {`${selectedPqr?.client.first_name} ${selectedPqr?.client.second_name} ${selectedPqr?.client.first_lastname} ${selectedPqr?.client.second_lastname}`}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Cédula</p>
                  <p className="text-base">{selectedPqr?.client.cedula}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">No. Contrato</p>
                  <p className="text-base">{selectedPqr?.client.no_contract}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Teléfono</p>
                  <p className="text-base">{selectedPqr?.client.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base break-words">{selectedPqr?.client.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Plan</p>
                  <p className="text-base">{selectedPqr?.client.speed_plan}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-medium text-lg text-gray-900 mb-4">Detalles de la PQR</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tipo</p>
                  <p className="text-base">{selectedPqr?.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Categoría</p>
                  <p className="text-base capitalize">{selectedPqr?.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Subcategoría</p>
                  <p className="text-base capitalize">{selectedPqr?.sub_category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Fecha de Creación</p>
                  <p className="text-base">
                    {new Date(selectedPqr?.created_at || '').toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Descripción</p>
                <p className="text-base bg-gray-50 p-3 rounded-md">{selectedPqr?.description}</p>
              </div>
            </div>

            <form className="bg-white p-4 rounded-lg shadow-sm border" onSubmit={handleSubmit(handleSubmitResponse)}>
              <h3 className="font-medium text-lg text-gray-700 mb-4">Respuesta</h3>
              
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Estado de la PQR
                </label>
                <select
                  id="status"
                  {...register('status')}
                  disabled={selectedPqr?.status === 'cerrado'}
                  defaultValue={selectedPqr?.status}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="en_proceso">En Proceso</option>
                  <option value="cerrado">Cerrado</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-2">
                  Respuesta
                </label>
                <textarea
                  id="response"
                  defaultValue={selectedPqr?.response}
                  {...register('response')}
                  disabled={selectedPqr?.status === 'cerrado'}
                  rows={6}
                  className="w-full min-h-[150px] p-3 border resize-none border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Escribe aquí la respuesta a la PQR..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModalActionResponsePqr}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Enviar Respuesta
                </button>
              </div>
            </form>
          </div>
        </div>
      </RenderResponsePqr>
    </div>
  );
};

export default PqrResponse;
