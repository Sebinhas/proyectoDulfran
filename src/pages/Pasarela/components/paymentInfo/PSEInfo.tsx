import { FaArrowLeft, FaUniversity } from 'react-icons/fa'
import type { PersonalData } from '../../usePasarela'

interface PSEInfoProps {
  onBack: () => void
  onNext: () => void
  personalData: PersonalData
}

export function PSEInfo({ onBack, onNext, personalData }: PSEInfoProps) {
  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Pago PSE
        </h3>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-6">
            {/* Selección de banco */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Selecciona tu banco
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Selecciona...</option>
                <option value="bancolombia">Bancolombia</option>
                <option value="davivienda">Davivienda</option>
                <option value="bbva">BBVA</option>
                <option value="banco-bogota">Banco de Bogotá</option>
              </select>
            </div>

            {/* Tipo de cuenta */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo de cuenta
              </label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="accountType"
                    value="personal"
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Personal</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="accountType"
                    value="empresarial"
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Empresarial</span>
                </label>
              </div>
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
              Ir al banco
              <FaUniversity className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 