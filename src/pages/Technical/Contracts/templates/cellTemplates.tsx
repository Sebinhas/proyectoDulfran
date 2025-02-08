export interface Clients {
   userName: string;
   password: string;
   cedula: string;
   first_name: string;
   second_name: string;
   first_lastName: string;
   second_lastName: string;
   no_contract?: string;
   address: string;
   date_contract?: string;
   phone: string;
   email: string;
   createdAt: string;
   updatedAt: string;
   status: 'activo' | 'inactivo' ;
}

export interface ContractDTO {
   no_contract: string;
   client_name: string;
   status: 'activo' | 'inactivo' | 'suspendido';
   speed_plan: string;
   createdAt: string;
}

export const ContractCell = (row: Clients): React.ReactNode => (
  <div className="flex items-center">
    <span className="text-gray-900">
      {row.no_contract}
    </span>
  </div>
);

export const ClientNameCell = (row: ContractDTO): React.ReactNode => (
  <div className="flex items-center">
    <span className="text-gray-900">
      {row.client_name}
    </span>
  </div>
);

export const SpeedPlanCell = (row: ContractDTO): React.ReactNode => (
  <div className="flex items-center">
    <span className="text-gray-900">
      {row.speed_plan} Mbps
    </span>
  </div>
);

export const StatusCell = (row: ContractDTO): React.ReactNode => (
  <span className={`px-2 py-1 rounded-full text-sm ${
    row.status === 'activo' 
      ? 'bg-green-100 text-green-800' 
      : row.status === 'suspendido'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800'
  }`}>
    {row.status}
  </span>
);

export const CreatedAtCell = (row: ContractDTO): React.ReactNode => (
  <div className="flex items-center">
    <span className="text-gray-600">
      {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'}
    </span>
  </div>
);

