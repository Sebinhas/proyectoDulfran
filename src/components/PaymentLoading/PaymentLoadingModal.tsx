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
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-4"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="text-4xl mb-4"
            >
              {currentMessage.icon}
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-xl font-bold text-gray-900 mb-2"
            >
              {currentMessage.title}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 mb-6"
            >
              {currentMessage.description}
            </motion.p>

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
                <motion.circle
                  className="text-fuchsia-600"
                  strokeWidth="8"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * progress) / 30}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                />
              </svg>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-gray-700"
              >
                {progress}s
              </motion.span>
            </div>

            <div className="text-sm text-gray-500">
              Intento {pollingAttempts + 1} de {maxPollingAttempts}
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-gray-50 p-4 rounded-lg"
          >
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Mientras tanto:
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="mr-2">✓</span> Mantén esta ventana abierta
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Revisa tu app de Nequi
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Acepta la solicitud de pago
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentLoadingModal; 