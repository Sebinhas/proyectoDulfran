import usePqr from "../../usePqr"; 

interface NewPqrModalProps {
  onClose: () => void;
}

const NewPqrModal = ({ onClose }: NewPqrModalProps) => {
  const {register, handleSubmit, createNewPqr, errors} = usePqr();

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onSubmit = async (data: any) => {
    await createNewPqr(data);
    onClose(); // Cerrar el modal después de enviar exitosamente
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={handleOutsideClick}
    >
      <div className="w-full max-w-[600px] bg-white rounded-lg shadow-lg p-8 animate-slide-left">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold">Formulario de PQR</h1>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <p className="text-gray-600 mb-6 text-sm">Por favor, complete el formulario para enviar su petición, queja o reclamo.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Tipo de solicitud</label>
            <select {...register("requestType", { required: "Este campo es obligatorio" })} className="w-full h-11 p-2 border rounded-lg">
              <option className="text-gray-600" value="">Seleccione un tipo de solicitud</option>
              <option value="Peticion">Petición</option>
              <option value="Queja">Queja</option>
              <option value="Reclamo">Reclamo</option>
            </select>
            {errors.requestType && <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Categoría</label>
            <select {...register("category", { required: "Este campo es obligatorio" })} className="w-full h-11 p-2 border rounded-lg">
              <option className="text-gray-600" value="">Seleccione una categoría</option>
              <option value="Incidencia técnica">Incidencia técnica</option>
              <option value="Calidad del servicio">Calidad del servicio</option>
              <option value="Instalación">Instalación</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Cambio de plan">Cambio de plan</option>
              <option value="Suspensión de servicio">Suspensión de servicio</option>
              <option value="Reactivación">Reactivación</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Descripción</label>
            <textarea 
              {...register("description", { required: "Este campo es obligatorio" })} 
              className="w-full h-40 p-3 border rounded-lg focus:outline-none resize-none"
              placeholder="Por favor, describa su solicitud en detalle..."
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>}
          </div>

          <button 
            type="submit" 
            className="w-full h-11 flex justify-center items-center bg-[#101c42] text-white py-3 px-6 rounded-lg hover:bg-white hover:text-[#101c42] hover:border-2 hover:border-[#101c42] transition-colors"
          >
            Enviar solicitud
          </button>
          <div className="w-full flex justify-center items-center text-sm text-gray-600">
            Se enviará su solicitud a nuestro equipo de soporte técnico.
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPqrModal;