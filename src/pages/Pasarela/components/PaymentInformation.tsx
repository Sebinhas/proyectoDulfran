import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

interface PaymentInformationProps {
  onNext: () => void
  onBack: () => void
  selectedMethod: string
  initialInfo: any
}

export function PaymentInformation({
  onNext,
  onBack,
  selectedMethod,
  initialInfo
}: PaymentInformationProps) {
  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Información del Pago
        </h3>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-6">
            {/* Detalles del pago */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Resumen de la transacción</h4>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Monto a pagar:</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    ${initialInfo.monto.toLocaleString('es-CO')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Método seleccionado:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {selectedMethod === 'credit-card' && 'Tarjeta de Crédito'}
                    {selectedMethod === 'qr-bancolombia' && 'QR Bancolombia'}
                    {selectedMethod === 'bancolombia-transfer' && 'Transferencia Bancolombia'}
                    {selectedMethod === 'nequi' && 'Nequi'}
                    {selectedMethod === 'pse' && 'PSE'}
                    {selectedMethod === 'efectivo' && 'Efectivo'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Referencia:</dt>
                  <dd className="text-sm font-medium text-gray-900">{initialInfo.referencia}</dd>
                </div>
              </dl>
            </div>

            {/* Descripción del pago */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Descripción</h4>
              <p className="mt-2 text-sm text-gray-600">
                {initialInfo.descripcion}
              </p>
            </div>

            {/* Información adicional */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Información importante</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li>• El tiempo de procesamiento puede variar según el método de pago</li>
                <li>• Guarda tu número de referencia</li>
                <li>• Recibirás un correo de confirmación</li>
              </ul>
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
              Continuar
              <FaArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 