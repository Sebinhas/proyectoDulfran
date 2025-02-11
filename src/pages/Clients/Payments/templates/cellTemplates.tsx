// Nuevo archivo para los templates JSX
import React from 'react';
import { priceFormatter } from '../../../../helpers/priceFormatter.helper';
// Nuevo archivo para tipos
export interface DTOPayment {
  no_invoice: string;
  period_start: string;
  period_end: string;
  amount: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  client_cedula: string;
  client_first_name: string;
  client_second_name: string;
  client_first_lastname: string;
  client_second_lastname: string;
  client_phone: string;
  client_email: string;
  admin_nit: string;
}




export const numberInvoicesCell = (row: DTOPayment): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="font-medium text-gray-900">{row.no_invoice}</div>
  </div>
);


export const NumberContractCell = (row: DTOPayment): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="font-medium text-gray-900">{row.period_start}</div>
  </div>
);



export const TotalCell = (row: DTOPayment): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="flex flex-row gap-1 items-center">

      <div className="font-medium text-gray-900">{priceFormatter(Number(row.amount))} </div>
    </div>
  </div>

);

export const PaymentPeriodCell = (row: DTOPayment): React.ReactNode => (
  <div className="">
    <div className="font-medium text-gray-700">{row.period_start} - {row.period_end}</div>
  </div>
);




export const StatusCell = (row: DTOPayment): React.ReactNode => (
  <span className={`px-2 py-1 rounded-full text-sm ${
    row.status === 'pagado' 
      ? 'bg-green-100 text-green-800' 
      : row.status === 'vencido'
      ? 'bg-red-100 text-red-800'
      : 'bg-yellow-100 text-yellow-800'
  }`}>

    {row.status}
  </span>
);
