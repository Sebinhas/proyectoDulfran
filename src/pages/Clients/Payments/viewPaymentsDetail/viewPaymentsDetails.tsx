import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { IoDocumentOutline, IoCalendarOutline, IoCashOutline, IoPersonOutline } from "react-icons/io5";
import { Payment } from '../templates/cellTemplates';
import { priceFormatter } from '../../../../helpers/priceFormatter.helper';

const ViewPaymentDetail = ({ payment }: { payment: Payment | null }) => {
  if (!payment) return null;

  return (
    <div className="w-full p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Factura #{payment.invoice_number}</h2>
          <p className="text-gray-500 mt-1">
            Emitida el {format(new Date(payment.due_date), 'd MMMM yyyy', { locale: es })}
          </p>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
          payment.status === 'pagado' ? 'bg-green-100 text-green-800' :
          payment.status === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {payment.status.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información del Cliente */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <IoPersonOutline className="text-gray-500 text-xl" />
            <h3 className="text-lg font-semibold text-gray-900">Información del Cliente</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Nombre Completo</p>
              <p className="font-medium">
                {`${payment.client.first_name} ${payment.client.first_lastname}`}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Número de Contrato</p>
              <p className="font-medium">{payment.client.no_contract}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Cédula</p>
              <p className="font-medium">{payment.client.cedula}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Plan Contratado</p>
              <p className="font-medium">{payment.speed_plan}</p>
            </div>
          </div>
        </div>

        {/* Detalles del Pago */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <IoCashOutline className="text-gray-500 text-xl" />
            <h3 className="text-lg font-semibold text-gray-900">Detalles del Pago</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Monto Total</p>
              <p className="text-xl font-bold text-gray-900">{priceFormatter(payment.amount)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Periodo</p>
              <p className="font-medium">{payment.period}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Método de Pago</p>
              <p className="font-medium">{payment.payment_method || 'No registrado'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Estado del Pago</p>
              <p className="font-medium capitalize">{payment.status}</p>
            </div>
          </div>
        </div>

        {/* Fechas */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <IoCalendarOutline className="text-gray-500 text-xl" />
            <h3 className="text-lg font-semibold text-gray-900">Fechas</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Fecha de Vencimiento</p>
              <p className="font-medium">
                {format(new Date(payment.due_date), 'd MMMM yyyy', { locale: es })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Fecha de Pago</p>
              <p className="font-medium">
                {payment.payment_date 
                  ? format(new Date(payment.payment_date), 'd MMMM yyyy', { locale: es })
                  : 'Pendiente'}
              </p>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <IoDocumentOutline className="text-gray-500 text-xl" />
            <h3 className="text-lg font-semibold text-gray-900">Acciones</h3>
          </div>
          <div className="flex gap-4">
            <a
              href={payment.invoice_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
            >
              <IoDocumentOutline className="text-xl" />
              <span>Descargar Factura</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaymentDetail;
