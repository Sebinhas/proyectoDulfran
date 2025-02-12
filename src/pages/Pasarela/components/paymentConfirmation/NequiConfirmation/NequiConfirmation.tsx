import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { FaN } from 'react-icons/fa6'
import type { PaymentInfo, PersonalData } from '../../../usePasarela'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PaymentInvoice from '../../PaymentInvoice/PaymentInvoice'

interface NequiConfirmationProps {
  onBack: () => void
  onNext: () => void
  personalData: PersonalData
  paymentInfo: PaymentInfo
}

const NequiConfirmation = () => {

  const { state } = useLocation()
  const [paymentInfo, setPaymentInfo] = useState<any>(state?.paymentData)
  const navigate = useNavigate()
  const [paymentInvoice, setPaymentInvoice] = useState<any>(null)
  const [alert, setAlert] = useState<any>(false)
  console.log(state)

  const pay = () => {

    
    navigate('/dashboard/payments')
  }

  return (
    <div className="w-full px-4 py-6 relative">
      {alert && (
        <PaymentInvoice paymentData={paymentInfo} />
      )}
      <div className="mx-auto w-full max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center mb-6">
            <FaN className="mx-auto h-12 w-12 text-fuchsia-500" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Confirma tu pago con Nequi
            </h3>
          </div>

          <div className="space-y-6">
            {/* Información Personal */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Información Personal</h4>
              <dl className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Nombre:</dt>
                  <dd className="text-sm font-medium text-gray-900">{paymentInfo?.buyer_name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Email:</dt>
                  <dd className="text-sm font-medium text-gray-900">{paymentInfo?.buyer_email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Teléfono Nequi:</dt>
                  <dd className="text-sm font-medium text-gray-900">{paymentInfo?.buyer_phone}</dd>
                </div>
              </dl>
            </div>

            {/* Información del Pago */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Detalles del Pago</h4>
              <dl className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Monto:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${paymentInfo?.amount.toLocaleString('es-CO')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Referencia:</dt>
                  <dd className="text-sm font-medium text-gray-900">{paymentInfo?.invoice_id}</dd>
                </div>
              </dl>
            </div>

            {/* Instrucciones */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Importante</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Recibirás una notificación en tu app Nequi</li>
                <li>• Tienes 5 minutos para aceptar el pago</li>
                <li>• Asegúrate de tener saldo disponible</li>
              </ul>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => navigate('/dashboard/payments')}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaArrowLeft className="mr-2 h-4 w-4" />
                {/* Revisar datos */}
                Volver a facturas
              </button>
              <button
                onClick={()=> pay()}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700"
              >
                Pagar con Nequi
                <FaCheckCircle className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 

export default NequiConfirmation