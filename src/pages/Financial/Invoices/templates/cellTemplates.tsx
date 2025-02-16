// Nuevo archivo para los templates JSX
import React from "react";
import { priceFormatter } from "../../../../helpers/priceFormatter.helper";
import { DTOInvoices } from "../DTOInvoices";

export const numberInvoicesCell = (row: DTOInvoices): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="font-medium text-gray-900">{row.no_invoice}</div>
  </div>
);

export const FirstNameCell = (row: DTOInvoices): React.ReactNode => (
  <div className="flex items-center">
    <span className="text-gray-900">
      {row.client_first_name} {row.client_second_name}
    </span>
  </div>
);

export const NumberContractCell = (row: DTOInvoices): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="font-medium text-gray-900">{row.period_start}</div>
  </div>
);

export const TotalCell = (row: DTOInvoices): React.ReactNode => (
  <div className="flex items-center gap-2">
    <div className="flex flex-row gap-1 items-center">
      <div className="font-medium text-gray-900">
        {priceFormatter(Number(row.amount))}{" "}
      </div>
    </div>
  </div>
);

export const PaymentPeriodCell = (row: DTOInvoices): React.ReactNode => (
  <div className="">
    <div className="font-medium text-gray-700">
      {row.period_start} - {row.period_end}
    </div>
  </div>
);

export const StatusCell = (row: DTOInvoices): React.ReactNode => (
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

export const CreatedAtCell = (row: DTOInvoices): React.ReactNode => (
  <div className="flex flex-row gap-1">
    <span className="text-gray-900">
      {new Date(row.createdAt).toLocaleDateString()}
    </span>
    <span className="text-sm text-gray-500">
      {new Date(row.createdAt).toLocaleTimeString()}
    </span>
  </div>
);
