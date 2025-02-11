import { useState } from 'react'
import { FaArrowRight, FaArrowLeft, FaCreditCard, FaQrcode, FaUniversity, FaMoneyBill } from 'react-icons/fa'
import { FaN } from "react-icons/fa6";

const paymentMethods = [
  {
    id: 'credit-card',
    title: 'Paga con tus tarjetas',
    description: 'Visa, Mastercard, American Express',
    icon: FaCreditCard,
  },
  {
    id: 'qr-bancolombia',
    title: 'Paga con QR Bancolombia',
    description: 'Escanea y paga con la app',
    icon: FaQrcode,
  },
  {
    id: 'bancolombia-transfer',
    title: 'Transfiere con tu cuenta',
    description: 'Ahorro o corriente Bancolombia',
    icon: FaUniversity,
  },
  {
    id: 'nequi',
    title: 'Paga con tu cuenta Nequi',
    description: 'Transfiere desde Nequi',
    icon: FaN,
  },
  {
    id: 'pse',
    title: 'Paga con tu cuenta PSE',
    description: 'Débito bancario PSE',
    icon: FaUniversity,
  },
  {
    id: 'efectivo',
    title: 'Paga en efectivo en Corresponsal',
    description: 'Bancario',
    icon: FaMoneyBill,
  },
]

interface PaymentMethodSectionProps {
  onMethodSelect: (method: string) => void
  onNext: () => void
  onBack: () => void
  isFirstStep?: boolean
}

export function PaymentMethodSection({ 
  onMethodSelect, 
  onNext, 
  onBack,
  isFirstStep = false 
}: PaymentMethodSectionProps) {
  const [selected, setSelected] = useState<typeof paymentMethods[0] | null>(null);

  const handleSelection = (method: typeof paymentMethods[0]) => {
    setSelected(method);
    onMethodSelect(method.id);
  }

  // Dividir los métodos en dos columnas
  const leftMethods = paymentMethods.slice(0, 3)
  const rightMethods = paymentMethods.slice(3)

  return (
    <div className="w-full px-4 py-6">
      <h3 className="text-lg font-medium pb-4 text-gray-900">Selecciona un método de pago</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna izquierda */}
        <div className="space-y-4">
          {leftMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => handleSelection(method)}
              className={`w-full ${
                selected?.id === method.id
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2'
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              } relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm">
                    <p className={`font-medium ${
                      selected?.id === method.id ? 'text-white' : 'text-gray-900'
                    }`}>
                      {method.title}
                    </p>
                    <span className={`inline ${
                      selected?.id === method.id ? 'text-indigo-100' : 'text-gray-500'
                    }`}>
                      {method.description}
                    </span>
                  </div>
                </div>
                <div className={`shrink-0 ${
                  selected?.id === method.id ? 'text-white' : 'text-indigo-600'
                }`}>
                  <method.icon className="h-6 w-6" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Columna derecha */}
        <div className="space-y-4">
          {rightMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => handleSelection(method)}
              className={`w-full ${
                selected?.id === method.id
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2'
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              } relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm">
                    <p className={`font-medium ${
                      selected?.id === method.id ? 'text-white' : 'text-gray-900'
                    }`}>
                      {method.title}
                    </p>
                    <span className={`inline ${
                      selected?.id === method.id ? 'text-indigo-100' : 'text-gray-500'
                    }`}>
                      {method.description}
                    </span>
                  </div>
                </div>
                <div className={`shrink-0 ${
                  selected?.id === method.id ? 'text-white' : 'text-indigo-600'
                }`}>
                  <method.icon className="h-6 w-6" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="mt-8 flex justify-between">
        {!isFirstStep && (
          <button
            onClick={onBack}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaArrowLeft className="mr-2 h-4 w-4" />
            Atrás
          </button>
        )}
        <div className={isFirstStep ? 'ml-auto' : ''}>
          <button
            onClick={onNext}
            disabled={!selected}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm ${
              !selected 
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }`}
          >
            Siguiente
            <FaArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
} 