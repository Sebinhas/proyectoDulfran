// Nuevo archivo para los templates JSX
import React from 'react';
import { priceFormatter } from '../../../../helpers/priceFormatter.helper';
// Nuevo archivo para tipos
export interface OrderData {
    id: number;
    patient: string;
    email: string;
    documentNumber: string;
    documentType: 'DNI' | 'Carné de Extranjería' | 'PTP';
    createdAt: string;
    createdBy: string;
    status: 'Completada' | 'Pendiente' | 'Cancelada';
    total: number;
  }
  
  
export const PatientCell = (row: OrderData): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 bg-gray-200 rounded-full" />
    <div>
      <div className="font-medium text-gray-900">{row.patient}</div>
      <div className="text-gray-500 text-sm">{row.email}</div>
    </div>
  </div>
);

export const DateCell = (row: OrderData): React.ReactNode => (
  <span className="text-gray-600">
    {new Date(row.createdAt).toLocaleDateString()}
  </span>
);

export const ValueCell = (row: OrderData): React.ReactNode => (
  <div className="flex items-center gap-2">
    <span className="text-gray-600">
      ${' '}{priceFormatter(row.total)}
    </span>
  </div>
);

export const StatusCell = (row: OrderData): React.ReactNode => (
  <span className={`px-2 py-1 rounded-full text-sm ${
    row.status === 'Completada' 
      ? 'bg-green-100 text-green-800' 
      : row.status === 'Pendiente'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800'
  }`}>
    {row.status}
  </span>
);


export const CreatedByCell = (row: OrderData): React.ReactNode => (
  <span className="text-gray-600">{row.createdBy}</span>
);
