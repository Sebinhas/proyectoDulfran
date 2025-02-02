import TableGlobal from "../../../components/TableData/TableGlobal";
import usePqrResponse from "./usePqrResponse";
import {useSocketPqr } from "./service/useSocketPqr";
import { useEffect } from "react";


const PqrResponse = () => {
  const { columns, pqr, handleEdit, RenderResponsePqr, selectedPqr, handleSubmitResponse, register, handleSubmit, closeModalActionResponsePqr } = usePqrResponse();
  const { response } = useSocketPqr([1,2]);

  console.log(pqr)

  return (
    <div className="w-full flex flex-col p-4">
      <TableGlobal
        columns={columns}
        data={pqr ?? []}
        itemsPerPage={8}
        actions={{
          edit: (row) => handleEdit(row)
        }}
      />
      <RenderResponsePqr>
        <div className="w-full max-h-[80vh] overflow-y-auto p-4 select-none">
          <div className="w-full max-w-5xl mx-auto flex flex-col gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-medium text-lg text-gray-900 mb-4">Información del Cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
                  <p className="text-base break-words">
                    {`${selectedPqr?.client.first_name} ${selectedPqr?.client.second_name} ${selectedPqr?.client.first_lastname} ${selectedPqr?.client.second_lastname}`}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Cédula</p>
                  <p className="text-base">{selectedPqr?.client.cedula}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">No. Contrato</p>
                  <p className="text-base">{selectedPqr?.client.no_contract}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Teléfono</p>
                  <p className="text-base">{selectedPqr?.client.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base break-words">{selectedPqr?.client.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Plan</p>
                  <p className="text-base">{selectedPqr?.client.speed_plan}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-medium text-lg text-gray-900 mb-4">Detalles de la PQR</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tipo</p>
                  <p className="text-base">{selectedPqr?.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Categoría</p>
                  <p className="text-base capitalize">{selectedPqr?.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Subcategoría</p>
                  <p className="text-base capitalize">{selectedPqr?.sub_category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Fecha de Creación</p>
                  <p className="text-base">
                    {new Date(selectedPqr?.created_at || '').toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Descripción</p>
                <p className="text-base bg-gray-50 p-3 rounded-md">{selectedPqr?.description}</p>
              </div>
            </div>

            <form className="bg-white p-4 rounded-lg shadow-sm border" onSubmit={handleSubmit(handleSubmitResponse)}>
              <h3 className="font-medium text-lg text-gray-700 mb-4">Respuesta</h3>
              
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Estado de la PQR
                </label>
                <select
                  id="status"
                  {...register('status')}
                  disabled={selectedPqr?.status === 'cerrado'}
                  defaultValue={selectedPqr?.status}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="en_proceso">En Proceso</option>
                  <option value="cerrado">Cerrado</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-2">
                  Respuesta
                </label>
                <textarea
                  id="response"
                  defaultValue={selectedPqr?.response}
                  {...register('response')}
                  disabled={selectedPqr?.status === 'cerrado'}
                  rows={6}
                  className="w-full min-h-[150px] p-3 border resize-none border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Escribe aquí la respuesta a la PQR..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModalActionResponsePqr}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Enviar Respuesta
                </button>
              </div>
            </form>
          </div>
        </div>
      </RenderResponsePqr>
    </div>
  );
};

export default PqrResponse;
