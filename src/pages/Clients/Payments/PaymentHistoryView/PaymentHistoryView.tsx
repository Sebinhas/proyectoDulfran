import React from "react";
import { IoArrowBack } from "react-icons/io5";
import {
  FaFileInvoice,
  FaClock,
  FaCalendarAlt,
  FaHistory,
  FaPhone,
  FaExclamationCircle,
  FaFileAlt,
} from "react-icons/fa";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { usePaymentPolling } from "../../../../hooks/usePaymentPolling";
import PaymentInvoice from "../../../Pasarela/components/PaymentInvoice/PaymentInvoice";
import PaymentLoadingModal from "../../../../components/PaymentLoading/PaymentLoadingModal";
import { priceFormatter } from "../../../../helpers/priceFormatter.helper";
import { PaymentHistoryViewProps } from "./PaymentHistoryDTO";

const PaymentHistoryView: React.FC<PaymentHistoryViewProps> = ({
  paymentData,
  onBack,
}) => {
  const [showInvoice, setShowInvoice] = React.useState(false);
  const [transactionInfo, setTransactionInfo] = React.useState<any>(null);
  const [messageIndex, setMessageIndex] = React.useState(0);

  const messages = [
    {
      title: "Verificando pago",
      description: "Estamos confirmando el estado de tu pago...",
      icon: "🔄",
    },
    {
      title: "Consultando estado",
      description: "Esperando respuesta del banco...",
      icon: "📱",
    },
    {
      title: "Procesando información",
      description: "Actualizando estado del pago...",
      icon: "💳",
    },
  ];

  const handlePollingSuccess = (data: any) => {
    setTransactionInfo(data);
    setShowInvoice(true);
  };

  const {
    timeLeft,
    pollingAttempts,
    isPolling,
    maxPollingAttempts,
    startPolling,
  } = usePaymentPolling({ onSuccess: handlePollingSuccess });

  React.useEffect(() => {
    if (isPolling) {
      const messageInterval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length);
      }, 3000);
      return () => clearInterval(messageInterval);
    }
  }, [isPolling]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d 'de' MMMM, yyyy", { locale: es });
  };

  const formatAmount = (amount: string) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(parseFloat(amount));
  };

  // Si se está mostrando el comprobante
  if (showInvoice && transactionInfo) {
    return <PaymentInvoice paymentData={transactionInfo} />;
  }

  // Si se está verificando el pago
  if (isPolling) {
    return (
      <PaymentLoadingModal
        timeLeft={timeLeft}
        pollingAttempts={pollingAttempts}
        maxPollingAttempts={maxPollingAttempts}
        currentMessage={messages[messageIndex]}
      />
    );
  }

  return (
    <div className="w-full overflow-auto p-6">
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
          <FaHistory className="text-gray-600 text-xl" />
          <h2 className="text-xl font-semibold text-gray-900">
            Historial de Pagos
          </h2>
        </div>

        {/* Contenedor con scroll */}
        <div className="space-y-6">
          {[
            { status: "pending", data: paymentData.payment_history.pending },
            { status: "failed", data: paymentData.payment_history.failed },
            { status: "approved", data: paymentData.payment_history.approved },
          ].map(({ status, data }) =>
            data.map((attempt) => (
              <div
                key={attempt.reference}
                className="relative bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  {/* Encabezado con monto y estado */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="/nequi-icon.png"
                        alt="Nequi"
                        className="w-8 h-8"
                      />
                      <div>
                        <span className="text-lg font-semibold text-gray-900">
                          $ {priceFormatter(parseInt(attempt.amount))}
                        </span>
                        <p className="text-sm text-gray-500">
                          {formatDate(attempt.dates.transaction_created)}{" "}
                          {new Date(
                            attempt.dates.transaction_created
                          ).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          status === "approved"
                            ? "bg-green-100 text-green-700"
                            : status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {status === "approved"
                          ? "Aprobado"
                          : status === "pending"
                          ? "Pendiente"
                          : "Rechazado"}
                      </div>
                      {status === "pending" && (
                        <button
                          onClick={() => startPolling(attempt.reference)}
                          className="flex items-center gap-2 px-3 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors text-sm font-medium"
                        >
                          <FaClock className="text-sm" />
                          Verificar
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Detalles del pago */}
                  <div className="flex flex-row gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      Metodo de Pago:
                      <span className="font-bold">
                        {attempt.payment_info.method_details.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-gray-400" />
                      <span className="text-gray-600">
                        {attempt.payment_info.method_details.phone_number}
                      </span>
                    </div>
                  </div>

                  {/* Mensaje de error si existe */}
                  {attempt.error?.message && (
                    <div className="mt-3 flex items-start gap-2">
                      <FaExclamationCircle className="text-red-500 mt-0.5" />
                      <span className="text-sm text-red-600">
                        {attempt.error.message}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {/* Mensaje cuando no hay historial */}
          {paymentData.payment_history.failed.length === 0 &&
            paymentData.payment_history.pending.length === 0 &&
            paymentData.payment_history.approved.length === 0 && (
              <div className="text-center py-8">
                <FaFileAlt className="mx-auto text-4xl text-gray-400 mb-2" />
                <p className="text-gray-500">
                  No hay historial de pagos disponible
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryView;
