import React, { createContext, useContext, useState } from 'react';

interface PaymentMethod {
  type?: string;
  
  // NEQUI
  phone_number?: string;
  
  // PSE
  user_type?: string;
  user_legal_id_type?: string;
  user_legal_id?: string;
  financial_institution_code?: string;
  payment_description?: string;
}

interface PaymentData {
  invoice_id: string;
  amount_in_cents: number;
  customer_email: string;
  buyer_name: string;
  buyer_phone: string;
  legal_id: string;
  legal_id_type: string;
  user_type: string;
  payment_method?: PaymentMethod;
  payment_description: string;
}

interface PaymentContextProps {
  paymentData: PaymentData | null;
  setPaymentData: (data: PaymentData | null) => void;
  updatePaymentMethod: (method: PaymentMethod) => void;
}

const PaymentContext = createContext<PaymentContextProps | undefined>(undefined);

interface PaymentProviderProps {
  children: React.ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  const updatePaymentMethod = (method: PaymentMethod) => {
    setPaymentData(prev => prev ? { ...prev, payment_method: method } : null);
  };

  return (
    <PaymentContext.Provider value={{ paymentData, setPaymentData, updatePaymentMethod }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePaymentContext must be used within a PaymentProvider');
  }
  return context;
}; 