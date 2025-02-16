export interface PaymentHistoryViewProps {
  paymentData: {
    invoice_id: string;
    invoice_details: {
      amount: string;
      period: {
        start: string;
        end: string;
      };
      description: string;
      status: string;
    };
    payment_summary: {
      total_attempts: number;
      latest_status: string;
      latest_attempt: {
        reference: string;
        amount: string;
        status: string;
        payment_method: string;
        dates: {
          completed: string | null;
        };
      };
    };
    payment_history: {
      approved: Array<PaymentAttempt>;
      pending: Array<PaymentAttempt>;
      failed: Array<PaymentAttempt>;
    };
  };
  onBack: () => void;
}

interface PaymentAttempt {
  reference: string;
  amount: string;
  payment_method: string;
  buyer: {
    name: string;
    email: string;
    phone: string;
    legal_id: string;
    legal_id_type: string;
  };
  error: any;
  payment_info: {
    method_details: {
      type: string;
      user_type: string;
      phone_number: string;
    };
    currency: string;
    status: string;
    error_message: string;
  };
  dates: {
    transaction_created: string;
    transaction_finalized: string | null;
  };
  attempt: number;
}
