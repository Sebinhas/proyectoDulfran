import { IoAddSharp } from "react-icons/io5";
import useUsers from "./useUsers";
import TableGlobal from "../../../components/TableData/TableGlobal";
import ViewDetailUser from "./components/ViewDetailUser/ViewDetailUser";
import EditInfoUser from "./components/EditInfoUser/EditInfoUser";
import { useForm } from "react-hook-form";

interface FormInputs {
  cedula: string;
  phone: string;
  first_name: string;
  second_name?: string;
  last_name: string;
  second_lastname?: string;
  email: string;
  profile_type: "financiero" | "tecnico";
}

const Users = () => {
  const {
    setIsLoading,
    isLoading,
    dataUsers,
    columns,
    handleView,

    handleEdit,
    handleDownload,
    onSubmit,
    toggleModalUploadUser,

    closeModalActionUploadUser,
    RenderUploadUser,
    RenderViewDetailUser,
    closeModalActionEditInfoUser,
    RenderEditInfoUser,
    user,
  } = useUsers();

  const {
    register: formRegister,
    handleSubmit: formHandleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormInputs>();

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-row items-center justify-between">
          <div className="text-[25px] font-semibold text-gray-600">
            Lista de Usuarios
          </div>
          <div
            onClick={() => toggleModalUploadUser()}
            className="w-52 h-12 flex flex-row items-center justify-center gap-2 rounded-md cursor-pointer select-none hover:bg-gray-600 bg-gray-500"
          >
            <IoAddSharp className="text-3xl text-white" />
            <div className="text-[18px]  text-white">Crear Usuario</div>
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
          data={dataUsers ?? []}
          itemsPerPage={8}
          actions={{
            view: (row) => handleView(row),
            edit: (row) => handleEdit(row),
            // message: (row) => handleMessage(row)
          }}
          filters={{
            username: true,
            profile_type: true,
            status: true,
          }}
        />
      )}

      <RenderViewDetailUser>
        <ViewDetailUser user={user} />
      </RenderViewDetailUser>

      <RenderEditInfoUser>
        <EditInfoUser
          setIsLoading={setIsLoading}
          loading={isLoading}
          user={user}
          closeModalActionEditInfoUser={closeModalActionEditInfoUser}
        />
      </RenderEditInfoUser>

      <RenderUploadUser>
        <div className="w-full flex flex-col gap-3 p-4">
          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <div className="text-sm font-medium pb-0.5">
                Cédula <span className="text-red-500">*</span>
              </div>
              <input
                {...formRegister("cedula", { required: true })}
                placeholder="Ej: 1234567"
                className={`w-full border rounded-md p-2 outline-none ${
                  formErrors.cedula ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>

            <div className="w-full">
              <div className="text-sm font-medium pb-0.5">
                Teléfono <span className="text-red-500">*</span>
              </div>
              <input
                {...formRegister("phone", { required: true })}
                placeholder="Ej: 3178901234"
                className={`w-full border rounded-md p-2 outline-none ${
                  formErrors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <div className="text-sm font-medium pb-0.5">
                Primer Nombre <span className="text-red-500">*</span>
              </div>
              <input
                {...formRegister("first_name", { required: true })}
                placeholder="Ej: Juan"
                className={`w-full border rounded-md p-2 outline-none ${
                  formErrors.first_name ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>

            <div className="w-full">
              <div className="text-sm font-medium pb-0.5">Segundo Nombre</div>
              <input
                {...formRegister("second_name")}
                placeholder="Ej: Pérez"
                className="w-full border rounded-md p-2 outline-none border-gray-300"
              />
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <div className="text-sm font-medium pb-0.5">
                Primer Apellido <span className="text-red-500">*</span>
              </div>
              <input
                {...formRegister("last_name", { required: true })}
                placeholder="Ej: Pérez"
                className={`w-full border rounded-md p-2 outline-none ${
                  formErrors.last_name ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>

            <div className="w-full">
              <div className="text-sm font-medium pb-0.5">Segundo Apellido</div>
              <input
                {...formRegister("second_lastname")}
                placeholder="Ej: Pérez"
                className="w-full border rounded-md p-2 outline-none border-gray-300"
              />
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <div className="text-sm font-medium pb-0.5">
                Correo Electrónico <span className="text-red-500">*</span>
              </div>
              <input
                type="email"
                {...formRegister("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo inválido",
                  },
                })}
                placeholder="Ej: email@example.com"
                className={`w-full border rounded-md p-2 outline-none ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>

            <div className="w-full">
              <div className="text-sm font-medium pb-0.5">
                Tipo de Perfil <span className="text-red-500">*</span>
              </div>
              <select
                {...formRegister("profile_type", { required: true })}
                className={`w-full border rounded-md p-2 outline-none ${
                  formErrors.profile_type ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Seleccione un tipo</option>
                <option value="financiero">Financiero</option>
                <option value="tecnico">Técnico</option>
              </select>
            </div>
          </div>

          <div className="w-full flex flex-row items-center justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => closeModalActionUploadUser()}
              className="w-24 h-12 flex flex-row items-center justify-center gap-2 rounded-md cursor-pointer select-none hover:bg-gray-600 bg-gray-500"
            >
              <div className="text-[18px] text-white">Cancelar</div>
            </button>
            <button
              onClick={formHandleSubmit(onSubmit)}
              className="w-24 h-12 flex flex-row items-center justify-center gap-2 rounded-md cursor-pointer select-none hover:bg-blue-600 bg-blue-500"
            >
              <div className="text-[18px] text-white">Guardar</div>
            </button>
          </div>
        </div>
      </RenderUploadUser>
    </div>
  );
};

export default Users;
