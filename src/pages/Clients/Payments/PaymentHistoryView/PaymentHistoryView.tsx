import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { FaFileInvoice, FaClock, FaUser, FaCreditCard, FaCalendarAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface PaymentHistoryViewProps {
  paymentData: {
    invoice_id: string;
    invoice_details: {
      amount: string;
      period: {
        start: string;
        end: string;
      };
      description: string;
      status: string;
    };
    payment_summary: {
      total_attempts: number;
      latest_status: string;
      latest_attempt: {
        reference: string;
        amount: string;
        status: string;
        payment_method: string;
        dates: {
          completed: string | null;
        };
      };
    };
    payment_history: {
      approved: Array<PaymentAttempt>;
      pending: Array<PaymentAttempt>;
      failed: Array<PaymentAttempt>;
    };
  };
  onBack: () => void;
}

interface PaymentAttempt {
  reference: string;
  amount: string;
  payment_method: string;
  buyer: {
    name: string;
    email: string;
    phone: string;
    legal_id: string;
    legal_id_type: string;
  };
  error: any;
  payment_info: {
    method_details: {
      type: string;
      user_type: string;
      phone_number: string;
    };
    currency: string;
  };
  dates: {
    transaction_created: string;
    transaction_finalized: string | null;
  };
  attempt: number;
}

const PaymentHistoryView: React.FC<PaymentHistoryViewProps> = ({ paymentData, onBack }) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d 'de' MMMM, yyyy", { locale: es });
  };

  const formatAmount = (amount: string) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(parseFloat(amount));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800"
      >
        <IoArrowBack className="text-xl" />
        <span>Volver</span>
      </button>

      {/* Información de la Factura */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaFileInvoice className="text-2xl text-blue-600" />
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {paymentData.invoice_id}
              </h1>
              <p className="text-sm text-gray-500">
                {paymentData.invoice_details.description}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              {formatAmount(paymentData.invoice_details.amount)}
            </p>
            <span className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${paymentData.payment_summary.latest_status === 'APPROVED' ? 'bg-green-100 text-green-700' : 
                paymentData.payment_summary.latest_status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 
                'bg-red-100 text-red-700'}
            `}>
              {paymentData.payment_summary.latest_status}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-400" />
            <span className="text-sm text-gray-600">
              Periodo: {formatDate(paymentData.invoice_details.period.start)} - {formatDate(paymentData.invoice_details.period.end)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-gray-400" />
            <span className="text-sm text-gray-600">
              {paymentData.payment_summary.total_attempts} intentos de pago
            </span>
          </div>
        </div>
      </div>

      {/* Historial de Pagos */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <FaClock className="text-blue-600" />
          <h2 className="text-lg font-semibold">Historial de Intentos</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(paymentData.payment_history).map(([status, attempts]) => 
            attempts.map((payment: PaymentAttempt) => (
              <div key={payment.reference} 
                   className={`p-4 rounded-lg border-l-4 ${
                     status === 'approved' ? 'border-green-500 bg-green-50' :
                     status === 'pending' ? 'border-yellow-500 bg-yellow-50' :
                     'border-red-500 bg-red-50'
                   }`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Intento #{payment.attempt}</h3>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-gray-600">
                        Método: <span className="font-medium">{payment.payment_method}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Monto: <span className="font-medium">{formatAmount(payment.amount)}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Fecha: <span className="font-medium">
                          {formatDate(payment.dates.transaction_created)}
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Información del Pagador</h3>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-gray-600">
                        Nombre: <span className="font-medium">{payment.buyer.name}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        {payment.buyer.legal_id_type}: <span className="font-medium">{payment.buyer.legal_id}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Teléfono: <span className="font-medium">{payment.buyer.phone}</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                {payment.error && Object.keys(payment.error).length > 0 && (
                  <div className="mt-3 text-sm text-red-600">
                    Error: {payment.error.message || JSON.stringify(payment.error)}
                  </div>
                )}
              </div>
            ))
          )}

          {Object.values(paymentData.payment_history).every(arr => arr.length === 0) && (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No hay historial de pagos disponible</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryView;
