import { FaArrowLeft, FaCreditCard } from 'react-icons/fa'
import type { PersonalData } from '../../usePasarela'
import { useForm } from 'react-hook-form'
import type { DTOCreditCardInfoForm } from './DTOPaymentMethod'
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa'
import americanExpress from '../../../../../public/TypeTarget/americanExpress.svg'
import mastercard from '../../../../../public/TypeTarget/mastercard.svg'
import visa from '../../../../../public/TypeTarget/visa.svg'



interface CreditCardInfoProps {
  onBack: () => void
  onNext: () => void
  personalData: PersonalData
}

export function CreditCardInfo({ onBack, onNext, personalData }: CreditCardInfoProps) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<DTOCreditCardInfoForm>()

  const formatCardNumber = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formattedValue;
  }

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(event.target.value);
    setValue('card_number', formattedValue);
  }

  const onSubmit = (data: DTOCreditCardInfoForm) => {
    onNext()
  }






  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">

        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Confirma tu pago con tarjeta
        </h3>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div className="">
              <div className="">Aceptamos</div>
              <div className="flex flex-row gap-2">
                <img src={mastercard} alt="Mastercard" width={50} height={50} />
                <img src={visa} alt="Visa" width={50} height={50} />
                <img src={americanExpress} alt="American Express" width={50} height={50} />


              </div>
            </div>
            {/* Formulario de tarjeta */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4">
                <div className="w-full">
                  <div className="text-sm font-medium pb-0.5">Número de tarjeta</div>
                  
                  <input 
                    {...register('card_number', { required: 'El número de tarjeta es requerido' })}
                    type="text"
                    onChange={handleCardNumberChange}
                    className=" w-full border rounded-md p-2 outline-none  border-gray-300 " />
                  {errors.card_number && <p className="text-red-500 text-sm">{errors.card_number.message}</p>}
                </div>

                <div className="w-full flex flex-row gap-4">

                  <div className="w-full flex flex-row gap-4">
                    <div className="w-full">

                        <div className="text-sm font-medium pb-0.5">Mes</div>
                        <select {...register('month', { required: 'El mes es requerido' })} className=" w-full border rounded-md p-2 outline-none border-gray-300 " >
                          <option disabled selected value="">Mes</option>
                          <option value="01">01</option>
                          <option value="02">02</option>

                          <option value="03">03</option>
                          <option value="04">04</option>
                          <option value="05">05</option>
                          <option value="06">06</option>
                          <option value="07">07</option>
                          <option value="08">08</option>
                          <option value="09">09</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                        {errors.month && <p className="text-red-500 text-sm">{errors.month.message}</p>}
                    </div>
                    <div className="w-full">
                        <div className="text-sm font-medium pb-0.5">Año</div>

                        <select {...register('year', { required: 'El año es requerido' })} className=" w-full border rounded-md p-2 outline-none border-gray-300 " >
                          <option disabled selected value="">Año</option>
                          <option value="2025">2025</option>

                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="2029">2029</option>
                          <option value="2030">2030</option>
                          <option value="2031">2031</option>
                          <option value="2032">2032</option>
                          <option value="2033">2033</option>
                          <option value="2034">2034</option>
                          <option value="2035">2035</option>
                          <option value="2036">2036</option>
                          <option value="2037">2037</option>
                          <option value="2038">2038</option>
                          <option value="2039">2039</option>                      
                        </select>
                    </div>
                  </div>
                  <div className="w-full">
                      <div className="text-sm font-medium pb-0.5">CVV</div>
                      <input {...register('cvv', { required: 'El CVV es requerido' })} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
                  </div>
                </div>

                <div className="w-full">
                  <div className="text-sm font-medium pb-0.5">Nombre de la tarjeta</div>
                  <input {...register('card_name', { required: 'El nombre de la tarjeta es requerido' })} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
                </div>
                <div className="w-full flex flex-row gap-4">

                  <div className="w-full">
                    <div className="text-sm font-medium pb-0.5">Tipo de documento</div>
                    <select {...register('document_type', { required: 'El tipo de documento es requerido' })} className=" w-full border rounded-md p-2 outline-none border-gray-300 " >
                      <option disabled selected value="">Tipo de identificación</option>
                      <option value="RC">RC-Registro Civil</option>
                      <option value="TE">TE-Tarjeta de Extranjería</option>
                      <option value="CC">CC-Cedula de Ciudadania</option>
                      <option value="CE">CE-Cedula de Extranjería</option>
                      <option value="NIT">NIT-Número de Identificación Tributaria</option>
                      <option value="PP">PP-Pasaporte</option>
                      <option value="TI">TI-Tarjeta de Identidad</option>
                      <option value="DNI">DNI-Documento Nacional de Identidad</option>
                      <option value="RG">RG-Carteria de identidade / Registro General</option>
                      <option value="other">otro</option>
                    </select>
                    {errors.document_type && <p className="text-red-500 text-sm">{errors.document_type.message}</p>}
                  </div>
                  <div className="w-full">
                    <div className="text-sm font-medium pb-0.5">Número de documento</div>
                    <input {...register('document_number', { required: 'El número de documento es requerido' })} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
                    {errors.document_number && <p className="text-red-500 text-sm">{errors.document_number.message}</p>}
                  </div>
                </div>
                <div className="w-full">

                  <div className="text-sm font-medium pb-0.5">Cantidad de cuotas</div>
                  <input {...register('installments', { required: 'La cantidad de cuotas es requerida' })} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
                  {errors.installments && <p className="text-red-500 text-sm">{errors.installments.message}</p>}
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
                      Acepto la autorización para la administración de datos personales 
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
                  Pagar
                  <FaCreditCard className="ml-2 h-4 w-4" />
                </button>
              </div>
              
            </form>
          </div>

        </div>
      </div>
    </div>
  )
} 