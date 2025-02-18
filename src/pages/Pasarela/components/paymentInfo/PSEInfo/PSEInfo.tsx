import { FaArrowLeft, FaUniversity } from 'react-icons/fa'
// import type  PersonalData  from '../../../usePasarela'
import { useForm } from 'react-hook-form'
import pse from '../../../../../../public/TypeTarget/pse.png'
import { useNavigate } from 'react-router-dom'
import { usePaymentContext } from '../../../../../context/PaymentContext'
import { useEffect, useState } from 'react'
// import { getBancsPse } from '../../../../../api/axios.helper'

interface DTOPSEInfoForm {
  bank: string
  document_type: string
  document_number: string
  accept_terms: boolean
  accept_privacy: boolean
}

const PSEInfo = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<DTOPSEInfoForm>()
  const navigate = useNavigate()
  const { paymentData, updatePaymentMethod } = usePaymentContext()
  const [bancos, setBancos] = useState<any>([])
  // const bancos = getBancsPse()

  useEffect(() => {
    getBancos()
  }, [])

  const onSubmit = async (data: DTOPSEInfoForm) => {

    await updatePaymentMethod({
      type: paymentData?.payment_method?.type ?? "pse",
      user_type: paymentData?.user_type ?? "PERSON",
      user_legal_id_type: paymentData?.legal_id_type ?? "CC",
      user_legal_id: paymentData?.legal_id ?? "1000000000",
      financial_institution_code: data.bank,
      payment_description: paymentData?.payment_description ?? "Pago de prueba",
    });

    navigate('/dashboard/payments/payment_method/pse/confirmation')
    // onNext()
  }


  const getBancos = async () => {
    try {
      const response = await fetch(
        `https://sandbox.wompi.co/v1/pse/financial_institutions`,
        {
          headers: {
            Authorization: `Bearer pub_test_bLkXQsR8dmrSTeoPCJJzGLckXmAHYLIY`,
          },
        }
      );
      const data = await response.json();

      setBancos(data.data)
      return data.data
    } catch (error) {
      console.error("Error checking payment status:", error);
      return "DECLINED";
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Confirma tu pago con PSE
        </h3>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div className=" w-full flex justify-center ">
              <div className="flex flex-col items-center">
                <div className="">Método de pago</div>
                  <img src={pse} alt="PSE" width={120} height={50} />
              </div>
            </div>


            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4">
                <div className="w-full">
                  <div className="text-sm font-medium pb-0.5">Selecciona tu banco</div>
                  <select 
                    {...register('bank', { required: 'Debes seleccionar un banco' })}
                    className="w-full border rounded-md p-2 outline-none border-gray-300"
                  >
                    <option value="">- Escoge un banco -</option>
                    {
                      bancos.map((banco: any) => (
                        <option 
                          value={banco.financial_institution_code}
                        >
                          {banco.financial_institution_name}
                        </option>
                      ))
                    }
                  </select>
                  {errors.bank && <p className="text-red-500 text-sm">{errors.bank.message}</p>}
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
                  onClick={() => navigate('/dashboard/payments/payment_method')}
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
                  <FaUniversity className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 

export default PSEInfo;