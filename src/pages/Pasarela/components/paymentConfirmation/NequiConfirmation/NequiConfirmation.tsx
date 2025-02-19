import { FaArrowLeft, FaCheckCircle, FaFileInvoice } from "react-icons/fa";
import { useState } from "react";
import PaymentInvoice from "../../PaymentInvoice/PaymentInvoice";
import { usePaymentContext } from "../../../../../context/PaymentContext";
import { useNavigate } from "react-router-dom";
import logoNequi from "../../../../../../public/nequi-icon.png";
import { priceFormatter } from "../../../../../helpers/priceFormatter.helper";
import { usePaymentPolling } from "../../../../../hooks/usePaymentPolling";
import PaymentLoadingModal from "../../../../../components/PaymentLoading/PaymentLoadingModal";
import { createNequiPayment } from "../../../../../api/axios.helper";

const NequiConfirmation = () => {
  const { paymentData } = usePaymentContext();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<
    "IDLE" | "PENDING" | "APPROVED" | "DECLINED"
  >("IDLE");
  const [showInvoice, setShowInvoice] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [transactionInfo, setTransactionInfo] = useState<any>(null);

  const messages = [
    {
      title: "Iniciando proceso de pago",
      description: "Conectando con Nequi de forma segura...",
      icon: "🔄",
    },
    {
      title: "Verificando tu cuenta",
      description: "Validando información con Nequi...",
      icon: "📱",
    },
    {
      title: "Procesando transacción",
      description: "Tu pago está siendo procesado...",
      icon: "💳",
    },
    {
      title: "Confirmando pago",
      description: "Esperando confirmación de Nequi...",
      icon: "⏳",
    },
    {
      title: "Finalizando",
      description: "Generando comprobante de pago...",
      icon: "📄",
    },
  ];

  const handlePollingSuccess = (data: any) => {
    setTransactionInfo(data);
    setPaymentStatus(data.wompi_data.status);
    setShowInvoice(true);
  };

  const {
    timeLeft,
    pollingAttempts,
    isPolling,
    maxPollingAttempts,
    startPolling,
  } = usePaymentPolling({ onSuccess: handlePollingSuccess });

  const amountInCents = paymentData?.amount_in_cents
    ? paymentData?.amount_in_cents * 100
    : 0;

  const createPayment = async () => {
    try {
      if (
        paymentData?.buyer_phone?.length &&
        (paymentData?.buyer_phone?.length < 10 ||
          paymentData?.buyer_phone?.length > 10)
      ) {
        paymentData.buyer_phone = "0000000000";
      }

      const paymentRequest = {
        invoice_id: paymentData?.invoice_id || "",
        amount_in_cents: amountInCents,
        customer_email: paymentData?.customer_email || "",
        buyer_name: paymentData?.buyer_name || "",
        buyer_phone: paymentData?.buyer_phone || "No disponible",
        legal_id: paymentData?.legal_id || "",
        legal_id_type: paymentData?.legal_id_type || "CC",
        user_type: "PERSON",
        payment_method: {
          type: "NEQUI",
          phone_number: paymentData?.payment_method?.phone_number || "",
        },
        payment_description: `Pago factura ${paymentData?.invoice_id || ""}`,
      };

      const response = await createNequiPayment(paymentRequest);
      return response;
    } catch (error) {
      console.error("Error creating payment:", error);
      setPaymentStatus("DECLINED");
      return null;
    }
  };

  const handlePayment = async () => {
    setPaymentStatus("PENDING");
    setMessageIndex(0);

    // 1. Crear el pago
    const paymentResponse = await createPayment();
    if (!paymentResponse) return;

    console.log(paymentResponse);
    // 2. Iniciar el polling
    startPolling(paymentResponse.wompi_data.transaction_id);

    // 3. Iniciar el cambio de mensajes
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    // Limpiar el intervalo cuando termine el polling
    return () => clearInterval(messageInterval);
  };

  // Si el pago fue aprobado y terminó el polling, mostrar el comprobante
  if (showInvoice && transactionInfo?.wompi_data) {
    //aca toca encriptar el id
    navigate(`/dashboard/payments/payment_method/nq/confirmation/checkout/${transactionInfo.wompi_data.transaction_id}`);
    // return <PaymentInvoice paymentData={transactionInfo} />;
  }

  // Si está en proceso de pago, mostrar el modal de carga
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Encabezado */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-8">
            <h2 className="mt-4 text-center text-2xl font-bold text-white">
              Confirma tu pago
            </h2>
            <p className="mt-2 text-center text-fuchsia-100">
              Verifica los detalles antes de continuar
            </p>
          </div>

          {/* Contenido */}
          <div className="px-6 py-8">
            {/* Monto a pagar */}
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-gray-500">Monto a pagar</p>
              <p className="mt-1 text-4xl font-bold text-gray-900">
                $ {priceFormatter(paymentData?.amount_in_cents || 0)}
              </p>
            </div>

            {/* Detalles de facturación */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
                <FaFileInvoice className="mr-2 text-gray-900" />
                Detalles del Pago
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Referencia</span>
                  <span className="text-sm font-medium text-gray-900">
                    {paymentData?.invoice_id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Método de Pago</span>
                  <div className="flex gap-2 items-center">
                    <img src={logoNequi} alt="nequi" className="w-6 h-6" />
                    <span className="text-sm font-medium text-gray-900">
                      Nequi
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Numero de Nequi</span>
                  <span className="text-sm font-medium text-gray-900">
                    {paymentData?.payment_method?.phone_number}
                  </span>
                </div>
              </div>
            </div>

            {/* Instrucciones */}
            <div className="bg-fuchsia-50 rounded-xl p-4 mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Importante
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start text-sm text-gray-900">
                  <span className="mr-2">✓</span>
                  Recibirás una notificación en tu app Nequi
                </li>
                <li className="flex items-start text-sm text-gray-900">
                  <span className="mr-2">✓</span>
                  Tienes 5 minutos para aceptar el pago
                </li>
                <li className="flex items-start text-sm text-gray-900">
                  <span className="mr-2">✓</span>
                  Asegúrate de tener saldo disponible
                </li>
              </ul>
            </div>

            {/* Botones de acción */}
            <div className="mt-8 flex flex-row gap-3">
              <button
                onClick={() => navigate("/dashboard/payments")}
                className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                <FaArrowLeft className="mr-2" />
                Volver a Facturas
              </button>
              <button
                onClick={handlePayment}
                disabled={paymentStatus === "PENDING"}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-xl text-white bg-gray-900 hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Confirmar y Pagar
                <FaCheckCircle className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NequiConfirmation;
