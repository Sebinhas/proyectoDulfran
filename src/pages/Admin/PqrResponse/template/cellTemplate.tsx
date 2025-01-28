import React from 'react';

interface Client {
  first_name: string;
  second_name: string;
  first_lastname: string;
  second_lastname: string;
}

export interface PQRS {
  id: number;
  type: string;
  category: string;
  sub_category: string;
  description: string;
  status: string;
  client_cedula: string;
  created_at: string;
  updated_at: string;
  client: Client;
}

export const TipoCell = (row: PQRS): React.ReactNode => (
  <span className={`px-2 py-1 rounded-full text-sm ${
    row.type === 'PETICION' ? 'bg-blue-100 text-blue-800' :
    row.type === 'QUEJA' ? 'bg-orange-100 text-orange-800' :
    row.type === 'RECLAMO' ? 'bg-red-100 text-red-800' :
    'bg-purple-100 text-purple-800'
  }`}>
    {row.type.charAt(0) + row.type.slice(1).toLowerCase()}
  </span>
);

export const AsuntoCell = (row: PQRS): React.ReactNode => (
   <div className="flex items-center gap-2">
     <div className="font-medium text-gray-900">{row.sub_category}</div>
   </div>
 );

export const CategoriaCell = (row: PQRS): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="font-medium text-gray-900">
      {`${row.category} - ${row.sub_category}`}
    </div>
  </div>
);

export const DescripcionCell = (row: PQRS): React.ReactNode => (
  <div className="max-w-xs truncate text-gray-600">
    {row.description}
  </div>
);

export const EstadoCell = (row: PQRS): React.ReactNode => (
  <span className={`px-2 py-1 rounded-full text-sm ${
    row.status === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
    row.status === 'en_proceso' ? 'bg-blue-100 text-blue-800' :
    row.status === 'resuelto' ? 'bg-green-100 text-green-800' :
    'bg-gray-100 text-gray-800'
  }`}>
    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
  </span>
);

export const CedulaCell = (row: PQRS): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="font-medium text-gray-900">{row.client_cedula}</div>
  </div>
);

export const FechaCreacionCell = (row: PQRS): React.ReactNode => (
  <span className="text-gray-600">
    {new Date(row.created_at).toLocaleDateString()}
  </span>
);

export const CreatedByCell = (row: PQRS): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="font-medium text-gray-900">
      {`${row.client.first_name} ${row.client.first_lastname}`}
    </div>
  </div>
);
