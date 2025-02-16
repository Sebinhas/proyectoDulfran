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
    <div className="max-w-[550px] mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white rounded-2xl shadow-lg"
      >
        {/* Borde superior dentado */}
        <div
          className="absolute top-0 left-0 right-0 h-4 bg-[#f3f4f6]"
          style={{
            clipPath:
              "polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)",
          }}
        />

        {/* Círculos laterales */}
        <div className="absolute -left-4 top-1/3 w-8 h-8 bg-[#f3f4f6] rounded-full" />
        <div className="absolute -right-4 top-1/3 w-8 h-8 bg-[#f3f4f6] rounded-full" />
        <div className="absolute -left-4 top-2/3 w-8 h-8 bg-[#f3f4f6] rounded-full" />
        <div className="absolute -right-4 top-2/3 w-8 h-8 bg-[#f3f4f6] rounded-full" />

        {/* Contenido principal */}
        <div className="pt-8 px-8 pb-6 bg-white">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {statusConfig.title}
            </h1>
            <div
              className={`w-20 h-20 ${statusConfig.bgColor} rounded-2xl mx-auto flex items-center justify-center shadow-lg`}
            >
              {statusConfig.icon}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
              <h2 className="text-gray-600 font-medium">¿Cuánto pagaste?</h2>
              <p className="text-2xl font-bold text-gray-900">
                {formatAmount(paymentData.wompi_data.amount_in_cents)}
              </p>
            </div>

            <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
              <h2 className="text-gray-600 font-medium">Descripción</h2>
              <p className="text-base text-gray-900 text-right">
                {paymentData.wompi_data.payment_method.payment_description}
              </p>
            </div>

            <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
              <h2 className="text-gray-600 font-medium">Fecha</h2>
              <p className="text-base text-gray-900">
                {formatDate(paymentData.wompi_data.created_at)}
              </p>
            </div>

            <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
              <h2 className="text-gray-600 font-medium min-w-[100px]">Referencia</h2>
              <p className="text-base text-gray-900 font-mono text-right pl-4">
                {paymentData.wompi_data.reference}
              </p>
            </div>
          </div>
        </div>

        {/* Mensaje adicional y botones */}
        <div className="px-8 pt-4 pb-6">
          <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Información importante:
            </h3>
            <ul className="text-sm text-gray-600 space-y-1.5">
              <li className="flex items-center">
                <span className="mr-2 w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Guarda este comprobante para cualquier reclamo
              </li>
              <li className="flex items-center">
                <span className="mr-2 w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                El tiempo de aplicación puede tardar hasta 24 horas
              </li>
              <li className="flex items-center">
                <span className="mr-2 w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Para dudas o reclamos, contacta a soporte
              </li>
            </ul>
          </div>

          {/* Botones integrados */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              <FaPrint className="mr-2" />
              Imprimir
            </button>
            <button
              onClick={() => {
                /* Lógica para descargar PDF */
              }}
              className="flex items-center justify-center px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              <FaDownload className="mr-2" />
              Descargar
            </button>
            <button
              onClick={() => navigate("/dashboard/payments") || window.location.reload()}
              className="col-span-2 flex items-center justify-center px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
            >
              Volver a Facturas
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentReceipt;
