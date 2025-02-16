// Movido desde confirmations/BancolombiaTransferConfirmation.tsx
// Se enfoca en confirmar la transferencia 

import { FaArrowLeft, FaCheckCircle, FaUniversity } from 'react-icons/fa'

interface BancolombiaTransferConfirmationProps {
  onBack: () => void
  onNext: () => void
}

export function BancolombiaTransferConfirmation({ 
  onBack, 
  onNext, 
}: BancolombiaTransferConfirmationProps) {
  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center mb-6">
            <FaUniversity className="mx-auto h-12 w-12 text-blue-500" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Confirma los detalles de tu transferencia
            </h3>
          </div>

          <div className="space-y-6">
            {/* Información Personal */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Información Personal</h4>
              <dl className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Nombre:</dt>
                  <dd className="text-sm font-medium text-gray-900">Nombre</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Email:</dt>
                  <dd className="text-sm font-medium text-gray-900">Email</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Teléfono:</dt>
                  <dd className="text-sm font-medium text-gray-900">Telefono</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Documento:</dt>
                  <dd className="text-sm font-medium text-gray-900">Documento</dd>
                </div>
              </dl>
            </div>

            {/* Información del Pago */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Detalles de la Transferencia</h4>
              <dl className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Monto a transferir:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    $100.000
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Cuenta destino:</dt>
                  <dd className="text-sm font-medium text-gray-900">Ahorros **** 4567</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Titular:</dt>
                  <dd className="text-sm font-medium text-gray-900">Empresa S.A.S</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Referencia:</dt>
                  <dd className="text-sm font-medium text-gray-900">1234567890</dd>
                </div>
              </dl>
            </div>

            {/* Instrucciones finales */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Importante</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Verifica que todos los datos sean correctos</li>
                <li>• Usa la referencia exacta al realizar la transferencia</li>
                <li>• El pago será confirmado en las próximas 24 horas</li>
              </ul>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaArrowLeft className="mr-2 h-4 w-4" />
                Revisar datos
              </button>
              <button
                onClick={onNext}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Confirmar datos
                <FaCheckCircle className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 