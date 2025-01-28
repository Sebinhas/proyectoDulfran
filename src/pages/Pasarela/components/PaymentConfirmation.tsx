import { FaArrowLeft, FaCheck } from 'react-icons/fa'

interface PaymentConfirmationProps {
  onBack: () => void
  selectedMethod: string
}

export function PaymentConfirmation({ onBack, selectedMethod }: PaymentConfirmationProps) {
  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Confirma tu pago
        </h3>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-gray-600 mb-4">
            Método de pago seleccionado: {selectedMethod}
          </p>
          {/* Aquí puedes agregar más detalles del pago */}
        </div>

        {/* Botones de navegación */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaArrowLeft className="mr-2 h-4 w-4" />
            Atrás
          </button>
          <button
            onClick={() => alert('Pago confirmado')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Confirmar Pago
            <FaCheck className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
} 