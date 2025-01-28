import { FaArrowLeft, FaCheckCircle, FaMoneyBill } from 'react-icons/fa'
import type { PersonalData, PaymentInfo } from '../../usePasarela'

interface EfectivoConfirmationProps {
  onBack: () => void
  onNext: () => void
  personalData: PersonalData
  paymentInfo: PaymentInfo
}

export function EfectivoConfirmation({ 
  onBack, 
  onNext, 
  personalData,
  paymentInfo 
}: EfectivoConfirmationProps) {
  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center mb-6">
            <FaMoneyBill className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Confirma tu pago en efectivo
            </h3>
          </div>

          <div className="space-y-6">
            {/* Información Personal */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Información Personal</h4>
              <dl className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Nombre:</dt>
                  <dd className="text-sm font-medium text-gray-900">{personalData.nombre}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Email:</dt>
                  <dd className="text-sm font-medium text-gray-900">{personalData.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Documento:</dt>
                  <dd className="text-sm font-medium text-gray-900">{personalData.documento}</dd>
                </div>
              </dl>
            </div>

            {/* Información del Pago */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Detalles del Pago</h4>
              <dl className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Monto:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${paymentInfo.monto.toLocaleString('es-CO')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Código de pago:</dt>
                  <dd className="text-sm font-medium text-gray-900 font-mono">{paymentInfo.referencia}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Válido hasta:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {new Date(paymentInfo.fecha).toLocaleDateString('es-CO')}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Puntos de pago */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Puntos de pago disponibles</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Efecty</li>
                <li>• Baloto</li>
                <li>• Corresponsales Bancolombia</li>
                <li>• Puntos Pago Aliado</li>
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
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Generar código
                <FaCheckCircle className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 