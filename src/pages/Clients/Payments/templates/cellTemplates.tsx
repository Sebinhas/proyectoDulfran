// Nuevo archivo para los templates JSX
import React from 'react';
import { priceFormatter } from '../../../../helpers/priceFormatter.helper';
// Nuevo archivo para tipos
export interface Users {
  numberInvoices: number;
  numberContract: string;
  total: number;
  paymentPeriod: string;
  status: string;
}



export const numberInvoicesCell = (row: Users): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="font-medium text-gray-900">{row.numberInvoices}</div>
  </div>
);


export const NumberContractCell = (row: Users): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="font-medium text-gray-900">{row.numberContract}</div>
  </div>
);



export const TotalCell = (row: Users): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="flex flex-row gap-1 items-center">

      <div className="font-medium text-gray-900">{priceFormatter(row.total)} </div>
    </div>
  </div>

);

export const PaymentPeriodCell = (row: Users): React.ReactNode => (
  <div className="">
    <div className="font-medium text-gray-700">{row.paymentPeriod}</div>
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
