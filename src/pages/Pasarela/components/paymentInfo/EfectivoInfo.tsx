import { FaArrowLeft, FaMoneyBill } from 'react-icons/fa'
import type { PersonalData } from '../../usePasarela'

interface EfectivoInfoProps {
  onBack: () => void
  onNext: () => void
  personalData: PersonalData
}

export function EfectivoInfo({ onBack, onNext, personalData }: EfectivoInfoProps) {
  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Pago en Efectivo
        </h3>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-6">
            {/* Código de pago */}
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Tu código de pago</h4>
              <p className="text-3xl font-bold text-indigo-600 font-mono">
                7894 5612 3789
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Presenta este código en cualquier corresponsal bancario
              </p>
            </div>

            {/* Puntos de pago */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Puntos de pago disponibles:</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li>• Corresponsales Bancolombia</li>
                <li>• Baloto</li>
                <li>• Efecty</li>
                <li>• Puntos Pago Aliado</li>
              </ul>
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
              Confirmar
              <FaMoneyBill className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 