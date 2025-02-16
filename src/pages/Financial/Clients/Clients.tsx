import {
  IoAddSharp,
  IoCloudUploadOutline,
  IoDocumentOutline,
} from "react-icons/io5";
import useClients from "./useClients";
import TableGlobal from "../../../components/TableData/TableGlobal";
import ViewDetailUser from "./components/ViewDetailClient/ViewDetailClient";
import EditInfoClient from "./components/EditInfoClient/EditInfoClient";

const Clients = () => {
  const {
    clients,
    columns,
    handleView,
    handleEdit,
    handleMessage,
    toggleModalUploadClient,
    closeModalActionEditInfoClient,
    RenderUploadClient,
    RenderViewDetailClient,
    RenderEditInfoClient,
    user,
    handleFileChange,
    isLoading,
    handleFileUpload,
    selectedFile,
    setSelectedFile,
  } = useClients();

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-row items-center justify-between">
          <div className="text-[25px] font-semibold text-gray-600">
            Lista de Clientes
          </div>
          <div
            onClick={() => toggleModalUploadClient()}
            className="w-52 h-12 flex flex-row items-center justify-center gap-2 rounded-md cursor-pointer select-none hover:bg-gray-600 bg-gray-500"
          >
            <IoAddSharp className="text-3xl text-white" />
            <div className="text-[18px]  text-white">Subir Clientes</div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full h-64 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">Cargando datos...</p>
          <p className="text-sm text-gray-500">Por favor, espere un momento</p>
        </div>
      ) : (
        <TableGlobal
          columns={columns}
          data={clients ?? []}
          itemsPerPage={6}
          actions={{
            view: (row) => handleView(row),
            edit: (row) => handleEdit(row),
            message: (row) => handleMessage(row),
          }}
          filters={{
            username: true,
            status: true,
          }}
        />
      )}

      <RenderViewDetailClient>
        <ViewDetailUser user={user} />
      </RenderViewDetailClient>

      <RenderEditInfoClient>
        <EditInfoClient
          user={user}
          closeModalActionUploadClient={closeModalActionEditInfoClient}
        />
      </RenderEditInfoClient>

      <RenderUploadClient>
        <div className="w-full h-96 flex justify-center items-center gap-4">
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <div className="font-medium text-gray-600">
              Subir masivo de usuarios, archivo .xlsx
            </div>

            <label
              className={`w-full max-w-2xl h-32 flex flex-col items-center justify-center border-2 border-dashed 
              ${
                selectedFile
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300"
              } 
              rounded-lg hover:bg-gray-50 cursor-pointer transition-colors`}
            >
              <div className="flex flex-col items-center justify-center">
                {selectedFile ? (
                  <>
                    <IoDocumentOutline className="w-10 h-10 text-green-500" />
                    <p className="text-green-600">Archivo seleccionado:</p>
                    <p className="text-sm text-green-500">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      ({(selectedFile.size / 1024).toFixed(2)} KB)
                    </p>
                  </>
                ) : (
                  <>
                    <IoCloudUploadOutline className="w-10 h-10 text-gray-400" />
                    <p className="text-gray-600">
                      Haz clic para seleccionar archivo
                    </p>
                    <p className="text-sm text-gray-500">.xlsx, .xls</p>
                  </>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
              />
            </label>

            {selectedFile && (
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedFile(null)}
                  className="px-4 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  onClick={() => {
                    handleFileUpload(selectedFile);
                  }}
                >
                  Procesar Archivo
                </button>
              </div>
            )}
          </div>
        </div>
      </RenderUploadClient>
    </div>
  );
};

export default Clients;
