import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const PqrCard = ({data, onClick}: any) => {
  return (
   <div onClick={onClick} className="bg-slate-50 border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
      <div className="flex justify-between items-start mb-2">
         <div>
            <div className="flex items-center gap-3">
               <h2 className="text-lg font-semibold">{data.sub_category}</h2>
               <span className="text-gray-500 text-xs border border-gray-400 px-1.5 rounded-full">PQR-{String(data.id).padStart(3, '0')}</span>
            </div>
            <p className="text-gray-600">{data.description}</p>
         </div>
         <div className="text-right text-sm text-gray-500">
            <div>Creado: {format(new Date(data.created_at), 'dd/MM/yyyy HH:mm', { locale: es })}</div>
            <div>Última actualización: {format(new Date(data.updated_at), 'dd/MM/yyyy HH:mm', { locale: es })}</div>
         </div>
      </div>
      <div className="flex gap-2">
         <span className={`px-3 py-1 rounded-full text-sm ${
            data.status === 'pendiente' 
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-800'
              : data.status === 'en_proceso'
              ? 'bg-blue-100 text-blue-800 border border-blue-800'
              : data.status === 'cerrado'
              ? 'bg-green-100 text-green-800 border border-green-800'
              : 'bg-gray-100 text-gray-800 border border-gray-800'
         }`}>
            {data.status === 'en_proceso' ? 'en proceso' : data.status}
         </span>
         <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 border border-gray-800">{data.category}</span>
      </div>
   </div>
  );
};

export default PqrCard;