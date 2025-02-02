import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import type { PersonalData } from '../../usePasarela'

interface CreditCardConfirmationProps {
  onBack: () => void
  onNext: () => void
  personalData: PersonalData
}

export function CreditCardConfirmation({ onBack, onNext, personalData }: CreditCardConfirmationProps) {
  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center mb-6">
            <FaCheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Confirma tu pago con tarjeta
            </h3>
          </div>

          <div className="space-y-6">
            {/* Resumen de la tarjeta */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Detalles de la tarjeta</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tarjeta terminada en</span>
                  <span className="text-sm font-medium text-gray-900">****4242</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tipo</span>
                  <span className="text-sm font-medium text-gray-900">Visa</span>
                </div>
              </div>
            </div>

            {/* Información de seguridad */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Verificación de seguridad</h4>
              <p className="mt-2 text-sm text-gray-600">
                Tu pago será procesado de forma segura. No compartiremos tus datos con terceros.
              </p>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaArrowLeft className="mr-2 h-4 w-4" />
                Atrás
              </button>
              <button
                onClick={onNext}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Confirmar Pago
                <FaCheckCircle className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 