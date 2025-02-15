import {
  FaArrowLeft,
  FaCheckCircle,
  FaUser,
  FaFileInvoice,
} from "react-icons/fa";
import { FaN } from "react-icons/fa6";
import { useState, useEffect } from "react";
import PaymentInvoice from "../../PaymentInvoice/PaymentInvoice";
import { useAuthStore } from "../../../../../hooks/authStore";
import Swal from "sweetalert2";
import { usePaymentContext } from "../../../../../context/PaymentContext";
import { useNavigate } from "react-router-dom";
import logoNequi from "../../../../../../public/nequi-icon.png";
import { priceFormatter } from "../../../../../helpers/priceFormatter.helper";

const NequiConfirmation = () => {
  const token = useAuthStore((state) => state.token);
  const { paymentData } = usePaymentContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("paymentDataFinal", paymentData);
  }, [paymentData]);
  const [paymentStatus, setPaymentStatus] = useState<
    "IDLE" | "PENDING" | "APPROVED" | "DECLINED"
  >("IDLE");
  const [showInvoice, setShowInvoice] = useState(false);
  const [message, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [transactionInfo, setTransactionInfo] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [pollingAttempts, setPollingAttempts] = useState(0);
  const maxPollingAttempts = 10; // Número máximo de intentos

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

  const checkPaymentStatus = async (reference: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/payments/status/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data.status !== "PENDING") {
        const wompiResponse = {
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
        return {
          status: data.status,
          data: wompiResponse,
        };
      }
      return { status: "PENDING", data: null };
    } catch (error) {
      console.error("Error checking payment status:", error);
      return { status: "DECLINED", data: null };
    }
  };

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
        invoice_id: paymentData?.invoice_id,
        amount_in_cents: paymentData?.amount_in_cents,
        customer_email: paymentData?.customer_email,
        buyer_name: paymentData?.buyer_name,
        buyer_phone: paymentData?.buyer_phone || "No disponible",
        legal_id: paymentData?.legal_id,
        legal_id_type: paymentData?.legal_id_type || "CC",
        user_type: "PERSON",
        payment_method: {
          type: "NEQUI",
          phone_number: paymentData?.payment_method?.phone_number,
        },
        payment_description: `Pago factura ${paymentData?.invoice_id}`,
      };

      const response = await fetch("http://localhost:3000/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          title: "Error al crear el pago",
          text: Array.isArray(errorData.message)
            ? errorData.message.join(", ")
            : errorData.message || "Error desconocido",
          icon: "error",
        });
        throw new Error(JSON.stringify(errorData));
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating payment:", error);
      setPaymentStatus("DECLINED");
      return null;
    }
  };

  const startPolling = async (reference: string) => {
    let currentTimeLeft = 30;
    setTimeLeft(currentTimeLeft);

    const pollingInterval = setInterval(async () => {
      try {
        const response = await checkPaymentStatus(reference);

        if (response.status !== "PENDING") {
          clearInterval(pollingInterval);
          setTransactionInfo(response.data);
          setPaymentStatus(response.status);
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
              Swal.fire({
                title: "Tiempo de espera excedido",
                html: `
                  <div class="flex flex-col items-center gap-4">
                    <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                      <svg class="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div class="text-center">
                      <p class="text-lg font-semibold text-gray-700">No pudimos confirmar tu pago</p>
                      <p class="text-sm text-gray-500 mt-2">Por favor, verifica en tu app de Nequi</p>
                    </div>
                  </div>
                `,
                icon: "warning",
                confirmButtonText: "Entendido",
                customClass: {
                  confirmButton:
                    "bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg",
                },
              });
              setPaymentStatus("IDLE");
              return prev;
            }
            // Reiniciar el tiempo para el siguiente intento
            currentTimeLeft = 30;
            setTimeLeft(30);
            setCounter((c) => (c + 1) % messages.length);
            return prev + 1;
          });
        }
      } catch (error) {
        console.error("Error en polling:", error);
      }
    }, 1000); // Ejecutar cada segundo
  };

  const handlePayment = async () => {
    setPaymentStatus("PENDING");
    setCounter(0);

    // 1. Crear el pago
    const paymentResponse = await createPayment();
    if (!paymentResponse) return;

    // 2. Iniciar el polling con la referencia del pago creado
    await startPolling(paymentResponse.wompi_data.reference);
  };

  useEffect(() => {
    if (paymentStatus === "PENDING") {
      setMessage(messages[Math.min(counter, messages.length - 1)].description);
    }
  }, [counter, paymentStatus]);

  // Componente de estado pendiente mejorado
  if (paymentStatus === "PENDING") {
    const currentMessage = messages[Math.min(counter, messages.length - 1)];

    return (
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-4 transform transition-all">
          <div className="text-center">
            <div className="text-4xl mb-4">{currentMessage.icon}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {currentMessage.title}
            </h2>
            <p className="text-gray-600 mb-6">{currentMessage.description}</p>

            {/* Barra de progreso circular */}
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
                  className="text-fuchsia-600 transform -rotate-90 origin-center transition-all duration-300"
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

            <div className="text-sm text-gray-500">
              Intento {pollingAttempts + 1} de {maxPollingAttempts}
            </div>
          </div>

          {/* Instrucciones */}
          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Mientras tanto:
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Mantén esta ventana abierta
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Revisa tu app de Nequi
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Acepta la solicitud de pago
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Si el pago fue aprobado y terminó el polling, mostrar el comprobante
  if (showInvoice && transactionInfo?.wompi_data) {
    return <PaymentInvoice paymentData={transactionInfo} />;
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

            {/* Información del pago */}
            <div className="space-y-6">
              {/* Detalles personales
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
                  <FaUser className="mr-2 text-fuchsia-500" />
                  Información Personal
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Nombre</span>
                    <span className="text-sm font-medium text-gray-900">
                      {paymentData?.buyer_name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Email</span>
                    <span className="text-sm font-medium text-gray-900">
                      {paymentData?.customer_email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Teléfono del Cliente
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {paymentData?.buyer_phone}
                    </span>
                  </div>
                </div>
              </div> */}

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
                    <span className="text-sm text-gray-500">
                      Método de Pago
                    </span>
                    <div className="flex gap-2 items-center">
                      <img src={logoNequi} alt="nequi" className="w-6 h-6" />
                      <span className="text-sm font-medium text-gray-900">
                        Nequi
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Numero de Nequi
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {paymentData?.payment_method?.phone_number}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instrucciones */}
              <div className="bg-fuchsia-50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Importante
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg
                      className="mt-1 mr-2 h-4 w-4 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm text-gray-900">
                      Recibirás una notificación en tu app Nequi
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="mt-1 mr-2 h-4 w-4 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm text-gray-900">
                      Tienes 5 minutos para aceptar el pago
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="mt-1 mr-2 h-4 w-4 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <span className="text-sm text-gray-900">
                      Asegúrate de tener saldo disponible
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="mt-8 flex flex-row gap-3">
              <button
                onClick={() => navigate("/dashboard/payments")}
                className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                <FaArrowLeft className="mr-2 h-5 w-5" />
                Volver a Facturas
              </button>
              <button
                onClick={handlePayment}
                disabled={transactionInfo?.paymentStatus === "PENDING"}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Confirmar y Pagar
                <FaCheckCircle className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NequiConfirmation;
