// Nuevo archivo para los templates JSX
import React from 'react';
import { priceFormatter } from '../../../../helpers/priceFormatter.helper';
// Nuevo archivo para tipos
export interface Users {
  userName: string;
  password: string;
  cedula: string;
  first_name: string;
  second_name: string;
  first_lastName: string;
  second_lastName: string;
  no_contract: string;
  address: string;
  date_contract: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  status: 'activo' | 'inactivo' ;
}

export const ContractCell = (row: Users): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="font-medium text-gray-900">{row.no_contract}</div>
  </div>
);

export const NameCell = (row: Users): React.ReactNode => (
<div className="flex items-center gap-2">
  <div className="flex flex-row gap-1 items-center">
    <div className="font-medium text-gray-900">{row.first_name} {row.first_lastName} </div>
  </div>
</div>
);

export const CedulaCell = (row: Users): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="font-medium text-gray-900">{row.cedula}</div>
  </div>
);

export const StatusCell = (row: Users): React.ReactNode => (
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

export const EmailCell = (row: Users): React.ReactNode => (
  <span className="text-gray-600">
    {row.email}
  </span>
);

export const date_contract = (row: Users): React.ReactNode => (
  <span className="text-gray-600">
    {new Date(row.date_contract).toLocaleDateString()}
  </span>
);