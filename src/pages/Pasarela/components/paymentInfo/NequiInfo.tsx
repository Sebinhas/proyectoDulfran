import { FaArrowLeft, FaMobile } from 'react-icons/fa'
import type { PersonalData } from '../../usePasarela'
import { useForm } from 'react-hook-form'
import nequi from '../../../../../public/TypeTarget/nequi.avif'
import { useAuthStore } from '../../../../hooks/authStore'
import { useState } from 'react'
import type { DTONequiInfoForm } from './DTOPaymentMethod'

interface NequiInfoProps {
  onBack: () => void
  onNext: () => void
  personalData: PersonalData
}


export function NequiInfo({ onBack, onNext, personalData }: NequiInfoProps) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<DTONequiInfoForm>()
  const { user } = useAuthStore()
  const [useSameNumber, setUseSameNumber] = useState(false)

  const phoneNumber = () => {
    if (useSameNumber) {
      setValue('phone_number', user?.phone || '')
      return user?.phone
    }else{
      return ''
    }
  }


  const onSubmit = (data: DTONequiInfoForm) => {

    console.log(data)
    onNext()
  }


  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Confirma tu pago con Nequi
        </h3>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div className=" w-full flex justify-center ">
              <div className="flex flex-col items-center">
                <div className="">Método de pago</div>
                <div className="flex flex-row gap-2">
                  <img src={nequi} alt="Nequi" width={140} height={50} />
                </div>

              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4">
                <div className="w-full">
                  <div className="text-sm font-medium pb-0.5">Número celular de tu cuenta Nequi</div>
                  <input 
                    {...register('phone_number', { 
                      required: 'El número celular es requerido',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Ingresa un número celular válido de 10 dígitos'
                      }
                    })} 
                    disabled={useSameNumber}
                    defaultValue={phoneNumber()}
                    type="tel"
                    className="w-full border rounded-md p-2 outline-none border-gray-300"
                  />

                  {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number.message}</p>}
                </div>

                <div className="flex flex-row gap-2 items-center">
                  <div className="pt-1">
                    <input 
                      type="checkbox" 
                      onClick={() => setUseSameNumber(!useSameNumber)}
                    />
                  </div>



                  <div className="text-sm">
                    Usar el mismo número ya diligenciado, recibirás una notificación push en tu celular.
                  </div>
                </div>

                <div className="text-lg italic">
                  Recibirás una <span className='font-bold'> notificación push </span> en tu celular.
                </div>

                <div className="w-full flex flex-col gap-2">
                  <div className="flex flex-row gap-2">
                    <div className="">
                      <input type="checkbox" {...register('accept_terms', { required: 'Debes aceptar los términos y condiciones' })} />
                    </div>
                    <div className="text-sm">
                      <span className='font-medium text-gray-500'>Acepto </span> el reglamento
                    </div>
                  </div>
                  {errors.accept_terms && <p className="text-red-500 text-sm">{errors.accept_terms.message}</p>}

                  <div className="flex flex-row gap-2">
                    <div className="">
                      <input type="checkbox" {...register('accept_privacy', { required: 'Debes aceptar la autorización para la administración de datos personales' })} />
                    </div>
                    <div className="text-sm">
                      <span className='font-medium text-gray-500'>Acepto </span>
                      la autorización para la administración de datos personales 
                      <span className='font-medium text-gray-500'> y conozco la </span>
                      política para el tratamiento de datos personales.
                    </div>
                  </div>
                  {errors.accept_privacy && <p className="text-red-500 text-sm">{errors.accept_privacy.message}</p>}
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
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Continuar
                  <FaMobile className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 