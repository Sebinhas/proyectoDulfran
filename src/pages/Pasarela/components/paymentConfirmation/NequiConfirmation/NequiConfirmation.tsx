import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { FaN } from "react-icons/fa6";
import { useState, useEffect } from "react";
import PaymentInvoice from "../../PaymentInvoice/PaymentInvoice";
import { useAuthStore } from "../../../../../hooks/authStore";
import Swal from "sweetalert2";
import { usePaymentContext } from "../../../../../context/PaymentContext";
import { useNavigate } from "react-router-dom";

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

  const messages = [
    "Enviando solicitud de pago...",
    "Esperando confirmación de Nequi...",
    "Verificando tu pago...",
    "¡Casi listo! Confirmando transacción...",
    "Generando comprobante...",
  ];

  const checkPaymentStatus = async (reference: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/payments/status?reference=${reference}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data.status !== "PENDING") {
        // Si ya no está pendiente, actualizamos la información
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
        return data.status;
      }
      return "PENDING";
    } catch (error) {
      console.error("Error checking payment status:", error);
      return "DECLINED";
    }
  };

  const createPayment = async () => {
    try {
      const amount =
        typeof paymentData?.amount_in_cents === "string"
          ? parseInt(paymentData?.amount_in_cents)
          : paymentData?.amount_in_cents;

      if (
        paymentData?.buyer_phone?.length &&
        (paymentData?.buyer_phone?.length < 10 ||
          paymentData?.buyer_phone?.length > 10)
      ) {
        paymentData.buyer_phone = "0000000000";
      }
      const paymentRequest = {
        invoice_id: paymentData?.invoice_id,
        amount_in_cents: amount,
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
    const maxAttempts = messages.length;
    let attempts = 0;

    const interval = setInterval(async () => {
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        setPaymentStatus("DECLINED");
        return;
      }

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
        setCounter(attempts);
        attempts++;

        if (data.status !== "PENDING") {
          clearInterval(interval);
          setPaymentStatus(data.status);

          // Guardar la información de la transacción
          const formattedData = {
            payment_id: data.id,
            wompi_data: {
              id: data.wompi_transaction_id,
              created_at: data.transaction_created_at,
              amount_in_cents: parseInt(data.amount) * 100,
              reference: data.reference,
              customer_email: data.buyer_email,
              status: data.status,
              payment_method: data.payment_method_data,
              customer_data: data.customer_data,
              payment_data: data.payment_data,
              status_message: data.status_message,
            },
          };
          setTransactionInfo(formattedData);
          setShowInvoice(true);
        }
      } catch (error) {
        console.error("Error checking status:", error);
        clearInterval(interval);
        setPaymentStatus("DECLINED");
      }
    }, 5000);
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
      setMessage(messages[Math.min(counter, messages.length - 1)]);
    }
  }, [counter, paymentStatus]);

  // Manejo del estado pendiente
  if (paymentStatus === "PENDING") {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-yellow-500 text-center mb-6">
            <div className="animate-pulse">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-yellow-600 mt-4">
              Pago en Proceso
            </h2>
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-600">
              Tu pago está siendo procesado por Nequi. Por favor, revisa tu
              aplicación móvil.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {/* Referencia: {paymentInfo.wompi_data.reference} */}
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-yellow-800">
                Importante
              </h3>
              <ul className="mt-2 text-sm text-yellow-700">
                <li>• Mantén esta ventana abierta</li>
                <li>• Revisa tu aplicación Nequi</li>
                <li>• Acepta la solicitud de pago</li>
              </ul>
            </div>

            <button
              onClick={() => navigate("/dashboard/payments")}
              className="w-full px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Volver a Facturas
            </button>
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
    <div className="w-full px-4 py-6 relative min-h-screen">
      <div className="mx-auto w-full max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center mb-6">
            <FaN className="mx-auto h-12 w-12 text-fuchsia-500" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Confirma tu pago con Nequi
            </h3>
          </div>

          <div className="space-y-6">
            {/* Información Personal */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Información Personal
              </h4>
              <dl className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Nombre:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {transactionInfo?.wompi_data?.customer_data?.full_name ||
                      paymentData?.buyer_name}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Email:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {transactionInfo?.wompi_data?.customer_data?.email ||
                      paymentData?.customer_email}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Teléfono Nequi:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {transactionInfo?.wompi_data?.customer_data?.phone_number ||
                      paymentData?.payment_method?.phone_number}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Información del Pago */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Detalles del Pago
              </h4>
              <dl className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Monto:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    $
                    {transactionInfo?.wompi_data?.amount_in_cents
                      ? (
                          transactionInfo.wompi_data.amount_in_cents / 100
                        ).toLocaleString("es-CO")
                      : paymentData?.amount_in_cents?.toLocaleString("es-CO") ||
                        "0"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Referencia:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {transactionInfo?.wompi_data?.reference ||
                      paymentData?.invoice_id}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Instrucciones */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Importante</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Recibirás una notificación en tu app Nequi</li>
                <li>• Tienes 5 minutos para aceptar el pago</li>
                <li>• Asegúrate de tener saldo disponible</li>
              </ul>
            </div>

            {transactionInfo?.paymentStatus === "PENDING" && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 min-h-screen">
                <div className="bg-white p-8 rounded-lg text-center max-w-md w-full mx-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-600 mx-auto mb-6"></div>
                  <p className="text-lg font-medium mb-2">{message}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-fuchsia-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${(counter + 1) * 20}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Por favor, no cierres esta ventana
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => navigate("/dashboard/payments")}
                disabled={transactionInfo?.paymentStatus === "PENDING"}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <FaArrowLeft className="mr-2 h-4 w-4" />
                Volver a facturas
              </button>
              <button
                onClick={handlePayment}
                disabled={transactionInfo?.paymentStatus === "PENDING"}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 disabled:opacity-50"
              >
                Pagar con Nequi
                <FaCheckCircle className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NequiConfirmation;
