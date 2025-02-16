import { useState, useCallback } from "react";
import { useAuthStore } from "./authStore";
import Swal from "sweetalert2";

interface UsePaymentPollingProps {
  onSuccess: (data: any) => void;
}

export const usePaymentPolling = ({ onSuccess }: UsePaymentPollingProps) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [pollingAttempts, setPollingAttempts] = useState(0);
  const [isPolling, setIsPolling] = useState(false);
  const token = useAuthStore((state) => state.token);
  const maxPollingAttempts = 10;

  const checkPaymentStatus = async (reference: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/payments/status/${reference}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();

      if (data.status !== "PENDING") {
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
        return { status: data.status, data: formattedData };
      }
      return { status: "PENDING", data: null };
    } catch (error) {
      console.error("Error checking payment status:", error);
      return { status: "ERROR", data: null };
    }
  };

  const startPolling = useCallback(
    async (reference: string) => {
      setIsPolling(true);
      let currentTimeLeft = 30;
      setTimeLeft(currentTimeLeft);

      const pollingInterval = setInterval(async () => {
        try {
          const response = await checkPaymentStatus(reference);

          if (response.status !== "PENDING") {
            clearInterval(pollingInterval);
            setIsPolling(false);
            onSuccess(response.data);
            return;
          }

          currentTimeLeft -= 1;
          setTimeLeft(currentTimeLeft);

          if (currentTimeLeft <= 0) {
            setPollingAttempts((prev) => {
              if (prev >= maxPollingAttempts - 1) {
                clearInterval(pollingInterval);
                setIsPolling(false);
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
                return prev;
              }
              currentTimeLeft = 30;
              setTimeLeft(30);
              return prev + 1;
            });
          }
        } catch (error) {
          console.error("Error en polling:", error);
        }
      }, 1000);

      return () => clearInterval(pollingInterval);
    },
    [token, maxPollingAttempts, onSuccess]
  );

  return {
    timeLeft,
    pollingAttempts,
    isPolling,
    maxPollingAttempts,
    startPolling,
  };
};
