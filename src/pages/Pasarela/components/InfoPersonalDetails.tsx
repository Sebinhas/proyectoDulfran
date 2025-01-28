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
                <div className="text-[18px] font-medium text-gray-600">Nombre completo</div>
                <input
                  value={'juanes espinosa rincon'}
                  {...register("nombre", { 
                    required: "El nombre es requerido",
                    minLength: { value: 3, message: "Mínimo 3 caracteres" }
                  })}
                  type="text"
                  className={`w-full p-2 border border-gray-300 outline-none rounded-md ${errors.nombre ? 'border-red-500' : '' }`}
                />
                {errors.nombre && (
                  <p className="mt-1 text-sm text-red-500">{errors.nombre.message}</p>
                )}
              </div>

              <div className="w-full h-14 ">
                <div className="text-[18px] font-medium text-gray-600">Correo electrónico</div>
                <input
                  value={'juanesespinosa@gmail.com'}
                  {...register("email", { 
                    required: "El email es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido"
                    }
                  })}
                  type="email"
                  className={`w-full p-2 border border-gray-300 outline-none rounded-md ${
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
                  value={'3178654321'}
                  {...register("telefono", { 
                    required: "El teléfono es requerido",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Teléfono inválido (10 dígitos)"
                    }
                  })}
                  type="tel"
                  className={`w-full p-2 border border-gray-300 outline-none rounded-md ${
                    errors.telefono ? 'border-red-500' : ''
                  }`}
                />
              {errors.telefono && (
                <p className="mt-1 text-sm text-red-500">{errors.telefono.message}</p>
              )}
              </div>
              <div className="w-full h-14 ">
                <div className="text-[18px] font-medium text-gray-600">Dirección</div>
                <input
                  value={'calle 123 # 45-67'}
                  {...register("direccion", { 
                    required: "La dirección es requerida" 
                  })}
                  type="text"
                  className={`w-full p-2 border border-gray-300 outline-none rounded-md ${
                    errors.direccion ? 'border-red-500' : ''
                  }`}
                />
                {errors.direccion && (
                  <p className="mt-1 text-sm text-red-500">{errors.direccion.message}</p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col gap-6 md:flex-row">
              <div className="w-full h-14 ">
                <div className="text-[18px] font-medium text-gray-600">Ciudad</div>
                <input
                  value={'bogota'}
                {...register("ciudad", { 
                  required: "La ciudad es requerida" 
                })}
                  type="text"
                  className={`w-full p-2 border border-gray-300 outline-none rounded-md ${
                    errors.ciudad ? 'border-red-500' : ''
                  }`}
                />
              {errors.ciudad && (
                  <p className="mt-1 text-sm text-red-500">{errors.ciudad.message}</p>
                )}
              </div>
              <div className="w-full h-14 ">
                <div className="text-[18px] font-medium text-gray-600">Documento de identidad</div>
                <input
                  value={'1000000000'}
                  {...register("documento", { 
                    required: "El documento es requerido",
                    pattern: {
                      value: /^[0-9]{8,10}$/,
                      message: "Documento inválido (8-10 dígitos)"
                    }
                  })}
                  type="text"
                  className={`w-full p-2 border border-gray-300 outline-none rounded-md ${
                    errors.documento ? 'border-red-500' : ''
                  }`}
                />
                {errors.documento && (
                  <p className="mt-1 text-sm text-red-500">{errors.documento.message}</p>
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