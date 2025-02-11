// Nuevo archivo para los templates JSX
import React from 'react';
import { priceFormatter } from '../../../../helpers/priceFormatter.helper';
// Nuevo archivo para tipos
export interface InvoiceData {
    numberInvoice: number;
    user: string;
    createdAt: string;
    status: 'Completada' | 'Pendiente' ;
    total: number;
  }
  


export const NumberInvoiceCell = (row: InvoiceData): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="font-medium text-gray-900">{row.numberInvoice}</div>
  </div>
);

export const UserCell = (row: InvoiceData): React.ReactNode => (
  <div className="flex items-center ">
    <div>
      <div className="font-medium text-gray-900">{row.user}</div>
    </div>

  </div>
);

export const DateCell = (row: InvoiceData): React.ReactNode => (
  <span className="text-gray-600">
    {new Date(row.createdAt).toLocaleDateString()}
  </span>
);


export const TotalCell = (row: InvoiceData): React.ReactNode => (
  <div className="flex items-center gap-2">
    <span className="text-gray-600">
      ${' '}{priceFormatter(row.total)}
    </span>
  </div>
);

export const StatusCell = (row: InvoiceData): React.ReactNode => (
  <span className={`px-2 py-1 rounded-full text-sm ${
    row.status === 'Completada' 

      ? 'bg-green-100 text-green-800' 
      : row.status === 'Pendiente'
      ? 'bg-yellow-100 text-yellow-800':null
  }`}>
    {row.status}
  </span>
);



