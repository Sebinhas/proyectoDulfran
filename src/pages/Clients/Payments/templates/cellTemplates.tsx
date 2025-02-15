// Nuevo archivo para los templates JSX
import React from "react";
import { priceFormatter } from "../../../../helpers/priceFormatter.helper";
import { format } from "date-fns";
import { es } from "date-fns/locale";
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
      <div className="font-medium text-gray-900">
        {priceFormatter(Number(row.amount))}{" "}
      </div>
    </div>
  </div>
);

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "d 'de' MMMM, yyyy", { locale: es });
};

export const PaymentPeriodCell = (row: DTOPayment): React.ReactNode => (
  <div className="">
    <div className="font-medium text-gray-700">
      {formatDate(row.period_start)} - {formatDate(row.period_end)}
    </div>
  </div>
);

export const StatusCell = (row: DTOPayment): React.ReactNode => (
  <span
    className={`px-2 py-1 rounded-full text-sm ${
      row.status === "pagada"
        ? "bg-green-100 text-green-800"
        : row.status === "vencido"
        ? "bg-red-100 text-red-800"
        : "bg-yellow-100 text-yellow-800"
    }`}
  >
    {row.status}
  </span>
);

export const CreatedAtCell = (row: DTOPayment): React.ReactNode => (
  <div className="flex flex-row gap-1">
    <span className="text-gray-900">
      {new Date(row.createdAt).toLocaleDateString()}
    </span>
    <span className="text-sm text-gray-500">
      {new Date(row.createdAt).toLocaleTimeString()}
    </span>
  </div>
);
