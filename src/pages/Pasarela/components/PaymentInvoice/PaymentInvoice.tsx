import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaPrint,
} from "react-icons/fa";
import { motion } from "framer-motion";

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
        payment_description: string;
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
          icon: <FaCheckCircle className="w-12 h-12 text-white" />,
          title: "¡Pago exitoso!",
          bgColor: "bg-emerald-400",
          textColor: "text-emerald-600",
        };
      case "DECLINED":
        return {
          icon: <FaTimesCircle className="w-12 h-12 text-white" />,
          title: "Pago Declinado",
          bgColor: "bg-red-400",
          textColor: "text-red-600",
        };
      default:
        return {
          icon: <FaTimesCircle className="w-12 h-12 text-white" />,
          title: "Estado del Pago",
          bgColor: "bg-yellow-400",
          textColor: "text-yellow-600",
        };
    }
  };

  const statusConfig = getStatusConfig(paymentData.wompi_data.status);

  return (
    <div className="max-w-[550px] mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white"
      >
        {/* Borde superior dentado */}
        <div
          className="absolute top-0 left-0 right-0 h-4 bg-gray-100"
          style={{
            clipPath:
              "polygon(0% 0%, 4% 100%, 8% 0%, 12% 100%, 16% 0%, 20% 100%, 24% 0%, 28% 100%, 32% 0%, 36% 100%, 40% 0%, 44% 100%, 48% 0%, 52% 100%, 56% 0%, 60% 100%, 64% 0%, 68% 100%, 72% 0%, 76% 100%, 80% 0%, 84% 100%, 88% 0%, 92% 100%, 96% 0%, 100% 100%, 100% 0%)",
          }}
        />

        {/* Círculos laterales
        <div className="absolute -left-4 top-12 w-8 h-8 bg-gray-100 rounded-full" />
        <div className="absolute -right-4 top-12 w-8 h-8 bg-gray-100 rounded-full" /> */}

        {/* Contenido principal */}
        <div className="pt-8 px-8 pb-8 bg-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {statusConfig.title}
            </h1>
            <div
              className={`w-20 h-20 ${statusConfig.bgColor} rounded-2xl mx-auto flex items-center justify-center`}
            >
              {statusConfig.icon}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-baseline">
              <h2 className="text-gray-600">¿Cuánto pagaste?</h2>
              <p className="text-2xl font-bold text-gray-900">
                {formatAmount(paymentData.wompi_data.amount_in_cents)}
              </p>
            </div>

            <div className="flex justify-between">
              <h2 className="text-gray-600">Descripción</h2>
              <p className="text-xl text-gray-900">
                {paymentData.wompi_data.payment_method.payment_description}
              </p>
            </div>

            <div className="flex justify-between">
              <h2 className="text-gray-600">Fecha</h2>
              <p className="text-xl text-gray-900">
                {formatDate(paymentData.wompi_data.created_at)}
              </p>
            </div>

            <div className="flex justify-between">
              <h2 className="text-gray-600">Referencia</h2>
              <p className="text-[18px] text-gray-900">
                {paymentData.wompi_data.reference.slice(0, 30)}...
              </p>
            </div>

            {/* <div className="pt-4 border-t">
              <h2 className="text-gray-600 mb-2">Información del Cliente</h2>
              <div className="space-y-2">
                <p className="text-gray-900">
                  <span className="text-gray-600">Nombre:</span>{" "}
                  {paymentData.wompi_data.customer_data.full_name}
                </p>
                <p className="text-gray-900">
                  <span className="text-gray-600">Documento:</span>{" "}
                  {paymentData.wompi_data.customer_data.legal_id_type}{" "}
                  {paymentData.wompi_data.customer_data.legal_id}
                </p>
                <p className="text-gray-900">
                  <span className="text-gray-600">Email:</span>{" "}
                  {paymentData.wompi_data.customer_email}
                </p>
                <p className="text-gray-900">
                  <span className="text-gray-600">Teléfono:</span>{" "}
                  {paymentData.wompi_data.customer_data.phone_number}
                </p>
              </div>
            </div> */}
          </div>
        </div>

        {/* Mensaje adicional y botones */}
        <div className="pt-4 border-t mt-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Información importante:
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="mr-2">•</span> Guarda este comprobante para
                cualquier reclamo
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span> El tiempo de aplicación puede
                tardar hasta 24 horas
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span> Para dudas o reclamos, contacta
                a soporte
              </li>
            </ul>
          </div>

          {/* Botones integrados */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FaPrint className="mr-2" />
              Imprimir
            </button>
            <button
              onClick={() => {
                /* Lógica para descargar PDF */
              }}
              className="flex items-center justify-center px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FaDownload className="mr-2" />
              Descargar
            </button>
            <button
              onClick={() =>
                navigate("/dashboard/payments") || window.location.reload()
              }
              className="col-span-2 flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Volver a Facturas
            </button>
          </div>
        </div>

        {/* Borde inferior dentado */}
      </motion.div>
    </div>
  );
};

export default PaymentReceipt;
