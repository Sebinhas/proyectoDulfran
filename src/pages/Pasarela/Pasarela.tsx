import { usePasarela } from "./usePasarela";
import { PaymentMethodSection } from "./components/PaymentMethodSection";

export default function Pasarela() {
  const { handlePaymentMethodSelect } = usePasarela();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-gray-50 py-8">
      <div className="w-full max-w-[1300px] px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Proceso de Pago
          </h2>

          <div className="mt-8">
            <PaymentMethodSection
              onMethodSelect={handlePaymentMethodSelect}
              onNext={() => {}}
              onBack={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
