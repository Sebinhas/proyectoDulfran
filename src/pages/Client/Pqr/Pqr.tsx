import usePqr from "./usePqr";

const Pqr = () => {
  const {register, handleSubmit, pqr, createPqr} = usePqr();

  return (
    <div className="w-full h-full flex justify-center items-center p-6 select-none">
      <div className="w-full max-w-[600px] bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Formulario de PQR</h1>
        <p className="text-gray-600 mb-6 text-sm">Porfavor, complete el formulario para enviar su petición, queja o reclamo.</p>

        <form onSubmit={handleSubmit(createPqr)} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Tipo de solicitud</label>
            <select {...register("requestType")} className="w-full h-11 p-2 border rounded-lg">
              <option className="text-gray-600" value="">Seleccione un tipo de solicitud</option>
              <option value="petition">Petición</option>
              <option value="complaint">Queja</option>
              <option value="claim">Reclamo</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Categoría</label>
            <select {...register("category")} className="w-full h-11 p-2 border rounded-lg">
              <option className="text-gray-600" value="">Seleccione una categoría</option>
              <option value="service">Servicio al cliente</option>
              <option value="technical">Problema técnico</option>
              <option value="billing">Facturación</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Descripción</label>
            <textarea 
              {...register("description")} 
              className="w-full h-40 p-3 border rounded-lg  focus:outline-none resize-none"
              placeholder="Por favor, describa su solicitud en detalle..."
            />
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
