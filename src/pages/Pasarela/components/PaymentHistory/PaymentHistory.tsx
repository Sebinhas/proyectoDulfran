import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

interface Payment {
  id: string;
  created_at: string;
  status: string;
  amount: string;
  payment_method: string;
  error_message?: string;
  attempt: number;
  reference: string;
}

interface PaymentHistoryProps {
  payments: Payment[];
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments }) => {
  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case 'APPROVED':
        return <FaCheckCircle className="text-green-500 h-5 w-5" />;
      case 'DECLINED':
        return <FaTimesCircle className="text-red-500 h-5 w-5" />;
      default:
        return <FaClock className="text-yellow-500 h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'DECLINED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount: string) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(parseFloat(amount));
  };

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <div
          key={payment.id}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Intento</p>
              <p className="font-medium">#{payment.attempt}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha</p>
              <p className="font-medium">{formatDate(payment.created_at)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monto</p>
              <p className="font-medium">{formatAmount(payment.amount)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Método</p>
              <p className="font-medium">{payment.payment_method}</p>
            </div>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
              {payment.status.toUpperCase()}
            </span>
            
            {payment.status.toUpperCase() === 'PENDING' && (
              <div className="text-yellow-600 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pago en proceso - Por favor espere unos minutos
              </div>
            )}
          </div>
          
          {payment.error_message && (
            <div className="mt-2 text-sm text-red-600">
              Error: {payment.error_message}
            </div>
          )}
          
          <div className="mt-2 text-xs text-gray-500">
            Referencia: {payment.reference}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentHistory;