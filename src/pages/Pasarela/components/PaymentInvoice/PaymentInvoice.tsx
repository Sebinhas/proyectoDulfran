import React from 'react';
import { motion } from 'framer-motion';
import { Paper, Divider, Typography, Box } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import QRCode from 'react-qr-code';

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
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0
    }
  };

  const formatAmount = (amountInCents: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(amountInCents / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto p-4"
    >
      <Paper elevation={3} className="p-8 bg-white">
        {/* Encabezado */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <CheckCircle sx={{ fontSize: 60, color: '#4CAF50' }} />
          </motion.div>
          <Typography variant="h4" className="mt-4 text-green-600">
            ¡Pago Exitoso!
          </Typography>
        </motion.div>

        <Divider className="my-6" />

        {/* Detalles del Pago */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <Box className="col-span-2 md:col-span-1">
            <Typography variant="subtitle2" color="textSecondary">
              Referencia de Pago
            </Typography>
            <Typography variant="body1" className="font-semibold">
              {paymentData.wompi_data.reference}
            </Typography>
          </Box>

          <Box className="col-span-2 md:col-span-1">
            <Typography variant="subtitle2" color="textSecondary">
              Monto
            </Typography>
            <Typography variant="h6" className="text-green-600 font-bold">
              {formatAmount(paymentData.wompi_data.amount_in_cents)}
            </Typography>
          </Box>

          <Box className="col-span-2 md:col-span-1">
            <Typography variant="subtitle2" color="textSecondary">
              Fecha y Hora
            </Typography>
            <Typography variant="body1">
              {formatDate(paymentData.wompi_data.created_at)}
            </Typography>
          </Box>

          <Box className="col-span-2 md:col-span-1">
            <Typography variant="subtitle2" color="textSecondary">
              Método de Pago
            </Typography>
            <Typography variant="body1">
              {paymentData.wompi_data.payment_method.type}
            </Typography>
          </Box>
        </motion.div>

        <Divider className="my-6" />

        {/* Información del Cliente */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <Box className="col-span-2 md:col-span-1">
            <Typography variant="subtitle2" color="textSecondary">
              Cliente
            </Typography>
            <Typography variant="body1">
              {paymentData.wompi_data.customer_data.full_name}
            </Typography>
          </Box>

          <Box className="col-span-2 md:col-span-1">
            <Typography variant="subtitle2" color="textSecondary">
              Documento
            </Typography>
            <Typography variant="body1">
              {paymentData.wompi_data.customer_data.legal_id_type} {paymentData.wompi_data.customer_data.legal_id}
            </Typography>
          </Box>

          <Box className="col-span-2 md:col-span-1">
            <Typography variant="subtitle2" color="textSecondary">
              Email
            </Typography>
            <Typography variant="body1">
              {paymentData.wompi_data.customer_email}
            </Typography>
          </Box>

          <Box className="col-span-2 md:col-span-1">
            <Typography variant="subtitle2" color="textSecondary">
              Teléfono
            </Typography>
            <Typography variant="body1">
              {paymentData.wompi_data.customer_data.phone_number}
            </Typography>
          </Box>
        </motion.div>

        {/* QR y ID de Transacción */}
        <motion.div 
          variants={itemVariants} 
          className="mt-6 text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <QRCode 
            value={paymentData.payment_id}
            size={128}
            className="mx-auto mb-4"
          />
          <Typography variant="caption" color="textSecondary" display="block">
            ID de Transacción: {paymentData.wompi_data.id}
          </Typography>
        </motion.div>

        {/* Botones de Acción */}
        <motion.div 
          variants={itemVariants}
          className="mt-6 flex justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => window.print()}
          >
            Imprimir Comprobante
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={() => {/* Función para descargar PDF */}}
          >
            Descargar PDF
          </motion.button>
        </motion.div>
      </Paper>
    </motion.div>
  );
};

export default PaymentReceipt;