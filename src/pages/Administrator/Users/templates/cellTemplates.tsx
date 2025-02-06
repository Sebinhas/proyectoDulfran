// Nuevo archivo para los templates JSX
import React from 'react';
import { priceFormatter } from '../../../../helpers/priceFormatter.helper';
// Nuevo archivo para tipos
export interface Users {
  cedula: string;
  name: string;
  email: string;
  username: string;
  profile_type: string;
  status: string;
  createdAt: string;
  updatedAt: string;

}

export const CedulaCell = (row: Users): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="font-medium text-gray-900">{row.cedula}</div>
  </div>
);



export const NameCell = (row: Users): React.ReactNode => (
<div className="flex items-center gap-2">
  <div className="flex flex-row gap-1 items-center">
    <div className="font-medium text-gray-900">{row.name} </div>
  </div>
</div>

);

export const UsernameCell = (row: Users): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="font-medium text-gray-900">{row.username}</div>
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

export const profile_type = (row: Users): React.ReactNode => (
  <span className="text-gray-600">
    {row.profile_type}
  </span> 
);



export const EmailCell = (row: Users): React.ReactNode => (
  <span className="text-gray-600">
    {row.email}
  </span>
);

export const date_createdAt = (row: Users): React.ReactNode => (
  <span className="text-gray-600">
    {new Date(row.createdAt).toLocaleDateString()}
  </span>



);

export const date_updatedAt = (row: Users): React.ReactNode => (
  <span className="text-gray-600">
    {new Date(row.updatedAt).toLocaleDateString()}
  </span>


);