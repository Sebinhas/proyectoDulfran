import { FaArrowLeft, FaQrcode } from 'react-icons/fa'
import type { PersonalData } from '../../usePasarela'

interface QRInfoProps {
  onBack: () => void
  onNext: () => void
  personalData: PersonalData
}

export function QRInfo({ onBack, onNext, personalData }: QRInfoProps) {
  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Pago con QR Bancolombia
        </h3>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-gray-100 p-8 rounded-lg inline-block">
                {/* Aquí iría la imagen del QR */}
                <FaQrcode className="h-48 w-48 text-gray-600" />
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Escanea este código QR con tu app Bancolombia
              </p>
            </div>

            {/* Instrucciones */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Pasos para pagar:</h4>
              <ol className="mt-2 space-y-2 text-sm text-gray-600">
                <li>1. Abre tu app Bancolombia</li>
                <li>2. Selecciona la opción "Pagar con QR"</li>
                <li>3. Escanea el código</li>
                <li>4. Confirma el pago en tu app</li>
              </ol>
            </div>

            {/* Información del comprador */}
            <div className="border-t border-gray-200 pt-4">
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
              Ya pagué
              <FaQrcode className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 