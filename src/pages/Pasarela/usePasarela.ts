import { usePaymentContext } from "../../context/PaymentContext";

export const usePasarela = () => {
  const { updatePaymentMethod } = usePaymentContext();

  const handlePaymentMethodSelect = (method: string) => {
    if (method === "nq") {
      updatePaymentMethod({
        type: "NEQUI",
      });
    } else if (method === "pse") {
      updatePaymentMethod({
        type: "PSE",
      });
    }
  };

  return {
    handlePaymentMethodSelect,
  };
};
