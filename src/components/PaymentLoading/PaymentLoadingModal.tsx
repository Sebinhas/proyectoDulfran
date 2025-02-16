import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentLoadingModalProps {
  timeLeft: number;
  pollingAttempts: number;
  maxPollingAttempts: number;
  currentMessage: {
    title: string;
    description: string;
    icon: string;
  };
}

const PaymentLoadingModal: React.FC<PaymentLoadingModalProps> = ({
  timeLeft: initialTimeLeft,
  pollingAttempts,
  maxPollingAttempts,
  currentMessage,
}) => {
  const [progress, setProgress] = useState(initialTimeLeft);
  
  useEffect(() => {
    setProgress(initialTimeLeft);
    const timer = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTimeLeft]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full mx-4 border border-gray-100"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="text-5xl mb-6"
            >
              {currentMessage.icon}
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl font-bold text-gray-900 mb-3"
            >
              {currentMessage.title}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 mb-8 text-lg"
            >
              {currentMessage.description}
            </motion.p>

            <div className="relative mx-auto w-32 h-32 mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  className="text-gray-100"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  r="45"
                  cx="50"
                  cy="50"
                />
                <motion.circle
                  className="text-[#210049]"
                  strokeWidth="4"
                  strokeDasharray={283}
                  strokeDashoffset={283 - (283 * progress) / 20}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="45"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-gray-800">{progress}</span>
                <span className="text-sm text-gray-500">segundos</span>
              </div>
            </div>

            <div className="text-sm font-medium text-gray-500">
              Intento {pollingAttempts + 1} de {maxPollingAttempts}
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-gray-50/50 p-6 rounded-xl border border-gray-100"
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Mientras tanto:
            </h3>
            <ul className="text-sm text-gray-600 space-y-3">
              <li className="flex items-center">
                <span className="mr-3 flex-shrink-0 w-5 h-5 bg-fuchsia-100 rounded-full flex items-center justify-center">
                  <span className="text-[#210049] text-xs">✓</span>
                </span>
                Mantén esta ventana abierta
              </li>
              <li className="flex items-center">
                <span className="mr-3 flex-shrink-0 w-5 h-5 bg-fuchsia-100 rounded-full flex items-center justify-center">
                  <span className="text-[#210049] text-xs">✓</span>
                </span>
                Revisa tu app de Nequi
              </li>
              <li className="flex items-center">
                <span className="mr-3 flex-shrink-0 w-5 h-5 bg-fuchsia-100 rounded-full flex items-center justify-center">
                  <span className="text-[#210049] text-xs">✓</span>
                </span>
                Acepta la solicitud de pago
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentLoadingModal; 