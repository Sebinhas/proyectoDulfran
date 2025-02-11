import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import type { PersonalData } from '../usePasarela'
import { useEffect } from 'react'

interface PersonalDetailsProps {
  onNext: () => void
  onBack: () => void
  selectedMethod: string
  onPersonalDataChange: (data: PersonalData) => void
  initialData: PersonalData
}

export function PersonalInfoDetails({ 
  onNext, 
  onBack, 
  selectedMethod,
  onPersonalDataChange,
  initialData 
}: PersonalDetailsProps) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
  } = useForm<PersonalData>({
    defaultValues: initialData
  })



  const onSubmit = (data: PersonalData) => {
    onPersonalDataChange(data)
    onNext()
  }

  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-[900px]">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Ingresa tus datos personales
        </h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="w-full flex flex-col gap-6 md:flex-row">
              <div className="w-full h-14 ">
                <div className="text-[18px] font-medium text-gray-600">Nombres y apellidos</div>
                <input
                  value={initialData.fullName}
                  disabled={true}
                  type="text"
                  className={`cursor-not-allowed w-full p-2 border border-gray-300 outline-none rounded-md ${
                    errors.fullName ? 'border-red-500' : ''
                  }`}

                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
                )}

              </div>

              <div className="w-full h-14 ">
                <div className="text-[18px] font-medium text-gray-600">Correo electrónico</div>
                <input
                  value={initialData.email}
                  disabled={true}

                  type="email"
                  className={`cursor-not-allowed w-full p-2 border border-gray-300 outline-none rounded-md ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col gap-6 md:flex-row">
              <div className="w-full h-14 ">
                <div className="text-[18px] font-medium text-gray-600">Teléfono</div>
                <input
                  value={initialData.phone}
                  disabled={true}
                  type="tel"
                  className={`cursor-not-allowed w-full p-2 border border-gray-300 outline-none rounded-md ${
                    errors.phone ? 'border-red-500' : ''
                  }`}


                />

              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
              )}

              </div>
              <div className="w-full h-14 ">
                <div className="text-[18px] font-medium text-gray-600">Documento de identidad</div>
                <input
                  value={initialData.documentNumber}
                  disabled={true}
                  type="text"
                  className={`cursor-not-allowed w-full p-2 border border-gray-300 outline-none rounded-md ${
                    errors.documentNumber ? 'border-red-500' : ''
                  }`}
                />


                {errors.documentNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.documentNumber.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Botones de navegación */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaArrowLeft className="mr-2 h-4 w-4" />
              Atrás
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Siguiente
              <FaArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}    