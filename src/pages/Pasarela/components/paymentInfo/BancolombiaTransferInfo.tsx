import { FaArrowLeft, FaUniversity } from 'react-icons/fa'
import type { PersonalData } from '../../usePasarela'

interface BancolombiaTransferInfoProps {
  onBack: () => void
  onNext: () => void
  personalData: PersonalData
}

export function BancolombiaTransferInfo({ 
  onBack, 
  onNext, 
  personalData 
}: BancolombiaTransferInfoProps) {
  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Transferencia Bancolombia
        </h3>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-6">
            {/* Datos de la cuenta */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Datos para la transferencia</h4>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Tipo de cuenta:</dt>
                  <dd className="text-sm font-medium text-gray-900">Ahorros</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Número de cuenta:</dt>
                  <dd className="text-sm font-medium text-gray-900">1234567890</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Titular:</dt>
                  <dd className="text-sm font-medium text-gray-900">Empresa S.A.S</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">NIT:</dt>
                  <dd className="text-sm font-medium text-gray-900">900.123.456-7</dd>
                </div>
              </dl>
            </div>

            {/* Instrucciones */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Pasos para transferir:</h4>
              <ol className="mt-2 space-y-2 text-sm text-gray-600">
                <li>1. Ingresa a tu cuenta Bancolombia</li>
                <li>2. Selecciona "Transferir"</li>
                <li>3. Ingresa los datos de la cuenta destino</li>
                <li>4. Confirma la transferencia</li>
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
              Ya transferí
              <FaUniversity className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 