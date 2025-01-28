import { FaArrowLeft, FaCreditCard } from 'react-icons/fa'
import type { PersonalData } from '../../usePasarela'

interface CreditCardInfoProps {
  onBack: () => void
  onNext: () => void
  personalData: PersonalData
}

export function CreditCardInfo({ onBack, onNext, personalData }: CreditCardInfoProps) {
  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Confirma tu pago con tarjeta
        </h3>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            {/* Formulario de tarjeta */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Número de tarjeta
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="**** **** **** ****"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fecha de vencimiento
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="***"
                  />
                </div>
              </div>
            </div>

            {/* Resumen de la información */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Información del comprador</h4>
              <dl className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Nombre:</dt>
                  <dd className="text-sm font-medium text-gray-900">{personalData.nombre}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Email:</dt>
                  <dd className="text-sm font-medium text-gray-900">{personalData.email}</dd>
                </div>
              </dl>
            </div>
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
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Pagar
              <FaCreditCard className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 