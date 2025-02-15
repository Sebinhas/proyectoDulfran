import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import {
  FaFileInvoice,
  FaClock,
  FaUser,
  FaCreditCard,
  FaCalendarAlt,
} from "react-icons/fa";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Swal from "sweetalert2";
import { useAuthStore } from "../../../../hooks/authStore";
import PaymentInvoice from "../../../Pasarela/components/PaymentInvoice/PaymentInvoice";

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

const PaymentHistoryView: React.FC<PaymentHistoryViewProps> = ({
  paymentData,
  onBack,
}) => {
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [pollingAttempts, setPollingAttempts] = useState(0);
  const maxPollingAttempts = 10;
  const [showInvoice, setShowInvoice] = useState(false);
  const [transactionInfo, setTransactionInfo] = useState<any>(null);
  const token = useAuthStore((state) => state.token);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d 'de' MMMM, yyyy", { locale: es });
  };

  const formatAmount = (amount: string) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(parseFloat(amount));
  };

  const startPolling = async (reference: string) => {
    setVerifyingPayment(true);
    let currentTimeLeft = 30;
    setTimeLeft(currentTimeLeft);

    const pollingInterval = setInterval(async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/payments/status/${reference}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();

        if (data.status !== "PENDING") {
          clearInterval(pollingInterval);
          setVerifyingPayment(false);

          const formattedData = {
            payment_id: data.id,
            wompi_data: {
              id: data.wompi_transaction_id,
              created_at: data.created_at,
              amount_in_cents: parseFloat(data.amount) * 100,
              reference: data.reference,
              customer_email: data.buyer_email,
              status: data.status,
              payment_method: {
                type: data.payment_method,
                phone_number: data.buyer_phone,
              },
              customer_data: {
                legal_id: data.legal_id,
                full_name: data.buyer_name,
                phone_number: data.buyer_phone,
                legal_id_type: data.legal_id_type,
              },
            },
          };

          setTransactionInfo(formattedData);
          setShowInvoice(true);
          return;
        }

        // Reducir el tiempo restante
        currentTimeLeft -= 1;
        setTimeLeft(currentTimeLeft);

        // Verificar si se acabó el tiempo
        if (currentTimeLeft <= 0) {
          setPollingAttempts((prev) => {
            if (prev >= maxPollingAttempts - 1) {
              clearInterval(pollingInterval);
              setVerifyingPayment(false);
              Swal.fire({
                title: "Tiempo de espera excedido",
                text: "No pudimos confirmar tu pago. Por favor, verifica en tu app de Nequi",
                icon: "warning",
              });
              return prev;
            }
            // Reiniciar el tiempo para el siguiente intento
            currentTimeLeft = 30;
            setTimeLeft(30);
            return prev + 1;
          });
        }
      } catch (error) {
        console.error("Error en polling:", error);
      }
    }, 1000); // Ejecutar cada segundo
  };

  // Si se está mostrando el comprobante
  if (showInvoice && transactionInfo?.wompi_data) {
    return <PaymentInvoice paymentData={transactionInfo} />;
  }

  // Si se está verificando el pago
  if (verifyingPayment) {
    return (
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="relative mx-auto w-24 h-24 mb-6">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-gray-600 transform -rotate-90 origin-center transition-all duration-300"
                  strokeWidth="8"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * timeLeft) / 30}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                />
              </svg>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-gray-700">
                {timeLeft}s
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Verificando pago
            </h2>
            <p className="text-gray-600 mb-4">
              Estamos confirmando el estado de tu pago
            </p>
            <div className="text-sm text-gray-500">
              Intento {pollingAttempts + 1} de {maxPollingAttempts}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <span
              className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${
                paymentData.payment_summary.latest_status === "APPROVED"
                  ? "bg-green-100 text-green-700"
                  : paymentData.payment_summary.latest_status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }
            `}
            >
              {paymentData.payment_summary.latest_status !== "APPROVED"
                ? "Pendiente de Pago"
                : "Factura pagada"}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-400" />
            <span className="text-sm text-gray-600">
              Periodo: {formatDate(paymentData.invoice_details.period.start)} -{" "}
              {formatDate(paymentData.invoice_details.period.end)}
            </span>
          </div>
          {paymentData.payment_summary.latest_status === "PENDING" && (
            <div className="flex items-center gap-2">
              <FaClock className="text-yellow-500" />
              <span className="text-sm font-medium text-yellow-600">
                Verificar estado de pago
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Historial de Pagos */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <FaClock className="text-blue-600" />
          <h2 className="text-lg font-semibold">Historial de Pagos</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(paymentData.payment_history).map(
            ([status, attempts]) =>
              attempts.map((payment: PaymentAttempt) => (
                <div
                  key={payment.reference}
                  className={`p-4 rounded-lg border-l-4 ${
                    status === "approved"
                      ? "border-green-500 bg-green-50"
                      : status === "pending"
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-red-500 bg-red-50"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Intento #{payment.attempt}
                      </h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-gray-600">
                          Método:{" "}
                          <span className="font-medium">
                            {payment.payment_method}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Monto:{" "}
                          <span className="font-medium">
                            {formatAmount(payment.amount)}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Fecha:{" "}
                          <span className="font-medium">
                            {formatDate(payment.dates.transaction_created)}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900">
                        Información del Pagador
                      </h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-gray-600">
                          Nombre:{" "}
                          <span className="font-medium">
                            {payment.buyer.name}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          {payment.buyer.legal_id_type}:{" "}
                          <span className="font-medium">
                            {payment.buyer.legal_id}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Teléfono:{" "}
                          <span className="font-medium">
                            {payment.buyer.phone}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {payment.error && Object.keys(payment.error).length > 0 && (
                    <div className="mt-3 text-sm text-red-600">
                      Error:{" "}
                      {payment.error.message || JSON.stringify(payment.error)}
                    </div>
                  )}
                </div>
              ))
          )}

          {Object.values(paymentData.payment_history).every(
            (arr) => arr.length === 0
          ) && (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                No hay historial de pagos disponible
              </p>
            </div>
          )}
        </div>
      </div>

      {paymentData.payment_summary.latest_status === "PENDING" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaClock className="text-2xl text-yellow-500" />
              <div>
                <h2 className="text-lg font-semibold text-yellow-800">
                  Tienes un pago pendiente
                </h2>
                <p className="text-sm text-yellow-600">
                  Referencia:{" "}
                  {paymentData.payment_summary.latest_attempt.reference}
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                startPolling(
                  paymentData.payment_summary.latest_attempt.reference
                )
              }
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
            >
              <FaClock className="text-sm" />
              Verificar Estado
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistoryView;
