import { ClientsDTO } from "../../DTOClients"; 
import useEditInfoUser from "./useEditInfoClient";

const EditInfoClient = ({ user, closeModalActionUploadClient }: { user: ClientsDTO | null, closeModalActionUploadClient: () => void }) => {


    const { register, handleSubmit, onSubmit } = useEditInfoUser();


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
                    <input {...register('stratum')} disabled={true} defaultValue={user.stratum} className="cursor-not-allowed w-full border rounded-md p-2 outline-none border-gray-300 " />
                </div>

                <div className="w-full">
                    <div className="text-sm font-medium pb-0.5">Estado</div>
                    <input {...register('status')} disabled={true} defaultValue={user.status} className="cursor-not-allowed w-full border rounded-md p-2 outline-none border-gray-300 " />
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

            <div className="w-full flex flex-col md:flex-row gap-4">
                <div className="w-full">
                    <div className="text-sm font-medium pb-0.5">Fecha Contrato</div>
                    <input {...register('date_contract')} disabled={true} defaultValue={user.date_contract} className="cursor-not-allowed w-full border rounded-md p-2 outline-none border-gray-300 " />
                </div>
                <div className="w-full">
                    <div className="text-sm font-medium pb-0.5">No. Contrato</div>
                    <input {...register('no_contract')} disabled={true} defaultValue={user.no_contract} className="cursor-not-allowed w-full border rounded-md p-2 outline-none border-gray-300 " />
                </div>                
            </div>
            <div className="w-full flex flex-col md:flex-row gap-4">

                <div className="w-full">
                    <div className="text-sm font-medium pb-0.5">Direccion</div>
                    <input {...register('address')} disabled={true} defaultValue={user.address} className="cursor-not-allowed w-full border rounded-md p-2 outline-none border-gray-300 " />
                </div>
                <div className="w-full">
                    <div className="text-sm font-medium pb-0.5">Fecha Creacion</div>
                    <input {...register('createdAt')} disabled={true} defaultValue={new Date(user.createdAt).toLocaleDateString()} className="cursor-not-allowed w-full border rounded-md p-2 outline-none border-gray-300 " />
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

