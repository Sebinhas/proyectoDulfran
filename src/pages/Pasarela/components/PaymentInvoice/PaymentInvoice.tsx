import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaPrint,
} from "react-icons/fa";

interface PaymentReceiptProps {
  paymentData: {
    payment_id: string;
    wompi_data: {
      id: string;
      created_at: string;
      amount_in_cents: number;
      reference: string;
      customer_email: string;
      status: string;
      payment_method: {
        type: string;
        phone_number: string;
      };
      customer_data: {
        legal_id: string;
        full_name: string;
        phone_number: string;
        legal_id_type: string;
      };
    };
  };
}

const PaymentReceipt: React.FC<PaymentReceiptProps> = ({ paymentData }) => {
  const navigate = useNavigate();

  const formatAmount = (amountInCents: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(amountInCents / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status.toUpperCase()) {
      case "APPROVED":
        return {
          icon: <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />,
          title: "¡Pago Exitoso!",
          titleColor: "text-green-600",
          message: "Tu pago ha sido procesado correctamente",
          statusText: "Aprobado",
          statusColor: "text-green-600",
        };
      case "DECLINED":
        return {
          icon: <FaTimesCircle className="mx-auto h-16 w-16 text-red-500" />,
          title: "Pago Declinado",
          titleColor: "text-red-600",
          message: "El pago no pudo ser procesado",
          statusText: "Declinado",
          statusColor: "text-red-600",
        };
      default:
        return {
          icon: <FaTimesCircle className="mx-auto h-16 w-16 text-yellow-500" />,
          title: "Estado del Pago",
          titleColor: "text-yellow-600",
          message: `Estado: ${status}`,
          statusText: status,
          statusColor: "text-yellow-600",
        };
    }
  };

  const statusConfig = getStatusConfig(paymentData.wompi_data.status);

  return (
    <div className="max-w-2xl overflow-auto mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-8">
        {/* Encabezado */}
        <div className="text-center mb-8">
          {statusConfig.icon}
          <h2 className={`mt-4 text-3xl font-bold ${statusConfig.titleColor}`}>
            {statusConfig.title}
          </h2>
          <p className="mt-2 text-gray-600">{statusConfig.message}</p>
        </div>

        {/* Detalles de la Transacción */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Detalles de la Transacción
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Monto</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatAmount(paymentData.wompi_data.amount_in_cents)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fecha</p>
                <p className="text-gray-900">
                  {formatDate(paymentData.wompi_data.created_at)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Referencia</p>
                <p className="text-gray-900">
                  {paymentData.wompi_data.reference}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estado</p>
                <p className={`font-medium ${statusConfig.statusColor}`}>
                  {statusConfig.statusText}
                </p>
              </div>
            </div>
          </div>

          {/* Información del Cliente */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Información del Cliente
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="text-gray-900">
                  {paymentData.wompi_data.customer_data.full_name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Documento</p>
                <p className="text-gray-900">
                  {paymentData.wompi_data.customer_data.legal_id_type}{" "}
                  {paymentData.wompi_data.customer_data.legal_id}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">
                  {paymentData.wompi_data.customer_email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="text-gray-900">
                  {paymentData.wompi_data.customer_data.phone_number}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <FaPrint className="mr-2" />
            Imprimir
          </button>
          <button
            onClick={() => {
              /* Lógica para descargar PDF */
            }}
            className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <FaDownload className="mr-2" />
            Descargar PDF
          </button>
          <button
            onClick={() =>
              navigate("/dashboard/payments") || window.location.reload()
            }
            className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Volver a Facturas
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
