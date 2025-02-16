import { useState, useCallback } from "react";
import { paymentAPI } from "../api/axios.helper";
import Swal from "sweetalert2";

interface UsePaymentPollingProps {
  onSuccess: (data: any) => void;
}

export const usePaymentPolling = ({ onSuccess }: UsePaymentPollingProps) => {
  const [timeLeft, setTimeLeft] = useState(20);
  const [pollingAttempts, setPollingAttempts] = useState(0);
  const [isPolling, setIsPolling] = useState(false);
  const maxPollingAttempts = 3;

  const startPolling = useCallback(
    async (reference: string) => {
      setIsPolling(true);
      setPollingAttempts(0);

      const makeAttempt = async () => {
        const response = await paymentAPI.checkStatus(reference);

        if (response.status !== "PENDING" && response.data) {
          setIsPolling(false);
          onSuccess(response.data);
          return true;
        }
        return false;
      };

      const runPolling = async () => {
        let attempt = 0;

        while (attempt < maxPollingAttempts) {
          // Primera verificación del intento
          const success = await makeAttempt();
          if (success) return;

          // Si no tuvo éxito, iniciamos el contador
          setTimeLeft(20);
          attempt++;
          setPollingAttempts(attempt);

          // Esperamos 20 segundos antes del siguiente intento
          for (let i = 20; i > 0; i--) {
            setTimeLeft(i);
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }

        // Si llegamos aquí, se acabaron los intentos
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
      };

      runPolling();
    },
    [maxPollingAttempts, onSuccess]
  );

  return {
    timeLeft,
    pollingAttempts,
    isPolling,
    maxPollingAttempts,
    startPolling,
  };
};
