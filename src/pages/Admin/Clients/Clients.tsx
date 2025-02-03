import { IoAddSharp, IoCloudUploadOutline, IoDocumentOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import UseClients from "./UseClients";
import TableGlobal from "../../../components/TableData/TableGlobal";
import { useEffect, useState } from "react";
import ViewDetailUser from "./components/ViewDetailUser/ViewDetailUser";
import { ClientsDTO } from "./DTOClients";
import { uploadExcel } from "../../../api/axios.helper";

import { toast } from "react-toastify";
import EditInfoUser from "./components/EditInfoUser/EditInfoUser";

const Clients = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    setIsLoading,
    isLoading,
    dataUsers,
    columns,
    handleView,

    handleEdit,
    handleMessage,
    handleDownload,
    onSubmit,
    toggleModalUploadUser,

    closeModalActionUploadUser,
    RenderUploadUser,
    toggleModalViewDetailUser,
    closeModalActionViewDetailUser,
    RenderViewDetailUser,
    toggleModalEditInfoUser,
    closeModalActionEditInfoUser,
    RenderEditInfoUser,
    user,
    register,
    handleSubmit,
    reset,
    errors,
  } = UseClients();

  useEffect(() => {
    console.log(user);
  }, [user]);


  


  return (
    <div className="w-full flex flex-col gap-4 p-4">
      
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-row items-center justify-between">
          <div className="text-[25px] font-semibold text-gray-600">Lista de Usuarios</div>
          <div onClick={() => toggleModalUploadUser()} className="w-52 h-12 flex flex-row items-center justify-center gap-2 rounded-md cursor-pointer select-none hover:bg-gray-600 bg-gray-500">
            <IoAddSharp className="text-3xl text-white" />
            <div  className="text-[18px]  text-white">Crear Usuario</div>
          </div>
        </div>
      </div>
      <TableGlobal
        columns={columns}
        data={dataUsers ?? []}
        itemsPerPage={8}

        actions={{
          view: (row) => handleView(row),
          download: (row) => handleDownload(row),
          edit: (row) => handleEdit(row),
          // message: (row) => handleMessage(row)
        }}
        filters={{
          username: true,
          profile_type: true,
          status: true,
        }}
      />

      <RenderViewDetailUser>
        <ViewDetailUser user={user}  />
      </RenderViewDetailUser>

      <RenderEditInfoUser>
        <EditInfoUser setIsLoading={setIsLoading} loading={isLoading} user={user} closeModalActionEditInfoUser={closeModalActionEditInfoUser} />
      </RenderEditInfoUser>




      <RenderUploadUser>
        <div className="w-full flex flex-col gap-3 p-4">
          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <div className="text-sm font-medium pb-0.5">Nombre de Usuario</div>
              <input 
                {...register('username')}
                placeholder="Ej: juanperez"
                className="w-full border rounded-md p-2 outline-none border-gray-300" 
              />
            </div>

            <div className="w-full">
              <div className="text-sm font-medium pb-0.5">Cédula</div>
              <input  
                {...register('cedula')}
                placeholder="Ej: 1234567"
                className="w-full border rounded-md p-2 outline-none border-gray-300" 
              />
            </div>


          </div>

          <div className="w-full flex flex-col md:flex-row gap-4">
            
            <div className="w-full">
              <div className="text-sm font-medium pb-0.5">Nombre Completo</div>
              <input  
                {...register('name')}
                placeholder="Ej: Juan Pérez"
                className="w-full border rounded-md p-2 outline-none border-gray-300" 
              />
            </div>

            <div className="w-full">
              <div className="text-sm font-medium pb-0.5">Correo Electrónico</div>
              <input  
                type="email"
                {...register('email')}
                placeholder="Ej: juan@conection.com"
                className="w-full border rounded-md p-2 outline-none border-gray-300" 
              />
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-4">
  
          <div className="w-full relative">
              <div className="text-sm font-medium pb-0.5">Contraseña</div>

              <div onClick={() => setShowPassword(!showPassword)} className="absolute right-3 -top-10 h-full flex items-center justify-center cursor-pointer">
                {showPassword ? <IoEyeOutline className="text-gray-500 text-2xl" /> : <IoEyeOffOutline className="text-gray-500 text-2xl" />}
              </div>
              <input  
                type={showPassword ? "text" : "password"}
                {...register('password', {
                  required: "La contraseña es requerida",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
                  },
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres"
                  }
                })}
                placeholder="Mínimo 8 caracteres"
                className="w-full border rounded-md p-2 outline-none border-gray-300" 
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </div>
              )}
              
              <div className="text-xs text-gray-500 mt-1">
                La contraseña debe contener:
                <ul className="list-disc list-inside">
                  <li>Mínimo 8 caracteres</li>
                  <li>Al menos una letra mayúscula</li>
                  <li>Al menos una letra minúscula</li>
                  <li>Al menos un número</li>
                  <li>Al menos un carácter especial (@$!%*?&)</li>
                </ul>
              </div>
            </div>

            <div className="w-full">
              <div className="text-sm font-medium pb-0.5">Tipo de Perfil</div>
              <select
                {...register('profile_type')}
                className="w-full border rounded-md p-2 outline-none border-gray-300"
              >
                <option value="">Seleccione un tipo</option>
                <option value="Admin">Admin</option>
                <option value="Soporte">Soporte</option>
              </select>
            </div>


          </div>

          <div className="w-full flex flex-row items-center justify-end gap-4 mt-4">
            <button 
              onClick={() => closeModalActionUploadUser()} 
              className="w-24 h-12 flex flex-row items-center justify-center gap-2 rounded-md cursor-pointer select-none hover:bg-gray-600 bg-gray-500"
            >
              <div className="text-[18px] text-white">Cancelar</div>
            </button>
            <button 
              onClick={handleSubmit(onSubmit)} 
              className="w-24 h-12 flex flex-row items-center justify-center gap-2 rounded-md cursor-pointer select-none hover:bg-blue-600 bg-blue-500"
            >
              <div className="text-[18px] text-white">Guardar</div>
            </button>
          </div>
        </div>
      </RenderUploadUser>
    </div>
  )
}

export default Clients;