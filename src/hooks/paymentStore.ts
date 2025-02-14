import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCurrentProfile, login } from "../api/axios.helper";

interface PaymentState {
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
    setField: (field: keyof Omit<PaymentState, 'setField' | 'setFields'>, value: any) => void;
    setFields: (data: Partial<Omit<PaymentState, 'setField' | 'setFields'>>) => void;
}

interface PaymentMethod {

    type?: string;

    //NEQUI
    phone_number?: string;

    //PSE
    user_type?: string;
    user_legal_id_type?: string;
    user_legal_id?: string;
    financial_institution_code?: string;
    payment_description?: string;
}


export const usePaymentStore = create<PaymentState>()(
  persist(
    (set) => ({
      invoice_id: "",
      amount_in_cents: 0,
      customer_email: "",
      buyer_name: "",
      buyer_phone: "",
      legal_id: "",
      legal_id_type: "",
      user_type: "",
      payment_method: undefined,
      payment_description: "",
      
      setField: (field, value) => 
        set((state) => ({ ...state, [field]: value })),
      
      setFields: (data) => 
        set((state) => ({ ...state, ...data })),


    }),
    {
      name: "payment-storage",
    }
  )
);
