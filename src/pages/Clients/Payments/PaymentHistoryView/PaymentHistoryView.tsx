import React from 'react';
import { IoArrowBack } from "react-icons/io5";
import PaymentHistory from '../../../Pasarela/components/PaymentHistory/PaymentHistory';

interface PaymentHistoryViewProps {
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
      error_message: string;
      payment_history: {
        approved: any[];
        pending: any[];
        declined: any[];
        others: any[];
      };
      total_attempts: number;
      latest_status: string;
    };
  };
  onBack: () => void;
}

const PaymentHistoryView: React.FC<PaymentHistoryViewProps> = ({ paymentData, onBack }) => {
  console.log("PaymentData recibido:", paymentData);

  // Asegurarnos que payment_history tenga una estructura válida
  const paymentHistory = paymentData.wompi_data.payment_history || {
    approved: [],
    pending: [],
    declined: [],
    others: []
  };

  return (
    <div className="w-full overflow-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <IoArrowBack className="text-xl" />
        <span>Volver a la lista</span>
      </button>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Historial de Pagos - Factura {paymentData.wompi_data.reference}
        </h2>

        {/* Información de la Factura */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Información de la Factura</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Cliente</p>
              <p className="text-gray-900">{paymentData.wompi_data.customer_data.full_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900">{paymentData.wompi_data.customer_email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Documento</p>
              <p className="text-gray-900">
                {paymentData.wompi_data.customer_data.legal_id_type} {paymentData.wompi_data.customer_data.legal_id}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="text-gray-900">{paymentData.wompi_data.customer_data.phone_number}</p>
            </div>
          </div>
        </div>

        {/* Resumen de Intentos */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total de intentos</p>
              <p className="text-gray-900">{paymentData.wompi_data.total_attempts}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Último estado</p>
              <p className={`font-medium ${
                paymentData.wompi_data.latest_status === 'APPROVED' 
                  ? 'text-green-600' 
                  : paymentData.wompi_data.latest_status === 'DECLINED' 
                  ? 'text-red-600' 
                  : 'text-yellow-600'
              }`}>
                {paymentData.wompi_data.latest_status}
              </p>
            </div>
          </div>
        </div>

        {/* Historial por Estado */}
        <div className="space-y-6">
          {(!paymentHistory.approved?.length && 
           !paymentHistory.pending?.length && 
           !paymentHistory.declined?.length && 
           !paymentHistory.others?.length) ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                No hay historial de pagos disponible para esta factura.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Los intentos de pago aparecerán aquí.
              </p>
            </div>
          ) : (
            <>
              {paymentHistory.approved?.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-green-600 mb-4">Pagos Aprobados</h3>
                  <PaymentHistory payments={paymentHistory.approved} />
                </div>
              )}

              {paymentHistory.pending?.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-yellow-600 mb-4">Pagos Pendientes</h3>
                  <PaymentHistory payments={paymentHistory.pending} />
                </div>
              )}

              {paymentHistory.declined?.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-red-600 mb-4">Pagos Declinados</h3>
                  <PaymentHistory payments={paymentHistory.declined} />
                </div>
              )}

              {paymentHistory.others?.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-600 mb-4">Otros Intentos</h3>
                  <PaymentHistory payments={paymentHistory.others} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryView; 