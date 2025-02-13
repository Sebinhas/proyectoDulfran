import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface PqrDetailProps {
  data: any;
  onClose: () => void;
}

const PqrDetail = ({ data, onClose }: PqrDetailProps) => {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  // console.log(data)
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end"
      onClick={handleOutsideClick}
    >
      <div className="bg-white w-[600px] h-full p-6 animate-slide-left">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Seguimiento de PQR</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">#{`PQR-${String(data.id).padStart(3, '0')}`}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                data.status === 'cerrado' 
                  ? 'bg-green-100 text-green-800 border border-green-800' 
                  : data.status === 'en_proceso'
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-800'
                  : 'bg-red-100 text-red-800 border border-red-800'
              }`}>
                {data.status === 'en_proceso' 
                  ? 'EN PROCESO' 
                  : data.status === 'cerrado'
                  ? 'CERRADO'
                  : 'PENDIENTE'}
              </span>
            </div>
            <p className="text-gray-600 text-sm">{data.sub_category}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Descripción</h4>
            <p className="text-gray-600">{data.description}</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">Respuesta final</h4>
                {data.responses && data.responses[0] && (
                  <span className="text-sm text-gray-500">
                    {format(new Date(data.responses[0].created_at), 'dd MMM yyyy hh:mm a', { locale: es })}
                  </span>
                )}
            </div>
            
            {data.responses && data.responses[0] ? (
              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="font-medium text-gray-900 mb-2">{data.responses[0].user}</p>
                <p className="text-gray-600">{data.responses[0].response}</p>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg border text-gray-500 text-center">
                Esta PQR aún no tiene respuesta
              </div>
            )}
          </div>

          <div>
            <h4 className="font-semibold mb-4">Seguimiento</h4>
            <div className="space-y-6 relative overflow-y-auto max-h-[500px]">
              {[...data.responses].reverse()?.map((response: any, index: number) => (
                <div key={index} className="flex gap-4 relative min-h-[80px]">
                  {index !== data.responses.length - 1 && (
                    <div 
                      className="absolute left-4 top-8 w-[2px] h-[calc(100%+24px)] bg-gray-200" 
                      style={{ transform: 'translateX(-50%)' }}
                    />
                  )}
                  
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white bg-opacity-100
                    ${response.admin_nit ? 'bg-blue-500' : 'bg-green-500'}`}>
                    {response.admin_nit ? 'SA' : 'A'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between flex-wrap gap-2">
                      <div className="min-w-0 max-w-[calc(100%-180px)]">
                        <p className="font-semibold truncate">
                          {response.admin_nit 
                            ? 'Super Administrador' 
                            : response.adminUser?.name || 'Administrador'}
                        </p>
                        <p className="text-gray-600 break-words">{response.response}</p>
                      </div>
                      <span className="text-sm text-gray-500 flex-shrink-0 w-[170px] text-right">
                        {response.created_at ? 
                          format(new Date(response.created_at), 'dd MMM yyyy hh:mm a', { locale: es }) :
                          'Fecha no disponible'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {response.admin_nit 
                        ? 'Super Admin' 
                        : response.adminUser?.profile_type || 'Administrativo'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PqrDetail;