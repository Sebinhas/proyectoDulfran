import { usePaymentContext } from "../../context/PaymentContext";

export const usePasarela = () => {
  const { paymentData, updatePaymentMethod } = usePaymentContext();

  const handlePaymentMethodSelect = (method: string) => {
    if (method === "nq") {
      updatePaymentMethod({
        type: "NEQUI",
      });
    } else if (method === "pse") {
      updatePaymentMethod({
        type: "PSE",
      });
      console.log("paymentData2", paymentData);
    }

    console.log("paymentData2", paymentData);
  };

  return {
    handlePaymentMethodSelect,
  };
};
