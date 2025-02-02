import { useEffect } from "react";
// import { ClientsDTO } from "../../../DTOClients"; 
import { getClients } from "../../../../../api/axios.helper";
import useEditInfoUser from "./useEditInfoUser";


const EditInfoUser = ({ user, closeModalActionUploadUser }: { user: any | null, closeModalActionUploadUser: () => void }) => {


    const { register, handleSubmit, errors, onSubmit } = useEditInfoUser();

    useEffect(() => {
        const fetchClients = async () => {
            const clients = await getClients();
            console.log('clients', clients);
        };
        fetchClients();
    }, []);

    if (!user) return null;

    return (
        <div className="w-full p-4">
            <form className="w-full flex flex-col gap-3 " onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex flex-col md:flex-row gap-4">
                    <div className="w-full">

                        <div className="text-sm font-medium pb-0.5">Nombre Completo</div>
                        <input {...register('name')} value={user.name} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
                    </div>
                    <div className="w-full">

                        <div className="text-sm font-medium pb-0.5">Cedula</div>
                        <input {...register('cedula')} value={user.cedula} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
                    </div>


                </div>
                <div className="w-full flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                        <div className="text-sm font-medium pb-0.5">Correo</div>
                        <input {...register('email')} value={user.email} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
                    </div>
                    <div className="w-full">

                        <div className="text-sm font-medium pb-0.5">Nombre de Usuario</div>
                        <input {...register('username')} value={user.username} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                        <div className="text-sm font-medium pb-0.5">Rol</div>
                        <input {...register('profile_type')} value={user.profile_type} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
                    </div>
                    <div className="w-full">

                        <div className="text-sm font-medium pb-0.5">Estado</div>
                        <input {...register('status')} value={user.status} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
                    </div>
                </div>


                <div className="w-full flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                        <div className="text-sm font-medium pb-0.5">Fecha Creacion</div>
                        <input {...register('createdAt')} value={new Date(user.createdAt).toLocaleDateString()} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
                    </div>



                    <div className="w-full">
                        <div className="text-sm font-medium pb-0.5">Fecha Actualizacion</div>
                        <input {...register('updatedAt')} value={new Date(user.updatedAt).toLocaleDateString()} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
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
                        type="submit"
                        className="w-24 h-12 flex flex-row items-center justify-center gap-2 rounded-md cursor-pointer select-none hover:bg-blue-600 bg-blue-500"
                    >
                        <div className="text-[18px] text-white">Guardar</div>

                    </button>
                </div>

            </form>
        </div>
    );
};

export default EditInfoUser;