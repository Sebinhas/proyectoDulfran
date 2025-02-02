// Movido desde confirmations/QRConfirmation.tsx
// Se enfoca en mostrar el QR y confirmar el pago 

import { FaArrowLeft, FaCheckCircle, FaQrcode } from 'react-icons/fa'
import type { PersonalData, PaymentInfo } from '../../usePasarela'

interface QRConfirmationProps {
  onBack: () => void
  onNext: () => void
  personalData: PersonalData
  paymentInfo: PaymentInfo
}

export function QRConfirmation({ onBack, onNext, personalData, paymentInfo }: QRConfirmationProps) {
  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center mb-6">
            <FaQrcode className="mx-auto h-12 w-12 text-indigo-500" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Confirma los detalles de tu pago QR
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
                  <dt className="text-sm text-gray-600">Teléfono:</dt>
                  <dd className="text-sm font-medium text-gray-900">{personalData.telefono}</dd>
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
                  <dt className="text-sm text-gray-600">Referencia:</dt>
                  <dd className="text-sm font-medium text-gray-900">{paymentInfo.referencia}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Fecha:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {new Date(paymentInfo.fecha).toLocaleDateString('es-CO')}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Instrucciones finales */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Importante</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Verifica que todos los datos sean correctos</li>
                <li>• El código QR será generado al confirmar</li>
                <li>• Tendrás 15 minutos para completar el pago</li>
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
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Generar QR
                <FaCheckCircle className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 