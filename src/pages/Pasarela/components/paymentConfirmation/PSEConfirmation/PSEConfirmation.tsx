import { FaArrowLeft, FaCheckCircle, FaUniversity } from 'react-icons/fa'
import { usePaymentContext } from '../../../../../context/PaymentContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'





const PSEConfirmation = () => {


  const { paymentData } = usePaymentContext()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(paymentData)
  }, [paymentData])

  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center mb-6">
            <FaUniversity className="mx-auto h-12 w-12 text-blue-500" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Confirma tu pago PSE
            </h3>
          </div>

          <div className="space-y-6">
            {/* Resumen bancario */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Detalles bancarios</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Banco seleccionado</span>
                  <span className="text-sm font-medium text-gray-900">Bancolombia</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tipo de cuenta</span>
                  <span className="text-sm font-medium text-gray-900">Ahorros</span>
                </div>
              </div>
            </div>

            {/* Información de redirección */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Importante</h4>
              <p className="mt-2 text-sm text-gray-600">
                Serás redirigido al portal de tu banco para completar el pago.
                No cierres la ventana hasta completar la transacción.
              </p>
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
                onClick={() => {
                  console.log(paymentData)
                }}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Ir al banco
                <FaCheckCircle className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 

export default PSEConfirmation