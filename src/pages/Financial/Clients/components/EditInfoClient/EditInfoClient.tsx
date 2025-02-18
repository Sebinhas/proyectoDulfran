import { useEffect } from "react";
import { ClientsDTO } from "../../DTOClients"; 
import useEditInfoClient from "./useEditInfoClient";

const EditInfoClient = ({ user, closeModalActionUploadClient, setIsLoading, loading }: { user: ClientsDTO | null, closeModalActionUploadClient: () => void, setIsLoading: (value: boolean) => void, loading: boolean }) => {


    const { register, handleSubmit, onSubmit, setValue } = useEditInfoClient(setIsLoading, loading, closeModalActionUploadClient, user);

    useEffect(() => {
        setValue('cedula', user?.cedula);
    }, [user]);

  if (!user) return null;

  return (
    <div className="w-full flex flex-col gap-3 p-4">
        <form className="w-full flex flex-col gap-3 " onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
                <div className="text-sm font-medium pb-0.5">Direccion</div>
                <input {...register('address')} defaultValue={user.address} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
            </div>
            <div className="w-full flex flex-col md:flex-row gap-4">
                <div className="w-full">
                    <div className="text-sm font-medium pb-0.5">Estrato</div>
                    <select {...register('stratum')} defaultValue={user.stratum} className=" w-full border rounded-md p-2 outline-none border-gray-300 " >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>
                <div className="w-full">
                    <div className="text-sm font-medium pb-0.5">Estado</div>
                    <select {...register('status')} defaultValue={user.status} className=" w-full border rounded-md p-2 outline-none border-gray-300 " >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-4">
                <div className="w-full">
                    <div className="text-sm font-medium pb-0.5">Correo</div>
                    <input {...register('email')} defaultValue={user.email} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
                </div>
                <div className="w-full">
                    <div className="text-sm font-medium pb-0.5">Telefono</div>
                    <input {...register('phone')} defaultValue={user.phone} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
                </div>
            </div>

            <div className="w-full flex flex-row items-center justify-end gap-4 mt-4">
                <button 
                    type="button"
                    onClick={() => closeModalActionUploadClient()} 
                    className="w-24 h-12 flex flex-row items-center justify-center gap-2 rounded-md cursor-pointer select-none hover:bg-gray-600 bg-gray-500"
                >
                    <div className="text-[18px] text-white">Cancelar</div>
                </button>
                <button type="submit" className="w-24 h-12 flex flex-row items-center justify-center gap-2 rounded-md cursor-pointer select-none hover:bg-blue-600 bg-blue-500">
                    <div className="text-[18px] text-white">Guardar</div>
                </button>
            </div>
        </form>



    </div>
  );
};

export default EditInfoClient;

