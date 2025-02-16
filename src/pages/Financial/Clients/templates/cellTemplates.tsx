// Nuevo archivo para los templates JSX
import React from 'react';
// Nuevo archivo para tipos
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

export const NameCell = (row: Clients): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="flex flex-col">
      <div className="font-medium text-gray-900">
        {row.first_name} {row.second_name} {row.first_lastName} {row.second_lastName}
      </div>
      <div className="text-sm text-gray-500">
        {row.phone}
      </div>
    </div>
  </div>
);


export const CedulaCell = (row: Clients): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="font-medium text-gray-900">{row.cedula}</div>
  </div>
);

export const StatusCell = (row: Clients): React.ReactNode => (
  <span className={`px-2 py-1 rounded-full text-sm ${
    row.status === 'activo' 
      ? 'bg-green-100 text-green-800' 
      : row.status === 'inactivo'
      ? 'bg-red-100 text-red-800'
      : 'bg-yellow-100 text-yellow-800'
  }`}>
    {row.status}
  </span>
);

export const EmailCell = (row: Clients): React.ReactNode => (
  <div className="flex items-center">
    <span className="text-gray-600">
      {row.email}
    </span>
  </div>
);

export const CreatedAtCell = (row: Clients): React.ReactNode => (
  <div className="flex flex-row gap-1">
    <span className="text-gray-900">
      {new Date(row.createdAt).toLocaleDateString()}
    </span>
    <span className="text-sm text-gray-500">
      {new Date(row.createdAt).toLocaleTimeString()}
    </span>
  </div>
);

export const FirstNameCell = (row: Clients): React.ReactNode => (
  <div className="flex items-center">
    <span className="text-gray-900">
      {row.first_name} {row.second_name}
    </span>
  </div>
);

export const AddressCell = (row: Clients): React.ReactNode => (
  <div className="flex items-center">
    <span className="text-gray-600">
      {row.address}
    </span>
  </div>
);

export const PhoneCell = (row: Clients): React.ReactNode => (
  <div className="flex items-center">
    <span className="text-gray-600">
      {row.phone}
    </span>
  </div>
);