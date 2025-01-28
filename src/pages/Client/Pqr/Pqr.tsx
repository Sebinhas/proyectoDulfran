import usePqr from "./usePqr";

const Pqr = () => {
  const {register, handleSubmit, pqr, createNewPqr, errors} = usePqr();

  return (
    <div className="w-full h-full flex justify-center items-center p-6 select-none">
      <div className="w-full max-w-[600px] bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Formulario de PQR</h1>
        <p className="text-gray-600 mb-6 text-sm">Porfavor, complete el formulario para enviar su petición, queja o reclamo.</p>

        <form onSubmit={handleSubmit(createNewPqr)} className="space-y-4">
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
          <div className="w-full flex justify-center items-center text-sm text-gray-600">Se enviará su solicitud a nuestro equipo de soporte técnico.</div>
        </form>
      </div>
    </div>
  );
};

export default Pqr;
